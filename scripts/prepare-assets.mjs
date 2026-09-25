/**
 * One-time asset pipeline: pulls brand assets out of the NearbyPayV2 Expo app
 * and produces web-optimized WebP variants + favicons for the landing site.
 *
 * Run from website/:  node scripts/prepare-assets.mjs
 */
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const websiteRoot = resolve(here, '..');
const appRoot = resolve(websiteRoot, '..');
const appAssets = (p) => join(appRoot, 'assets', 'images', p);
const out = (p) => join(websiteRoot, 'src', 'assets', 'brand', p);
const pub = (p) => join(websiteRoot, 'public', p);

for (const dir of [join(websiteRoot, 'src', 'assets', 'brand'), join(websiteRoot, 'public')]) {
  mkdirSync(dir, { recursive: true });
}

const jobs = [
  // 3D "N" mark on deep indigo tile (navbar/footer brand chip, app icon)
  {
    src: appAssets('logo/logo_bg.png'),
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

// Tight square crop of the N for favicon / touch icon
const nCrop = {
  src: appAssets('logo/logo_bg.png'),
  variants: [
    { out: pub('favicon.png'), width: 64, quality: 92, crop: true },
    { out: pub('apple-touch-icon.png'), width: 180, quality: 92, crop: true },
    { out: out('logo-tile-crop.webp'), width: 512, quality: 88, crop: true },
  ],
};

for (const job of [...jobs, nCrop]) {
  if (!existsSync(job.src)) {
    console.warn(`SKIP (missing): ${job.src}`);
    continue;
  }
  const meta = await sharp(job.src).metadata();
  for (const v of job.variants) {
    let img = sharp(job.src);
    if (v.crop) {
      // Center-crop to the middle square holding the N glyph (~62% of frame)
      const side = Math.round(Math.min(meta.width, meta.height) * 0.62);
      img = img.extract({
        left: Math.round((meta.width - side) / 2),
        top: Math.round((meta.height - side) / 2) - Math.round(meta.height * 0.02),
        width: side,
        height: side,
      });
    }
    await img
      .resize({ width: v.width, withoutEnlargement: true })
      .webp({ quality: v.quality })
      .toFile(v.out);
    console.log(`OK ${v.out}`);
  }
}
