export const SITE_URL = 'https://gifmememaker.com';
export const SITE_NAME = 'gifmememaker.com';
export const SITE_DOMAIN = 'gifmememaker.com';

export const DEFAULT_TITLE = 'Meme Maker Online - Free Meme Maker & GIF Generator | gifmememaker.com';

export const DEFAULT_DESCRIPTION =
  'Free meme maker online with instant captions, video meme maker, GIF meme maker and 180+ templates. Make memes free in seconds - no signup, no downloads.';

/** Main + supporting target keywords for the home page. */
export const TARGET_KEYWORDS = [
  'meme maker',
  'meme maker online',
  'video meme maker',
  'online meme maker',
  'meme maker app',
  'meme maker free',
  'gif meme maker',
  'best meme maker app',
  'meme maker video',
  'meme maker gif',
  'free meme maker',
  'free meme maker app',
];

export interface Faq {
  q: string;
  a: string;
}

/** Shared with FAQSection.astro and the FAQPage JSON-LD so they never drift apart. */
export const FAQS: Faq[] = [
  {
    q: 'Which meme maker is the best?',
    a: 'The best meme maker is one that is free, runs online with no signup, and handles images, GIFs and video in a single tool. gifmememaker.com checks every box: it is a free meme maker app that works in any browser, ships 180+ templates, instant captions, a GIF meme maker and a video meme maker, and exports without a forced watermark. Because everything runs locally in your browser, it is also faster than downloading a meme maker app.',
  },
  {
    q: 'How can I use a meme maker to create videos?',
    a: 'Use the video meme maker inside the studio: upload an MP4, WebM or MOV file (or pick a video template), trim the clip with the start and end handles, set playback speed from 0.25x to 3.0x, then add top and bottom captions or floating text. Preview the result frame by frame on the timeline and export. You can render a looping video meme as an animated GIF for free, or export MP4/WebM with Pro. No video editing experience is required.',
  },
  {
    q: 'How to use an online meme maker?',
    a: 'Using this online meme maker takes four steps: (1) open the studio and upload your image, GIF or video, or start from a template; (2) add your text — type it manually or let the instant caption generator write captions for you; (3) style it with fonts, colors, outlines and aspect ratio presets; (4) hit Export and download. Everything happens in the browser, so there is nothing to install and no account to create.',
  },
  {
    q: 'What are the quality features of a meme maker?',
    a: 'A quality meme maker should offer high-resolution export, crisp text rendering, and full creative control. Key features to look for: HD PNG/JPG and animated GIF export, 180+ ready-made templates, five professional fonts with fill, outline, stroke and shadow controls, aspect presets for Instagram, Twitter/X and TikTok (1:1, 16:9, 9:16), frame-accurate trimming, 0.25x–3.0x speed control, adjustable GIF frame rate, instant captions, an optional watermark and 100% private in-browser processing. The meme maker free tier here includes all of them.',
  },
  {
    q: 'What is the best free meme maker app?',
    a: 'gifmememaker.com is a free meme maker app that runs entirely in your browser, so there is nothing to install. It combines an online meme maker, instant captions, a video meme maker, a GIF meme maker and 180+ free templates in one place — with no mandatory signup and no forced watermark.',
  },
  {
    q: 'Do I need to create an account to use this meme maker online?',
    a: 'No. This online meme maker works instantly: open the studio, upload a file or pick a template, add your text and download. No email, no password, no social login and no credit card are ever required.',
  },
  {
    q: 'Is there a caption generator that writes captions for me?',
    a: 'Yes. The instant caption generator inside the studio generates top and bottom captions with five comedic vibes — humorous, relatable, tech, sarcastic and Gen Z. Click a suggestion to apply it, then edit the text like any other caption.',
  },
  {
    q: 'Can I make a video meme or a GIF meme with this tool?',
    a: 'Absolutely. The video meme maker accepts MP4, WebM and MOV files: trim the clip, set the speed from 0.25x to 3.0x, add captions and export a looping GIF. Animated GIF templates stay live while you type, so your meme maker GIF output looks exactly like the preview.',
  },
  {
    q: 'Is this meme maker free, or are there hidden costs?',
    a: 'The core meme maker is 100% free — PNG/JPG exports, GIF export, templates, trimming, speed control and instant captions all work without paying. A Pro tier only unlocks extras such as 4K stills, MP4/WebM video export, custom video captioning and watermark removal. You can switch on Free Features Only mode to hide Pro entirely.',
  },
  {
    q: 'Are my uploaded files private?',
    a: '100% private. All processing, canvas rendering, frame extraction, and GIF encoding happen directly inside your web browser. Your media is never uploaded to any remote server.',
  },
  {
    q: 'How do I convert a video to a GIF?',
    a: 'Drag & drop (or browse for) an MP4, WebM or MOV file in the studio. Trim your clip, add captions, pick a frame rate, then choose Animated GIF under the Export tab and hit Generate & Download. WEBM/MP4 video export is available with Pro.',
  },
  {
    q: 'How do I trim, resize, or change the speed of a GIF?',
    a: 'Load any GIF or video into the studio. The Trim & Speed tab has start/end time controls and a 0.25x to 3.0x multiplier, and the timeline lets you scrub frame by frame. Use the 1:1, 16:9 and 9:16 aspect presets above the canvas to resize.',
  },
  {
    q: 'Can I customize the text and add extra captions?',
    a: 'Yes. Pick from Impact, Geist, Anton, Oswald or Comic Neue, set fill and outline colors, stroke width, ALL CAPS and drop shadow — plus a Twitter-style caption banner. You can also drop in floating text boxes: add one, drag it anywhere, double-click to edit.',
  },
  {
    q: 'Is there any mandatory watermark on exported memes?',
    a: 'Free exports carry a subtle, optional gifmememaker.com watermark — you can change its text, corner and opacity yourself, or switch it off. Remove it entirely with a one-click Pro unlock. Many templates are 100% free to use with zero strings attached.',
  },
];
