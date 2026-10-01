import { GifReader, GifWriter } from 'omggif';
import { quantizeRGBA } from '../utils/gifEncoder';
import { MEME_TEMPLATES, AI_CAPTION_PROMPTS } from '../utils/memeData';

type MediaKind = 'image' | 'gif' | 'video';
type Format = 'gif' | 'video' | 'png';

interface GifData {
  frames: HTMLCanvasElement[];
  delays: number[];
  width: number;
  height: number;
  duration: number; // ms
}

interface FloatingText {
  text: string;
  x: number; // 0..1 relative to canvas width
  y: number; // 0..1 relative to canvas height
  size: number; // px at 600px reference
  fill: string;
  stroke: string;
}

const FREE_AI_USES = 3;
const MAX_GIF_FRAMES = 90;

function padToPowerOfTwo(palette: number[]): number[] {
  let size = 2;
  while (size < palette.length) size <<= 1;
  const out = palette.slice();
  while (out.length < size) out.push(0x000000);
  return out;
}

function fmtTime(sec: number): string {
  const s = Math.max(0, Math.floor(sec % 60));
  const m = Math.floor(sec / 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export class MemeStudio {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private sourceImage!: HTMLImageElement;
  private sourceVideo!: HTMLVideoElement;
  private el: Record<string, HTMLElement | null> = {};

  private kind: MediaKind = 'image';
  private gif: GifData | null = null;
  private gifTime = 0; // ms within [0, duration)
  private playing = false;
  private rafId = 0;
  private lastTs = 0;

  private rotationDeg = 0;
  private flipH = false;
  private flipV = false;
  private speed = 1.0;
  private trimStart = 0;
  private trimEnd = 0;

  private freeOnly = false;
  private pro = false;
  private aiUsesLeft = FREE_AI_USES;
  private activeFormat: Format = 'gif';

  private floating: FloatingText[] = [];
  private selectedBox = -1;
  private dragOffset = { x: 0, y: 0 };

  private recording = false;

  // ---- GIF decoding (omggif GifReader) ----

  private async decodeGif(url: string): Promise<GifData> {
    const res = await fetch(url);
    const buf = new Uint8Array(await res.arrayBuffer());
    const reader = new GifReader(buf);
    const W = reader.width;
    const H = reader.height;
    const n = reader.numFrames();

    const base = new ImageData(W, H);
    const composite = document.createElement('canvas');
    composite.width = W;
    composite.height = H;
    const cctx = composite.getContext('2d')!;

    const frames: HTMLCanvasElement[] = [];
    const delays: number[] = [];
    let savedBefore: ImageData | null = null;

    for (let i = 0; i < n; i++) {
      if (i > 0) {
        const prev = reader.frameInfo(i - 1);
        if (prev.disposal === 2) {
          for (let y = prev.y; y < prev.y + prev.height; y++) {
            for (let x = prev.x; x < prev.x + prev.width; x++) {
              const o = (y * W + x) * 4;
              base.data[o + 3] = 0;
            }
          }
        } else if (prev.disposal === 3 && savedBefore) {
          base.data.set(savedBefore.data);
        }
      }
      savedBefore = new ImageData(W, H);
      savedBefore.data.set(base.data);

      reader.decodeAndBlitFrameRGBA(i, base.data);
      cctx.putImageData(base, 0, 0);

      const snap = document.createElement('canvas');
      snap.width = W;
      snap.height = H;
      snap.getContext('2d')!.drawImage(composite, 0, 0);
      frames.push(snap);

      const d = reader.frameInfo(i).delay;
      delays.push(d <= 0 ? 100 : d < 15 ? d * 10 : d);
    }

    return { frames, delays, width: W, height: H, duration: delays.reduce((a, b) => a + b, 0) };
  }

  // ---- Public API ----

  init() {
    const $ = (id: string) => document.getElementById(id);
    this.canvas = $('meme-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.sourceImage = $('source-image') as HTMLImageElement;
    this.sourceVideo = $('source-video') as HTMLVideoElement;

    for (const id of [
      'upload-overlay', 'file-input', 'sample-demo-btn', 'studio-toast',
      'export-progress-bar', 'progress-percent', 'progress-fill',
      'btn-play-pause', 'icon-play', 'icon-pause', 'current-time', 'duration-time',
      'timeline-scrubber', 'btn-reset-canvas', 'btn-rotate-90', 'btn-flip-h', 'btn-flip-v',
      'input-top-text', 'input-bottom-text', 'select-font-family', 'slider-font-size',
      'lbl-font-size', 'color-text-fill', 'color-text-stroke', 'slider-stroke-width',
      'chk-caption-banner', 'chk-uppercase', 'chk-text-shadow', 'btn-add-floating-text',
      'input-trim-start', 'input-trim-end', 'input-watermark-text', 'select-watermark-pos',
      'slider-wm-opacity', 'lbl-wm-opacity', 'color-bg-fill', 'select-bg-preset',
      'slider-bg-padding', 'lbl-bg-padding', 'res-free', 'res-pro', 'select-fps',
      'select-still-format', 'btn-copy-clipboard', 'btn-export-download',
      'chk-free-only-mode', 'canvas-dim-indicator', 'lbl-ai-left',
      'pro-modal', 'pro-modal-unlock', 'pro-modal-close'
    ]) {
      this.el[id] = $(id);
    }

    this.canvas.width = 600;
    this.canvas.height = 600;
    this.trimEnd = 0;
    this.trimStart = 0;

    this.pro = localStorage.getItem('mif_pro') === '1';

    this.bindInputs();
    this.bindTransport();
    this.bindExport();
    this.bindProModal();
    this.bindTemplateEvents();
    this.bindFreeOnly();
    this.bindKeyboard();
    this.bindPointer();

    // Initial sample
    this.loadTemplateUrl('/assets/memes/blackbeard writing meme.png', 'ME WRITING CODE...', 'VS ME WRITING DOCUMENTATION', 'image');
  }

  // ---- Media loading ----

  private loadTemplateUrl(url: string, top: string, bottom: string, type: 'image' | 'gif' | 'video' | 'unknown') {
    const inputTop = this.el['input-top-text'] as HTMLInputElement;
    const inputBottom = this.el['input-bottom-text'] as HTMLInputElement;
    if (top) inputTop.value = top;
    if (bottom) inputBottom.value = bottom;
    this.hideOverlay();

    if (type === 'gif' || url.includes('.gif')) {
      this.loadGifUrl(url);
    } else if (type === 'video' || /\.(mp4|webm|mov|mkv)$/i.test(url)) {
      this.loadVideoUrl(url);
    } else {
      this.loadImageUrl(url);
    }
  }

  private loadImageUrl(url: string) {
    this.stopMedia();
    this.kind = 'image';
    const onReady = () => {
      this.fitAutoAspect();
      this.trimStart = 0;
      this.trimEnd = 0;
      this.syncTimeline();
      this.render();
    };
    this.sourceImage.onload = onReady;
    this.sourceImage.src = url;
    if (this.sourceImage.complete && this.sourceImage.naturalWidth > 0) onReady();
  }

  private async loadGifUrl(url: string) {
    this.stopMedia();
    this.kind = 'gif';
    try {
      this.gif = await this.decodeGif(url);
      this.fitAutoAspect(this.gif.width, this.gif.height);
      this.trimStart = 0;
      this.trimEnd = this.gif.duration / 1000;
      this.gifTime = 0;
      this.playing = true;
      this.syncTimeline();
      this.startLoop();
      this.toast('GIF decoded in your browser');
    } catch (err) {
      console.error(err);
      this.toast('Could not decode that GIF');
    }
  }

  private loadVideoUrl(url: string) {
    this.stopMedia();
    this.kind = 'video';
    this.sourceVideo.src = url;
    this.sourceVideo.onloadedmetadata = () => {
      const d = isFinite(this.sourceVideo.duration) ? this.sourceVideo.duration : 3;
      this.fitAutoAspect(this.sourceVideo.videoWidth, this.sourceVideo.videoHeight);
      this.trimStart = 0;
      this.trimEnd = d;
      this.sourceVideo.currentTime = 0;
      this.playing = true;
      this.sourceVideo.playbackRate = this.speed;
      this.sourceVideo.play().catch(() => {});
      this.syncTimeline();
      this.startLoop();
    };
    this.sourceVideo.addEventListener('timeupdate', () => {
      if (this.trimEnd > 0 && this.sourceVideo.currentTime >= this.trimEnd) {
        this.sourceVideo.currentTime = this.trimStart;
      }
      this.syncScrubber();
    });
  }

  async loadFile(file: File) {
    const url = URL.createObjectURL(file);
    const isVideo = file.type.startsWith('video/');
    const isGif = file.type === 'image/gif' || file.name.toLowerCase().endsWith('.gif');
    if (isVideo) this.loadVideoUrl(url);
    else if (isGif) this.loadGifUrl(url);
    else this.loadImageUrl(url);
  }

  private stopMedia() {
    this.playing = false;
    cancelAnimationFrame(this.rafId);
    if (this.kind === 'video') {
      this.sourceVideo.pause();
      this.sourceVideo.removeAttribute('src');
      this.sourceVideo.load();
    }
    this.gif = null;
  }

  private hideOverlay() {
    const ov = this.el['upload-overlay'];
    ov?.classList.add('opacity-0', 'pointer-events-none');
  }

  // ---- Aspect / geometry ----

  private fitAutoAspect(naturalW?: number, naturalH?: number) {
    let w = 600;
    let h = 600;
    const nw = naturalW || (this.kind === 'gif' ? this.gif?.width : undefined) || this.sourceImage.naturalWidth || 0;
    const nh = naturalH || (this.kind === 'gif' ? this.gif?.height : undefined) || this.sourceImage.naturalHeight || 0;
    if (nw > 0 && nh > 0) {
      const scale = Math.min(800 / nw, 800 / nh);
      w = Math.round((nw * scale) / 2) * 2;
      h = Math.round((nh * scale) / 2) * 2;
    }
    this.canvas.width = w;
    this.canvas.height = h;
    this.updateDimIndicator();
    this.render();
  }

  setAspect(a: string) {
    if (a === '1:1') { this.canvas.width = 600; this.canvas.height = 600; }
    else if (a === '16:9') { this.canvas.width = 800; this.canvas.height = 450; }
    else if (a === '9:16') { this.canvas.width = 450; this.canvas.height = 800; }
    else {
      this.fitAutoAspect();
      return;
    }
    this.updateDimIndicator();
    this.render();
  }

  private updateDimIndicator() {
    const el = this.el['canvas-dim-indicator'];
    if (el) el.textContent = `${this.canvas.width} x ${this.canvas.height}px`;
  }

  private mediaSize(): { w: number; h: number } {
    if (this.kind === 'gif' && this.gif) return { w: this.gif.width, h: this.gif.height };
    if (this.kind === 'video' && this.sourceVideo.videoWidth) {
      return { w: this.sourceVideo.videoWidth, h: this.sourceVideo.videoHeight };
    }
    if (this.sourceImage.naturalWidth) {
      return { w: this.sourceImage.naturalWidth, h: this.sourceImage.naturalHeight };
    }
    return { w: 600, h: 600 };
  }

  // ---- Rendering ----

  private render() {
    this.drawScene(this.ctx, this.canvas.width, this.canvas.height);
  }

  private getGifFrame(): HTMLCanvasElement | null {
    if (!this.gif) return null;
    const t = this.gifTime;
    let acc = 0;
    for (let i = 0; i < this.gif.frames.length; i++) {
      acc += this.gif.delays[i];
      if (t < acc) return this.gif.frames[i];
    }
    return this.gif.frames[this.gif.frames.length - 1];
  }

  private drawScene(ctx: CanvasRenderingContext2D, W: number, H: number) {
    const scale = W / 600;
    const pad = Math.round((parseFloat((this.el['slider-bg-padding'] as HTMLInputElement)?.value || '0') || 0) * scale);
    const bg = (this.el['color-bg-fill'] as HTMLInputElement)?.value || '#0a0a0a';

    ctx.save();
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const inner = { x: pad, y: pad, w: W - pad * 2, h: H - pad * 2 };

    // Media with rotation/flip, contain-fit
    const ms = this.mediaSize();
    const isSideways = this.rotationDeg === 90 || this.rotationDeg === 270;
    const mw = isSideways ? ms.h : ms.w;
    const mh = isSideways ? ms.w : ms.h;
    const fit = Math.min(inner.w / mw, inner.h / mh);
    const dw = mw * fit;
    const dh = mh * fit;
    const dx = inner.x + (inner.w - dw) / 2;
    const dy = inner.y + (inner.h - dh) / 2;

    ctx.save();
    ctx.translate(dx + dw / 2, dy + dh / 2);
    ctx.rotate((this.rotationDeg * Math.PI) / 180);
    ctx.scale(this.flipH ? -1 : 1, this.flipV ? -1 : 1);

    const frame = this.getGifFrame();
    if (this.kind === 'gif' && frame) {
      ctx.drawImage(frame, -dw / 2, -dh / 2, dw, dh);
    } else if (this.kind === 'video' && this.sourceVideo.readyState >= 2) {
      ctx.drawImage(this.sourceVideo, -dw / 2, -dh / 2, dw, dh);
    } else if (this.sourceImage.complete && this.sourceImage.naturalWidth > 0) {
      ctx.drawImage(this.sourceImage, -dw / 2, -dh / 2, dw, dh);
    } else {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(-dw / 2, -dh / 2, dw, dh);
      ctx.fillStyle = '#8f8f8f';
      ctx.font = '500 14px "Geist", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Loading media...', 0, 0);
    }
    ctx.restore();

    // Caption banner
    let bannerH = 0;
    const chkBanner = this.el['chk-caption-banner'] as HTMLInputElement;
    if (chkBanner?.checked) {
      bannerH = Math.round(H * 0.18);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, W, bannerH);
    }

    // Text settings
    const fontSize = Math.round((parseFloat((this.el['slider-font-size'] as HTMLInputElement)?.value || '36') || 36) * scale);
    const fontFamily = (this.el['select-font-family'] as HTMLSelectElement)?.value || 'Impact';
    const fill = (this.el['color-text-fill'] as HTMLInputElement)?.value || '#ffffff';
    const stroke = (this.el['color-text-stroke'] as HTMLInputElement)?.value || '#000000';
    const strokeW = Math.round((parseFloat((this.el['slider-stroke-width'] as HTMLInputElement)?.value || '3') || 3) * scale);
    const upper = (this.el['chk-uppercase'] as HTMLInputElement)?.checked ?? true;
    const shadow = (this.el['chk-text-shadow'] as HTMLInputElement)?.checked ?? true;

    const topText = upper ? ((this.el['input-top-text'] as HTMLInputElement)?.value || '').toUpperCase() : (this.el['input-top-text'] as HTMLInputElement)?.value || '';
    const bottomText = upper ? ((this.el['input-bottom-text'] as HTMLInputElement)?.value || '').toUpperCase() : (this.el['input-bottom-text'] as HTMLInputElement)?.value || '';

    const drawMemeText = (text: string, x: number, y: number) => {
      ctx.font = `900 ${fontSize}px "${fontFamily}", Impact, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.lineJoin = 'round';
      if (shadow) {
        ctx.shadowColor = 'rgba(0,0,0,0.55)';
        ctx.shadowBlur = 4 * scale;
        ctx.shadowOffsetY = 2 * scale;
      }
      if (strokeW > 0) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = strokeW;
        ctx.strokeText(text, x, y);
      }
      ctx.fillStyle = fill;
      ctx.fillText(text, x, y);
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
    };

    if (topText) {
      if (chkBanner?.checked) {
        ctx.font = `900 ${fontSize}px "${fontFamily}", Impact, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#171717';
        ctx.fillText(topText, W / 2, bannerH / 2 + fontSize / 3);
      } else {
        this.wrapText(ctx, topText, W / 2, pad + fontSize * 0.9 + 12 * scale, inner.w, fontSize * 1.15, (line, y) => drawMemeText(line, W / 2, y));
      }
    }

    if (bottomText) {
      const lines = this.wrapTextLines(ctx, bottomText, inner.w, fontSize);
      const y0 = H - pad - 24 * scale - (lines.length - 1) * fontSize * 1.15;
      lines.forEach((line, i) => drawMemeText(line, W / 2, y0 + i * fontSize * 1.15));
    }

    // Floating text boxes
    this.floating.forEach((box, i) => {
      const bx = box.x * W;
      const by = box.y * H;
      const bs = Math.round(box.size * scale);
      ctx.font = `900 ${bs}px "Geist", Impact, sans-serif`;
      ctx.textAlign = 'center';
      const tw = ctx.measureText(box.text.toUpperCase()).width;
      if (i === this.selectedBox) {
        ctx.strokeStyle = '#0070f3';
        ctx.lineWidth = 2 * scale;
        ctx.strokeRect(bx - tw / 2 - 6 * scale, by - bs - 4 * scale, tw + 12 * scale, bs + 10 * scale);
      }
      ctx.lineJoin = 'round';
      ctx.strokeStyle = box.stroke;
      ctx.lineWidth = Math.max(1, Math.round(bs / 12));
      ctx.strokeText(box.text.toUpperCase(), bx, by);
      ctx.fillStyle = box.fill;
      ctx.fillText(box.text.toUpperCase(), bx, by);
    });

    this.drawWatermark(ctx, W, H, bannerH, scale);
    ctx.restore();
  }

  private wrapTextLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, fontSize: number): string[] {
    const words = text.split(/\s+/).filter(Boolean);
    const lines: string[] = [];
    let line = '';
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines.length ? lines : [''];
  }

  private wrapText(ctx: CanvasRenderingContext2D, text: string, cx: number, startY: number, maxWidth: number, lineHeight: number, drawLine: (line: string, y: number) => void) {
    const lines = this.wrapTextLines(ctx, text, maxWidth, parseInt(ctx.font.match(/(\d+)px/)?.[1] || '36', 10));
    const y0 = startY - (lines.length - 1) * 0; // top-anchored
    lines.forEach((line, i) => drawLine(line, y0 + i * lineHeight));
  }

  private drawWatermark(ctx: CanvasRenderingContext2D, W: number, H: number, bannerH: number, scale: number) {
    const pos = (this.el['select-watermark-pos'] as HTMLSelectElement)?.value || 'bottom-right';
    const text = (this.el['input-watermark-text'] as HTMLInputElement)?.value || 'gifmememaker.com';
    const opacity = (parseFloat((this.el['slider-wm-opacity'] as HTMLInputElement)?.value || '70') || 70) / 100;
    if (pos === 'none' || !text) return;
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.font = `${Math.round(13 * scale)}px "Geist Mono", monospace`;
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 4 * scale;
    if (pos === 'bottom-right') { ctx.textAlign = 'right'; ctx.fillText(text, W - 14 * scale, H - 14 * scale); }
    else if (pos === 'bottom-left') { ctx.textAlign = 'left'; ctx.fillText(text, 14 * scale, H - 14 * scale); }
    else if (pos === 'top-right') { ctx.textAlign = 'right'; ctx.fillText(text, W - 14 * scale, bannerH + 26 * scale); }
    ctx.restore();
  }

  // ---- Animation loop ----

  private startLoop() {
    cancelAnimationFrame(this.rafId);
    this.lastTs = 0;
    const tick = (ts: number) => {
      if (this.playing) {
        const dt = this.lastTs ? ts - this.lastTs : 16;
        this.lastTs = ts;
        if (this.kind === 'gif' && this.gif) {
          const range = Math.max(this.trimEnd - this.trimStart, 0.01) * 1000;
          let mediaTime = this.gifTime;
          if (mediaTime < this.trimStart * 1000 || mediaTime >= this.trimEnd * 1000) mediaTime = this.trimStart * 1000;
          mediaTime += dt * this.speed;
          if (mediaTime >= this.trimEnd * 1000) mediaTime = this.trimStart * 1000;
          this.gifTime = mediaTime;
        }
        this.render();
        this.syncScrubber();
      } else {
        this.lastTs = ts;
      }
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  togglePlay() {
    if (this.recording) return;
    if (this.kind === 'image') {
      this.toast('Static image — nothing to play');
      return;
    }
    this.playing = !this.playing;
    if (this.kind === 'video') {
      if (this.playing) this.sourceVideo.play().catch(() => {});
      else this.sourceVideo.pause();
    }
    this.updatePlayIcon();
    if (this.kind === 'gif') this.startLoop();
  }

  seek(mediaTimeSec: number) {
    if (this.kind === 'gif') {
      this.gifTime = mediaTimeSec * 1000;
      this.render();
    } else if (this.kind === 'video') {
      this.sourceVideo.currentTime = mediaTimeSec;
      this.render();
    }
    this.syncScrubber();
  }

  private updatePlayIcon() {
    const play = this.el['icon-play'];
    const pause = this.el['icon-pause'];
    play?.classList.toggle('hidden', this.playing);
    pause?.classList.toggle('hidden', !this.playing);
  }

  private syncScrubber() {
    const scrub = this.el['timeline-scrubber'] as HTMLInputElement;
    const cur = this.el['current-time'];
    const range = Math.max(this.trimEnd - this.trimStart, 0.001);
    let t = this.trimStart;
    if (this.kind === 'gif') t = this.gifTime / 1000;
    else if (this.kind === 'video') t = this.sourceVideo.currentTime;
    if (scrub) scrub.value = String(Math.min(100, Math.max(0, ((t - this.trimStart) / range) * 100)));
    if (cur) cur.textContent = fmtTime(t - this.trimStart);
  }

  private syncTimeline() {
    const range = Math.max(this.trimEnd - this.trimStart, 0.001);
    const dur = this.el['duration-time'];
    if (dur) dur.textContent = fmtTime(range);
    this.syncScrubber();
    const startIn = this.el['input-trim-start'] as HTMLInputElement;
    const endIn = this.el['input-trim-end'] as HTMLInputElement;
    const max = this.kind === 'gif' ? this.gif!.duration / 1000 : this.kind === 'video' ? this.sourceVideo.duration : 60;
    if (startIn) startIn.max = String(max);
    if (endIn) endIn.max = String(max);
  }

  // ---- Transforms ----

  rotate90() {
    this.rotationDeg = (this.rotationDeg + 90) % 360;
    this.render();
  }

  toggleFlipH() { this.flipH = !this.flipH; this.render(); }
  toggleFlipV() { this.flipV = !this.flipV; this.render(); }

  resetCanvas() {
    this.rotationDeg = 0;
    this.flipH = false;
    this.flipV = false;
    this.speed = 1.0;
    this.markSpeedBtns(1.0);
    this.trimStart = 0;
    this.trimEnd = this.kind === 'gif' ? (this.gif?.duration ?? 0) / 1000 : this.kind === 'video' ? this.sourceVideo.duration : 0;
    this.gifTime = 0;
    if (this.kind === 'video') this.sourceVideo.currentTime = 0;
    this.fitAutoAspect();
    this.syncTimeline();
    this.render();
  }

  setSpeed(s: number) {
    this.speed = s;
    if (this.kind === 'video') this.sourceVideo.playbackRate = s;
    this.markSpeedBtns(s);
  }

  private markSpeedBtns(active: number) {
    document.querySelectorAll('.speed-btn').forEach((b) => {
      const on = parseFloat(b.getAttribute('data-speed') || '0') === active;
      b.classList.toggle('bg-[#171717]', on);
      b.classList.toggle('dark:bg-white', on);
      b.classList.toggle('text-white', on);
      b.classList.toggle('dark:text-[#171717]', on);
      b.classList.toggle('font-semibold', on);
      b.classList.toggle('bg-[#fafafa]', !on);
      b.classList.toggle('dark:bg-[#181818]', !on);
      b.classList.toggle('text-[#171717]', !on);
      b.classList.toggle('dark:text-white', !on);
    });
  }

  // ---- Floating text boxes ----

  addFloatingText() {
    this.floating.push({
      text: 'DOUBLE TAP TO EDIT',
      x: 0.5,
      y: 0.5,
      size: 28,
      fill: '#ffffff',
      stroke: '#000000'
    });
    this.selectedBox = this.floating.length - 1;
    this.render();
    this.toast('Drag to move. Double-click canvas text to edit. Empty text deletes it.');
  }

  private hitTestBox(px: number, py: number): number {
    const W = this.canvas.width;
    const H = this.canvas.height;
    const scale = W / 600;
    const ctx2 = this.canvas.getContext('2d')!;
    for (let i = this.floating.length - 1; i >= 0; i--) {
      const box = this.floating[i];
      const bs = Math.round(box.size * scale);
      ctx2.font = `900 ${bs}px "Geist", Impact, sans-serif`;
      const tw = ctx2.measureText(box.text.toUpperCase()).width;
      const bx = box.x * W;
      const by = box.y * H;
      if (px >= bx - tw / 2 - 8 && px <= bx + tw / 2 + 8 && py >= by - bs - 4 && py <= by + 8) return i;
    }
    return -1;
  }

  // ---- Export ----

  private exportSize(): { W: number; H: number; pro: boolean } {
    const proSelected = document.getElementById('res-pro')?.dataset.active === 'true';
    if (proSelected && this.pro && !this.freeOnly) {
      const ratio = this.canvas.width / this.canvas.height;
      if (ratio >= 1) return { W: 2160, H: Math.round(2160 / ratio / 2) * 2, pro: true };
      return { W: Math.round((2160 * ratio) / 2) * 2, H: 2160, pro: true };
    }
    const ratio = this.canvas.width / this.canvas.height;
    const base = 1080;
    if (ratio >= 1) return { W: base, H: Math.round(base / ratio / 2) * 2, pro: false };
    return { W: Math.round((base * ratio) / 2) * 2, H: base, pro: false };
  }

  private requirePro(label: string, fn: () => void): void {
    if (this.pro && !this.freeOnly) {
      fn();
    } else {
      this.openProModal(label);
    }
  }

  private checkWatermarkPro(): boolean {
    const pos = (this.el['select-watermark-pos'] as HTMLSelectElement)?.value || 'bottom-right';
    if (pos === 'none' && !(this.pro && !this.freeOnly)) {
      this.openProModal('Watermark removal');
      return false;
    }
    return true;
  }

  private async exportStill() {
    const { pro } = this.exportSize();
    if (pro) {
      this.requirePro('Ultra HD (4K) stills', () => void this.doExportStill());
      return;
    }
    if (!this.checkWatermarkPro()) return;
    await this.doExportStill();
  }

  private async doExportStill() {
    const { W, H } = this.exportSize();
    const out = document.createElement('canvas');
    out.width = W;
    out.height = H;
    this.drawScene(out.getContext('2d')!, W, H);
    const format = (document.getElementById('select-still-format') as HTMLSelectElement | null)?.value || 'png';
    out.toBlob((blob) => {
      if (!blob) return;
      this.downloadBlob(blob, `gifmememaker-${Date.now()}.${format === 'jpg' ? 'jpg' : 'png'}`);
      this.toast(`Exported ${format.toUpperCase()} ${W}x${H}`);
    }, format === 'jpg' ? 'image/jpeg' : 'image/png', 0.92);
  }

  private async exportGif() {
    if (!this.checkWatermarkPro()) return;
    const fpsSel = parseFloat((this.el['select-fps'] as HTMLSelectElement)?.value || '24');
    if (fpsSel > 24 && !(this.pro && !this.freeOnly)) {
      this.openProModal('30/60 FPS GIF export');
      return;
    }

    const { W, H } = this.exportSize();

    this.showProgress(true, 0);
    try {
      const out = document.createElement('canvas');
      out.width = W;
      out.height = H;
      const octx = out.getContext('2d', { willReadFrequently: true })!;

      let frameCanvases: HTMLCanvasElement[] = [];

      if (this.kind === 'gif' && this.gif) {
        let frameIdx = 0;
        let cum = 0;
        while (frameIdx < this.gif.frames.length && cum < this.trimStart * 1000) {
          cum += this.gif.delays[frameIdx];
          frameIdx++;
        }
        const collected: HTMLCanvasElement[] = [];
        let t = this.trimStart * 1000;
        while (frameIdx < this.gif.frames.length && t < this.trimEnd * 1000 && collected.length < MAX_GIF_FRAMES) {
          this.gifTime = cum + this.gif.delays[frameIdx] / 2;
          this.drawScene(octx, W, H);
          const snap = document.createElement('canvas');
          snap.width = W;
          snap.height = H;
          snap.getContext('2d')!.drawImage(out, 0, 0);
          collected.push(snap);
          cum += this.gif.delays[frameIdx];
          t += this.gif.delays[frameIdx];
          frameIdx++;
          this.showProgress(true, Math.round((collected.length / MAX_GIF_FRAMES) * 100));
          await new Promise((r) => setTimeout(r, 0));
        }
        if (collected.length === 0) {
          this.drawScene(octx, W, H);
          const snap = document.createElement('canvas');
          snap.width = W;
          snap.height = H;
          snap.getContext('2d')!.drawImage(out, 0, 0);
          collected.push(snap);
        }
        frameCanvases = collected;
      } else if (this.kind === 'video') {
        const range = Math.max(this.trimEnd - this.trimStart, 0.5);
        const fps = Math.min(fpsSel, 24);
        let count = Math.min(Math.round(range * fps), MAX_GIF_FRAMES);
        if (count < 2) count = 2;
        const step = range / count;
        this.sourceVideo.pause();
        for (let i = 0; i < count; i++) {
          await this.seekVideo(this.trimStart + i * step);
          this.drawScene(octx, W, H);
          const snap = document.createElement('canvas');
          snap.width = W;
          snap.height = H;
          snap.getContext('2d')!.drawImage(out, 0, 0);
          frameCanvases.push(snap);
          this.showProgress(true, Math.round(((i + 1) / count) * 100));
        }
      } else {
        this.drawScene(octx, W, H);
        const snap = document.createElement('canvas');
        snap.width = W;
        snap.height = H;
        snap.getContext('2d')!.drawImage(out, 0, 0);
        frameCanvases = [snap, snap];
      }

      // Compose GIF
      const delayCs = Math.max(1, Math.min(60, Math.round(1000 / Math.min(fpsSel, 30) / 10)));
      const buf = new Uint8Array(W * H * frameCanvases.length * 5 + 4096);
      const writer = new GifWriter(buf, W, H, { loop: 0 });
      for (let i = 0; i < frameCanvases.length; i++) {
        const fctx = frameCanvases[i].getContext('2d', { willReadFrequently: true })!;
        const imageData = fctx.getImageData(0, 0, W, H);
        const { indexedPixels, palette } = quantizeRGBA(imageData.data, W, H, 256);
        const safePalette = padToPowerOfTwo(palette);
        writer.addFrame(0, 0, W, H, indexedPixels, { palette: safePalette, delay: delayCs });
        this.showProgress(true, Math.round(((i + 1) / frameCanvases.length) * 100));
        await new Promise((r) => setTimeout(r, 0));
      }
      const end = writer.end();
      const blob = new Blob([buf.subarray(0, end)], { type: 'image/gif' });
      this.downloadBlob(blob, `gifmememaker-${Date.now()}.gif`);
      this.toast(`GIF exported (${frameCanvases.length} frames, ${W}x${H})`);
    } catch (err) {
      console.error(err);
      this.toast('GIF export failed — try a smaller trim range');
    } finally {
      this.showProgress(false, 100);
    }
  }

  private async seekVideo(t: number): Promise<void> {
    return new Promise((resolve) => {
      const v = this.sourceVideo;
      const handler = () => { v.removeEventListener('seeked', handler); resolve(); };
      v.addEventListener('seeked', handler);
      v.currentTime = t;
      setTimeout(() => { v.removeEventListener('seeked', handler); resolve(); }, 1500);
    });
  }

  private async exportVideo() {
    if (this.kind === 'image') {
      this.toast('Static image — use PNG/JPG export instead');
      return;
    }
    if (!this.checkWatermarkPro()) return;
    this.requirePro('Video (WEBM/MP4) export', () => this.doExportVideo());
  }

  private async doExportVideo() {
    if (this.recording) return;
    const { W, H } = this.exportSize();
    const out = document.createElement('canvas');
    out.width = W;
    out.height = H;
    const octx = out.getContext('2d')!;

    const stream = out.captureStream(30);
    const mimeCandidates = ['video/mp4;codecs=avc1', 'video/mp4', 'video/webm;codecs=vp9', 'video/webm'];
    const mime = mimeCandidates.find((m) => MediaRecorder.isTypeSupported(m)) || '';
    if (!mime) {
      this.toast('Video recording not supported in this browser');
      return;
    }
    const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 8_000_000 });
    const chunks: BlobPart[] = [];
    rec.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };

    const range = Math.max(this.trimEnd - this.trimStart, 0.5);
    const ext = mime.includes('mp4') ? 'mp4' : 'webm';
    this.recording = true;
    this.showProgress(true, 0);

    let startTs = 0;
    const stopped = new Promise<void>((resolve) => {
      rec.onstop = () => {
        const blob = new Blob(chunks, { type: mime });
        this.downloadBlob(blob, `gifmememaker-${Date.now()}.${ext}`);
        this.toast(`Video exported (${ext.toUpperCase()})`);
        this.recording = false;
        this.showProgress(false, 100);
        resolve();
      };
    });

    if (this.kind === 'video') {
      this.sourceVideo.pause();
      await this.seekVideo(this.trimStart);
      this.sourceVideo.playbackRate = this.speed;
    } else if (this.kind === 'gif') {
      this.gifTime = this.trimStart * 1000;
    }

    rec.start(200);
    startTs = performance.now();
    this.playing = false;

    await new Promise<void>((resolve) => {
      const loop = () => {
        const elapsed = (performance.now() - startTs) / 1000;
        if (this.kind === 'video') {
          if (this.sourceVideo.readyState >= 2) this.drawScene(octx, W, H);
          if (!this.sourceVideo.ended && this.sourceVideo.currentTime >= this.trimEnd) {
            this.sourceVideo.currentTime = this.trimStart;
          }
          this.showProgress(true, Math.min(99, Math.round((elapsed / range) * 100)));
        } else if (this.kind === 'gif' && this.gif) {
          let mediaTime = this.trimStart * 1000 + elapsed * this.speed;
          if (mediaTime >= this.trimEnd * 1000) mediaTime = this.trimStart * 1000;
          this.gifTime = mediaTime;
          this.drawScene(octx, W, H);
          this.showProgress(true, Math.min(99, Math.round((elapsed / range) * 100)));
        }
        if (elapsed >= range / this.speed + 0.15) {
          resolve();
        } else {
          requestAnimationFrame(loop);
        }
      };
      if (this.kind === 'video') this.sourceVideo.play().catch(() => {});
      requestAnimationFrame(loop);
    });

    rec.stop();
    this.sourceVideo.pause();
    await stopped;
    this.playing = false;
    this.render();
  }

  private async copyToClipboard() {
    try {
      const blob = await new Promise<Blob | null>((resolve) => this.canvas.toBlob(resolve, 'image/png'));
      if (!blob) return;
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      this.toast('Copied to clipboard');
    } catch {
      this.toast('Clipboard copy failed — use download instead');
    }
  }

  // ---- AI captions ----

  async generateAiCaption(category: string) {
    if (this.aiUsesLeft <= 0 && !(this.pro && !this.freeOnly)) {
      this.openProModal('Unlimited AI caption generations');
      return;
    }
    const prompts = AI_CAPTION_PROMPTS[category] || AI_CAPTION_PROMPTS['humorous'];
    const pick = prompts[Math.floor(Math.random() * prompts.length)];
    const top = this.el['input-top-text'] as HTMLInputElement;
    const bottom = this.el['input-bottom-text'] as HTMLInputElement;
    if (top) top.value = pick.top;
    if (bottom) bottom.value = pick.bottom;
    this.render();
    this.updateAiLeft();
    this.toast(`AI captions generated (${category})`);
  }

  private updateAiLeft() {
    const el = this.el['lbl-ai-left'];
    if (!el) return;
    el.textContent = this.pro && !this.freeOnly ? 'PRO · UNLIMITED' : `${this.aiUsesLeft} free left`;
  }

  // ---- Pro modal ----

  private openProModal(feature: string) {
    const modal = this.el['pro-modal'];
    if (!modal) return;
    const label = modal.querySelector('#pro-modal-feature');
    if (label) label.textContent = feature;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  private closeProModal() {
    const modal = this.el['pro-modal'];
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  unlockPro() {
    this.pro = true;
    localStorage.setItem('mif_pro', '1');
    this.closeProModal();
    this.updateAiLeft();
    this.toast('Pro unlocked — all features enabled');
  }

  // ---- Free-only mode ----

  private applyFreeOnlyLocks() {
    const locked = ['res-pro', 'select-fps'];
    // Lock watermark removal
    const wm = this.el['select-watermark-pos'] as HTMLSelectElement;
    if (wm) {
      const noneOpt = wm.querySelector('option[value="none"]');
      if (noneOpt) noneOpt.disabled = this.freeOnly;
      if (this.freeOnly && wm.value === 'none') wm.value = 'bottom-right';
    }
    const fps = this.el['select-fps'] as HTMLSelectElement;
    if (fps) {
      const high = fps.querySelectorAll('option');
      high.forEach((o) => {
        const v = parseFloat(o.value);
        o.disabled = this.freeOnly && v > 24;
        if (this.freeOnly && v > 24) fps.value = '24';
      });
    }
    const aiBtns = document.querySelectorAll('.ai-gen-btn');
    aiBtns.forEach((b) => {
      if (this.freeOnly && this.aiUsesLeft <= 0) b.classList.add('opacity-40', 'pointer-events-none');
      else b.classList.remove('opacity-40', 'pointer-events-none');
    });
  }

  setFreeOnly(on: boolean) {
    this.freeOnly = on;
    this.applyFreeOnlyLocks();
    document.dispatchEvent(new CustomEvent('mif:free-only', { detail: on }));
    this.toast(on ? 'Free features only — Pro is locked' : 'All features available');
  }

  // ---- Progress / toast / download ----

  private showProgress(show: boolean, percent: number) {
    const bar = this.el['export-progress-bar'];
    const fill = this.el['progress-fill'];
    const pct = this.el['progress-percent'];
    if (bar) bar.classList.toggle('opacity-0', !show);
    if (bar) bar.classList.toggle('pointer-events-none', !show);
    if (fill) (fill as HTMLElement).style.width = `${percent}%`;
    if (pct) pct.textContent = `${percent}%`;
  }

  private toast(msg: string) {
    const t = this.el['studio-toast'] as HTMLElement;
    if (!t) return;
    t.textContent = msg;
    t.classList.remove('opacity-0', 'pointer-events-none');
    clearTimeout((this as any).__toastTimer);
    (this as any).__toastTimer = setTimeout(() => t.classList.add('opacity-0', 'pointer-events-none'), 2400);
  }

  private downloadBlob(blob: Blob, filename: string) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }

  // ---- Events ----

  private bindInputs() {
    const inputs = [
      'input-top-text', 'input-bottom-text', 'select-font-family', 'slider-font-size',
      'color-text-fill', 'color-text-stroke', 'slider-stroke-width', 'chk-caption-banner',
      'chk-uppercase', 'chk-text-shadow', 'input-watermark-text', 'select-watermark-pos',
      'slider-wm-opacity', 'color-bg-fill', 'slider-bg-padding'
    ] as const;
    inputs.forEach((id) => {
      const el = this.el[id] as HTMLElement | null;
      el?.addEventListener('input', () => {
        const lbl = this.el['lbl-font-size'];
        if (id === 'slider-font-size' && lbl) lbl.textContent = (el as HTMLInputElement).value;
        if (id === 'slider-wm-opacity') {
          const o = this.el['lbl-wm-opacity'];
          if (o) o.textContent = `${(el as HTMLInputElement).value}%`;
        }
        if (id === 'slider-bg-padding') {
          const p = this.el['lbl-bg-padding'];
          if (p) p.textContent = (el as HTMLInputElement).value;
        }
        if (id === 'select-watermark-pos' && (el as HTMLSelectElement).value === 'none') {
          if (!(this.pro && !this.freeOnly)) this.toast('Pro feature: watermark removal unlocks at export');
        }
        this.render();
      });
    });

    (this.el['select-bg-preset'] as HTMLSelectElement | null)?.addEventListener('change', (e) => {
      const bg = this.el['color-bg-fill'] as HTMLInputElement;
      if (bg) bg.value = (e.target as HTMLSelectElement).value;
      this.render();
    });

    (this.el['btn-add-floating-text'] as HTMLElement | null)?.addEventListener('click', () => this.addFloatingText());

    const overlay = this.el['upload-overlay'] as HTMLElement;
    const fileInput = this.el['file-input'] as HTMLInputElement;
    overlay?.addEventListener('click', () => fileInput?.click());
    fileInput?.addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) void this.loadFile(file);
    });

    // Drag & drop onto the whole studio
    const root = document.getElementById('studio');
    ['dragover', 'drop'].forEach((ev) => {
      root?.addEventListener(ev, (e) => e.preventDefault());
    });
    root?.addEventListener('drop', (e) => {
      const file = e.dataTransfer?.files?.[0];
      if (file) void this.loadFile(file);
    });

    // Sample button: random template
    (this.el['sample-demo-btn'] as HTMLElement | null)?.addEventListener('click', (e) => {
      e.stopPropagation();
      const tpl = MEME_TEMPLATES[Math.floor(Math.random() * MEME_TEMPLATES.length)];
      this.loadTemplateUrl(tpl.url, tpl.topDefault, tpl.bottomDefault, tpl.type);
    });

    // Trim inputs
    const startIn = this.el['input-trim-start'] as HTMLInputElement;
    const endIn = this.el['input-trim-end'] as HTMLInputElement;
    const applyTrim = () => {
      let s = Math.max(0, parseFloat(startIn.value) || 0);
      let en = Math.max(0, parseFloat(endIn.value) || 0);
      if (en <= s) en = s + 0.5;
      this.trimStart = s;
      this.trimEnd = en;
      if (this.kind === 'video') this.sourceVideo.currentTime = s;
      if (this.kind === 'gif') this.gifTime = s * 1000;
      this.syncTimeline();
      this.render();
    };
    startIn?.addEventListener('input', applyTrim);
    endIn?.addEventListener('input', applyTrim);
  }

  private bindTransport() {
    (this.el['btn-play-pause'] as HTMLElement | null)?.addEventListener('click', () => this.togglePlay());
    (this.el['btn-reset-canvas'] as HTMLElement | null)?.addEventListener('click', () => this.resetCanvas());
    (this.el['btn-rotate-90'] as HTMLElement | null)?.addEventListener('click', () => this.rotate90());
    (this.el['btn-flip-h'] as HTMLElement | null)?.addEventListener('click', () => this.toggleFlipH());
    (this.el['btn-flip-v'] as HTMLElement | null)?.addEventListener('click', () => this.toggleFlipV());

    const scrub = this.el['timeline-scrubber'] as HTMLInputElement;
    scrub?.addEventListener('input', () => {
      if (this.kind === 'image') return;
      const range = Math.max(this.trimEnd - this.trimStart, 0.001);
      this.seek(this.trimStart + (parseFloat(scrub.value) / 100) * range);
    });

    document.querySelectorAll('.speed-btn').forEach((b) => {
      b.addEventListener('click', () => this.setSpeed(parseFloat(b.getAttribute('data-speed') || '1')));
    });

    document.querySelectorAll('.aspect-btn').forEach((b) => {
      b.addEventListener('click', () => {
        document.querySelectorAll('.aspect-btn').forEach((a) => a.classList.remove('active-ratio', 'bg-[#fafafa]', 'dark:bg-[#1a1a1a]', 'text-[#171717]', 'dark:text-white'));
        b.classList.add('active-ratio', 'bg-[#fafafa]', 'dark:bg-[#1a1a1a]', 'text-[#171717]', 'dark:text-white');
        this.setAspect(b.getAttribute('data-aspect') || 'auto');
      });
    });
  }

  private bindExport() {
    (this.el['btn-export-download'] as HTMLElement | null)?.addEventListener('click', () => {
      const fmt = this.currentFormat();
      if (fmt === 'gif') void this.exportGif();
      else if (fmt === 'video') void this.exportVideo();
      else void this.exportStill();
    });
    (this.el['btn-copy-clipboard'] as HTMLElement | null)?.addEventListener('click', () => void this.copyToClipboard());

    document.querySelectorAll('.format-btn').forEach((b) => {
      b.addEventListener('click', () => {
        const val = b.getAttribute('data-format');
        this.activeFormat = val === 'video' ? 'video' : val === 'png' ? 'png' : 'gif';
        document.querySelectorAll('.format-btn').forEach((x) => {
          x.classList.remove('bg-[#171717]', 'dark:bg-white', 'text-white', 'dark:text-[#171717]', 'font-semibold');
          x.classList.add('bg-[#fafafa]', 'dark:bg-[#181818]', 'text-[#171717]', 'dark:text-white', 'border', 'border-[#ebebeb]', 'dark:border-[#333333]');
        });
        b.classList.remove('bg-[#fafafa]', 'dark:bg-[#181818]', 'text-[#171717]', 'dark:text-white', 'border', 'border-[#ebebeb]', 'dark:border-[#333333]');
        b.classList.add('bg-[#171717]', 'dark:bg-white', 'text-white', 'dark:text-[#171717]', 'font-semibold');
      });
    });

    (this.el['res-free'] as HTMLElement | null)?.addEventListener('click', () => this.markRes('free'));
    (this.el['res-pro'] as HTMLElement | null)?.addEventListener('click', () => {
      this.requirePro('Ultra HD (4K) resolution', () => this.markRes('pro'));
    });
  }

  private currentFormat(): Format {
    return this.activeFormat;
  }

  private markRes(which: 'free' | 'pro') {
    const free = this.el['res-free'] as HTMLElement;
    const pro = this.el['res-pro'] as HTMLElement;
    const style = (el: HTMLElement, on: boolean) => {
      el.classList.toggle('bg-[#171717]', on);
      el.classList.toggle('dark:bg-white', on);
      el.classList.toggle('text-white', on);
      el.classList.toggle('dark:text-[#171717]', on);
      el.classList.toggle('bg-[#fafafa]', !on);
      el.classList.toggle('dark:bg-[#181818]', !on);
      el.classList.toggle('text-[#4d4d4d]', !on);
      el.classList.toggle('dark:text-[#a1a1a1]', !on);
      el.dataset.active = String(on);
    };
    style(free, which === 'free');
    style(pro, which === 'pro');
  }

  private bindProModal() {
    (this.el['pro-modal-unlock'] as HTMLElement | null)?.addEventListener('click', () => this.unlockPro());
    (this.el['pro-modal-close'] as HTMLElement | null)?.addEventListener('click', () => this.closeProModal());
  }

  private bindTemplateEvents() {
    document.addEventListener('mif:load-template', ((e: Event) => {
      const detail = (e as CustomEvent<{ url: string; top?: string; bottom?: string; type?: string }>).detail;
      if (detail?.url) this.loadTemplateUrl(detail.url, detail.top || '', detail.bottom || '', detail.type || 'unknown');
    }) as EventListener);
  }

  private bindFreeOnly() {
    const chk = this.el['chk-free-only-mode'] as HTMLInputElement;
    chk?.addEventListener('change', () => this.setFreeOnly(chk.checked));
    this.updateAiLeft();
    this.applyFreeOnlyLocks();
  }

  private bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLSelectElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        this.togglePlay();
      }
    });
  }

  private bindPointer() {
    const c = this.canvas;
    c.addEventListener('pointerdown', (e) => {
      const rect = c.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * c.width;
      const py = ((e.clientY - rect.top) / rect.height) * c.height;
      const hit = this.hitTestBox(px, py);
      this.selectedBox = hit;
      if (hit >= 0) {
        const box = this.floating[hit];
        this.dragOffset = {
          x: px - box.x * c.width,
          y: py - box.y * c.height
        };
        c.setPointerCapture(e.pointerId);
        c.style.cursor = 'grabbing';
      }
      this.render();
    });
    c.addEventListener('pointermove', (e) => {
      if (this.selectedBox < 0) return;
      const rect = c.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * c.width;
      const py = ((e.clientY - rect.top) / rect.height) * c.height;
      const box = this.floating[this.selectedBox];
      box.x = Math.min(1, Math.max(0, (px - this.dragOffset.x) / c.width));
      box.y = Math.min(1, Math.max(0, (py - this.dragOffset.y) / c.height));
      this.render();
    });
    c.addEventListener('pointerup', (e) => {
      if (this.selectedBox >= 0) {
        c.releasePointerCapture(e.pointerId);
        c.style.cursor = '';
      }
    });
    c.addEventListener('dblclick', (e) => {
      const rect = c.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * c.width;
      const py = ((e.clientY - rect.top) / rect.height) * c.height;
      const hit = this.hitTestBox(px, py);
      if (hit >= 0) {
        const box = this.floating[hit];
        const val = window.prompt('Edit floating text (leave empty to delete):', box.text);
        if (val === null) return;
        if (!val.trim()) this.floating.splice(hit, 1);
        else box.text = val;
        this.selectedBox = -1;
        this.render();
      }
    });
  }
}

