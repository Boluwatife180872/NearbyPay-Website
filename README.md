# NearbyPay — Landing Site

The official landing page for **NearbyPay** ("Send. Receive. Stay Close."), built to look and
feel like a natural extension of the NearbyPayV2 mobile app.

## Stack

- **React 19 + TypeScript + Vite**
- **Tailwind CSS v4** — design tokens live in `src/index.css` (`@theme`), lifted verbatim from
  the app's `src/constants/app-theme.ts` (brand `#2E45F4`, gradient `#3D66F7→#4634EE`,
  hero `#1C1A55→#2F2882`, page `#EEF3FC`, Montserrat everywhere)
- **Framer Motion** — hero entrance, scroll reveals, phone parallax/float, showcase
  transitions (all respect `prefers-reduced-motion`)
- **Lucide** icons, **React Router** for routes

## Routes

| Path              | Purpose                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| `/`               | Landing page                                                             |
| `/reset-password` | Placeholder for the future emailed password-reset links. When the backend ships (`POST /auth/reset`), drop a real form component into `src/pages/ResetPasswordPage.tsx` and read the token from query params. |

## The phone mockups

There are no app screenshots in this repo — the "screenshots" are **1:1 CSS replicas** of the
real app screens, rebuilt in `src/components/phone/screens/` (`PhoneHome`, `PhoneSend`,
`PhoneReceive`, `PhoneHistory`) using the app's exact colors, copy and layout. They stay
crisp at any DPI and cost nothing to load. If the app's UI changes, update the replica to
match.

## Brand assets

`src/assets/brand/` + `public/favicon.png` are generated from the app's own artwork by
`scripts/prepare-assets.mjs` (sharp). If artwork in the app changes, re-run:

```bash
node scripts/prepare-assets.mjs
```

## The APK

There is no public APK yet, so the download section shows an honest "APK coming soon" state.
When the first build is published, set the URL in **`src/site-config.ts`**:

```ts
apkUrl: 'https://.../nearbypay.apk',
```

The primary button flips to a real "Download APK" link automatically. The App Store / Google
Play badges intentionally read "Coming soon" until real listings exist.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build → dist/
npm run preview  # serve the production build
npm run lint
```

## Deploy

Static hosting (Vercel, Netlify, Cloudflare Pages, GitHub Pages + SPA rewrite): build and
upload `dist/`. Because the site uses BrowserRouter, configure the host to rewrite all paths
to `index.html` so `/reset-password` resolves directly.
