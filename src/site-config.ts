/**
 * Single place to edit site-wide facts. Update these when the APK is
 * published or store listings go live — no component changes needed.
 */
export const site = {
  name: 'NearbyPay',
  tagline: 'Send. Receive. Stay Close.',
  description:
    'The payments app built around people. Send money to a Cashtag, receive with a QR code, and keep every transaction crystal clear.',
  /** Set to the real APK URL once the first build is published. */
  apkUrl: null as string | null,
  /** Placeholder until real support channels exist. */
  contactEmail: 'support@nearbypay.app',
  socials: [], // none yet — footer renders the row only when this is non-empty
} as const;

export const navLinks = [
  { label: 'Screens', href: '#showcase' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Why NearbyPay', href: '#why' },
] as const;
