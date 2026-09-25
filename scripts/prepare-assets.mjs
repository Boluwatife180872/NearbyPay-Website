/**
 * Asset pipeline: pulls brand assets out of the NearbyPayV2 Expo app and
 * produces web-optimized WebP variants, the full favicon/icon set, and the
 * social share image for the landing site.
 *
 * The app repo is expected next to this one (../NearbyPayV2); override with
 * the NEARBYPAY_APP_ROOT env var if it lives elsewhere:
 *
 *   node scripts/prepare-assets.mjs
 *   NEARBYPAY_APP_ROOT=C:/path/to/NearbyPayV2 node scripts/prepare-assets.mjs
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const websiteRoot = resolve(here, '..');
const appRoot = process.env.NEARBYPAY_APP_ROOT
  ? resolve(process.env.NEARBYPAY_APP_ROOT)
  : resolve(websiteRoot, '..', 'NearbyPayV2');
const appAssets = (p) => join(appRoot, 'assets', 'images', p);
const out = (p) => join(websiteRoot, 'src', 'assets', 'brand', p);
const pub = (p) => join(websiteRoot, 'public', p);

for (const dir of [join(websiteRoot, 'src', 'assets', 'brand'), join(websiteRoot, 'public')]) {
  mkdirSync(dir, { recursive: true });
}

/** Fallback to the already-exported tile if the app repo isn't reachable. */
const logoBg = existsSync(appAssets('logo/logo_bg.png'))
  ? appAssets('logo/logo_bg.png')
  : out('logo-tile.webp');
console.log(`App logo source: ${logoBg}`);

// ---------------------------------------------------------------- WebP set
const jobs = [
  // 3D "N" mark on deep indigo tile (navbar/footer brand chip, app icon)
  {
    src: logoBg,
    variants: [
      { out: out('logo-tile.webp'), width: 512, quality: 88 },
      { out: out('logo-tile-256.webp'), width: 256, quality: 88 },
    ],
  },
  // Transparent 3D "N" mark (used in-app on the dark hero)
  {
    src: appAssets('logo/logo.png'),
    variants: [{ out: out('logo-mark.webp'), width: 512, quality: 90 }],
  },
  // 3D wallet illustration (balance card art in-app)
  {
    src: appAssets('dash/image.png'),
    variants: [{ out: out('wallet-3d.webp'), width: 640, quality: 85 }],
  },
  // 3D phone + naira coins (promo art in-app)
  {
    src: appAssets('dash/image_2.png'),
    variants: [{ out: out('phone-coins-3d.webp'), width: 900, quality: 85 }],
  },
  // Brand illustration: two people holding NearbyPay phones
  {
    src: appAssets('ill/both-nobg.png'),
    variants: [{ out: out('people.webp'), width: 1280, quality: 85 }],
  },
];

for (const job of jobs) {
  if (!existsSync(job.src)) {
    console.warn(`SKIP (missing): ${job.src}`);
    continue;
  }
  for (const v of job.variants) {
    await sharp(job.src)
      .resize({ width: v.width, withoutEnlargement: true })
      .webp({ quality: v.quality })
      .toFile(v.out);
    console.log(`OK ${v.out}`);
  }
}

// ------------------------------------------------------------- Icon set
const meta = await sharp(logoBg).metadata();
// Tight square crop of the N glyph (~62% of frame) — reads well at 16–64px
const tightCrop = () => {
  const side = Math.round(Math.min(meta.width, meta.height) * 0.62);
  return {
    left: Math.round((meta.width - side) / 2),
    top: Math.round((meta.height - side) / 2) - Math.round(meta.height * 0.02),
    width: side,
    height: side,
  };
};
const nTile = (size, file) =>
  sharp(logoBg).extract(tightCrop()).resize(size, size).png().toFile(file);

// Full-bleed app tile — home-screen icons and maskable icon
const appTile = (size, file) => sharp(logoBg).resize(size, size).png().toFile(file);

for (const [size, file] of [
  [16, pub('favicon-16x16.png')],
  [32, pub('favicon-32x32.png')],
  [48, pub('favicon-48x48.png')],
  [64, pub('favicon.png')],
]) {
  await nTile(size, file);
  console.log(`OK ${file}`);
}
for (const [size, file] of [
  [180, pub('apple-touch-icon.png')],
  [192, pub('icon-192.png')],
  [512, pub('icon-512.png')],
]) {
  await appTile(size, file);
  console.log(`OK ${file}`);
}

// favicon.ico (16/32/48) — the classic fallback browsers auto-request
const ico = await pngToIco([
  pub('favicon-16x16.png'),
  pub('favicon-32x32.png'),
  pub('favicon-48x48.png'),
]);
writeFileSync(pub('favicon.ico'), ico);
console.log(`OK ${pub('favicon.ico')}`);

// ------------------------------------------------------- Social share image
// 1200x630 brand gradient + rounded N tile, straight from the app's colors
const roundedTile = await sharp(await sharp(logoBg).resize(420, 420).png().toBuffer())
  .composite([
    {
      input: Buffer.from(
        '<svg width="420" height="420"><rect width="420" height="420" rx="92" fill="#fff"/></svg>',
      ),
      blend: 'dest-in',
    },
  ])
  .png()
  .toBuffer();

const ogSvg = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1C1A55"/>
        <stop offset="100%" stop-color="#2F2882"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="42%" r="60%">
        <stop offset="0%" stop-color="#4634EE" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="#4634EE" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect width="1200" height="630" fill="url(#glow)"/>
  </svg>
`);
await sharp(ogSvg)
  .composite([{ input: roundedTile, left: 390, top: 105 }])
  .png()
  .toFile(pub('og-image.png'));
console.log(`OK ${pub('og-image.png')}`);
