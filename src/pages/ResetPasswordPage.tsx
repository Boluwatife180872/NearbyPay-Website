import { KeyRound, MailX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';

/**
 * Placeholder for the password-reset flow. When the backend endpoint
 * (POST /auth/reset) is ready, a real ResetPasswordForm component drops in
 * here — it should read the reset token from the link's query params
 * (e.g. /reset-password?token=...) and post the new password.
 */
export default function ResetPasswordPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-page px-5 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link to="/" aria-label="NearbyPay home">
            <Logo tone="dark" />
          </Link>
        </div>

        <div className="rounded-3xl border border-line bg-white p-8 text-center shadow-[0_32px_64px_-32px_rgba(10,30,60,0.35)] sm:p-10">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-tint">
            <KeyRound size={22} className="text-brand" />
          </span>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink">Reset your password</h1>
          <p className="mt-3 text-[14.5px] leading-relaxed font-medium text-ink-soft">
            Password resets happen right here on the web. Open the most recent reset link we
            emailed you — it will bring you back to this page to choose a new password.
          </p>

          <div className="mt-7 flex items-start gap-3 rounded-2xl border border-line bg-page-soft p-4 text-left">
            <MailX size={16} className="mt-0.5 shrink-0 text-brand" />
            <p className="text-[13px] leading-relaxed font-medium text-ink-soft">
              Reset links aren&apos;t live yet. In the meantime, use the{' '}
              <span className="font-bold text-ink">Forgot password</span> option in the NearbyPay
              app.
            </p>
          </div>

          <Link
            to="/"
            className="mt-7 inline-flex w-full items-center justify-center rounded-2xl bg-brand py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-brand-deep"
          >
            Back to home
          </Link>
        </div>

        <p className="mt-6 text-center text-[12px] font-medium text-ink-soft/70">
          Security tip: NearbyPay never asks for your PIN or password over chat.
        </p>
      </div>
    </div>
  );
}
