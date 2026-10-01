import { GifWriter } from 'omggif';

export interface GifEncoderOptions {
  width: number;
  height: number;
  fps?: number;
  quality?: 'high' | 'medium' | 'low';
  watermarkText?: string;
  watermarkPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  watermarkOpacity?: number;
}

/**
 * Simple 256-color palette quantization from RGBA image data
 */
export function quantizeRGBA(rgba: Uint8ClampedArray, width: number, height: number, maxColors = 256) {
  const pixelCount = width * height;
  const indexedPixels = new Uint8Array(pixelCount);
  const palette: number[] = [];
  const colorMap = new Map<number, number>();

  // Quantize RGB bits to group similar colors
  for (let i = 0; i < pixelCount; i++) {
    const offset = i * 4;
    const r = rgba[offset];
    const g = rgba[offset + 1];
    const b = rgba[offset + 2];
    const a = rgba[offset + 3];

    // If fully transparent
    if (a < 16) {
      const key = -1;
      if (!colorMap.has(key)) {
        if (palette.length < maxColors) {
          colorMap.set(key, palette.length);
          palette.push(0x000000);
        }
      }
      indexedPixels[i] = colorMap.get(key) || 0;
      continue;
    }

    const qr = (r >> 3) << 3;
    const qg = (g >> 3) << 3;
    const qb = (b >> 3) << 3;
    const packed = (qr << 16) | (qg << 8) | qb;

    if (!colorMap.has(packed)) {
      if (palette.length < maxColors) {
        colorMap.set(packed, palette.length);
        palette.push((r << 16) | (g << 8) | b);
      } else {
        // Nearest neighbor search
        let minDistance = Infinity;
        let bestIndex = 0;
        for (let p = 0; p < palette.length; p++) {
          const pr = (palette[p] >> 16) & 0xff;
          const pg = (palette[p] >> 8) & 0xff;
          const pb = palette[p] & 0xff;
          const dist = (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2;
          if (dist < minDistance) {
            minDistance = dist;
            bestIndex = p;
          }
        }
        colorMap.set(packed, bestIndex);
      }
    }
    indexedPixels[i] = colorMap.get(packed) || 0;
  }

  while (palette.length < 2) {
    palette.push(0x000000);
  }

  return { indexedPixels, palette };
}

/**
 * Capture canvas frames and return a Blob of the compiled GIF file
 */
export async function createGifFromCanvas(
  canvas: HTMLCanvasElement,
  drawFrameCallback: (frameIndex: number, totalFrames: number) => void,
  frameCount: number = 15,
  delayMs: number = 100,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  const width = canvas.width;
  const height = canvas.height;

  const buf = new Uint8Array(width * height * frameCount * 5 + 2048);
  let writer: GifWriter | null = null;

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = height;
  const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });

  for (let f = 0; f < frameCount; f++) {
    drawFrameCallback(f, frameCount);

    if (tempCtx) {
      tempCtx.drawImage(canvas, 0, 0);
      const imageData = tempCtx.getImageData(0, 0, width, height);
      const { indexedPixels, palette } = quantizeRGBA(imageData.data, width, height, 256);

      if (!writer) {
        writer = new GifWriter(buf, width, height, { loop: 0 });
      }

      const frameDelayCentiseconds = Math.max(1, Math.round(delayMs / 10));
      writer.addFrame(0, 0, width, height, indexedPixels, {
        palette: palette,
        delay: frameDelayCentiseconds,
      });
    }

    if (onProgress) {
      onProgress(Math.round(((f + 1) / frameCount) * 100));
    }

    await new Promise((resolve) => setTimeout(resolve, 10));
  }

  if (!writer) {
    throw new Error('Failed to initialize GIF writer');
  }

  const endOffset = writer.end();
  const gifData = buf.subarray(0, endOffset);
  return new Blob([gifData], { type: 'image/gif' });
}
