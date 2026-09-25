import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/cn';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

type Status = 'verifying' | 'ready' | 'updating' | 'success' | 'error';

const VERIFY_TIMEOUT_MS = 15000;

export default function ResetPasswordPage() {
  const [status, setStatus] = useState<Status>('verifying');
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const exchangeStarted = useRef(false);

  // Exchange the one-time ?code= for a recovery session (StrictMode-safe: runs once).
  useEffect(() => {
    if (exchangeStarted.current) return;
    exchangeStarted.current = true;

    async function verify() {
      if (!isSupabaseConfigured) {
        setErrorMessage(
          'This site is not connected to NearbyPay auth yet (missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).',
        );
        setStatus('error');
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const urlError = params.get('error');
      const urlErrorDescription = params.get('error_description');

      if (urlError) {
        setErrorMessage(
          urlErrorDescription ??
            'This reset link is invalid or has expired. Request a new one from the app.',
        );
        setStatus('error');
        return;
      }

      // No code — maybe the session is already established (reload after exchange).
      if (!code) {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setStatus('ready');
        } else {
          setErrorMessage(
            'This page needs a valid reset link. Open the most recent reset email, or request a new link from Forgot password in the app.',
          );
          setStatus('error');
        }
        return;
      }

      try {
        const withTimeout = Promise.race([
          supabase.auth.exchangeCodeForSession(code),
          new Promise<{ data: null; error: Error }>((_, reject) =>
            setTimeout(
              () => reject(new Error('Verification timed out. Check your connection and retry the link.')),
              VERIFY_TIMEOUT_MS,
            ),
          ),
        ]);
        const { error } = await withTimeout;
        if (error) throw error;

        // Strip the single-use code from the URL so it can't be replayed or leaked.
        window.history.replaceState({}, '', window.location.pathname);
        setStatus('ready');
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'This reset link is invalid or has expired.';
        const isExpired =
          /expired|invalid|used|not found|bad|code/i.test(message) || !navigator.onLine;
        setErrorMessage(
          isExpired
            ? 'This reset link has expired or was already used. Go back to the app and request a new one via Forgot password.'
            : message,
        );
        setStatus('error');
      }
    }

    void verify();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError('');

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setFormError('Passwords do not match.');
      return;
    }

    setStatus('updating');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setStatus('ready');
      setFormError(error.message ?? 'Could not update password. Try again.');
      return;
    }

    // Don't leave the recovery session lying around in this browser.
    await supabase.auth.signOut();
    setPassword('');
    setConfirm('');
    setStatus('success');
  }

  const busy = status === 'verifying' || status === 'updating';

  return (
    <div className="grid min-h-screen place-items-center bg-page px-5 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link to="/" aria-label="NearbyPay home">
            <Logo tone="dark" />
          </Link>
        </div>

        <div className="rounded-3xl border border-line bg-white p-8 shadow-[0_32px_64px_-32px_rgba(10,30,60,0.35)] sm:p-10">
          {status === 'success' ? (
            <div className="text-center">
              <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-50">
                <CheckCircle2 size={24} className="text-emerald-600" />
              </span>
              <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink">
                Password updated
              </h1>
              <p className="mt-3 text-[14.5px] leading-relaxed font-medium text-ink-soft">
                You&apos;re all set. Open the NearbyPay app and log in with your new
                password.
              </p>
              <Link
                to="/"
                className="mt-7 inline-flex w-full items-center justify-center rounded-2xl bg-brand py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-brand-deep"
              >
                Back to home
              </Link>
            </div>
          ) : status === 'error' ? (
            <div className="text-center">
              <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-red-50">
                <AlertTriangle size={22} className="text-red-500" />
              </span>
              <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink">
                Link didn&apos;t work
              </h1>
              <p className="mt-3 text-[14.5px] leading-relaxed font-medium text-ink-soft">
                {errorMessage}
              </p>
              <div className="mt-7 rounded-2xl border border-line bg-page-soft p-4 text-left text-[13px] leading-relaxed font-medium text-ink-soft">
                1. Open the NearbyPay app
                <br />
                2. Tap <span className="font-bold text-ink">Forgot password</span>
                <br />
                3. Open the newest email and click the link again
              </div>
              <Link
                to="/"
                className="mt-7 inline-flex w-full items-center justify-center rounded-2xl bg-brand py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-brand-deep"
              >
                Back to home
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center">
                <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-tint">
                  {busy && status === 'verifying' ? (
                    <Loader2 size={22} className="animate-spin text-brand" />
                  ) : (
                    <KeyRound size={22} className="text-brand" />
                  )}
                </span>
                <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink">
                  {status === 'verifying' ? 'Verifying your link…' : 'Choose a new password'}
                </h1>
                <p className="mt-3 text-[14.5px] leading-relaxed font-medium text-ink-soft">
                  {status === 'verifying'
                    ? 'Hang on while we confirm your reset link.'
                    : 'Enter a new password for your NearbyPay account.'}
                </p>
              </div>

              {(status === 'ready' || status === 'updating') && (
                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                  <label className="block text-left">
                    <span className="mb-1.5 block text-[13px] font-bold text-ink">
                      New password
                    </span>
                    <span className="relative block">
                      <Lock
                        size={16}
                        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-soft/50"
                      />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        minLength={6}
                        required
                        placeholder="Minimum 6 characters"
                        className="w-full rounded-2xl border border-line bg-page-soft py-3 pr-12 pl-11 text-[14px] font-medium text-ink outline-none placeholder:text-ink-soft/50 focus:border-brand focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1.5 text-ink-soft/60 hover:text-ink"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </span>
                  </label>

                  <label className="block text-left">
                    <span className="mb-1.5 block text-[13px] font-bold text-ink">
                      Confirm password
                    </span>
                    <span className="relative block">
                      <Lock
                        size={16}
                        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-soft/50"
                      />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        autoComplete="new-password"
                        minLength={6}
                        required
                        placeholder="Repeat your new password"
                        className="w-full rounded-2xl border border-line bg-page-soft py-3 pr-4 pl-11 text-[14px] font-medium text-ink outline-none placeholder:text-ink-soft/50 focus:border-brand focus:bg-white"
                      />
                    </span>
                  </label>

                  {formError && (
                    <p
                      role="alert"
                      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-left text-[13px] font-semibold text-red-600"
                    >
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'updating'}
                    className={cn(
                      'inline-flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[14px] font-bold text-white transition-colors',
                      status === 'updating'
                        ? 'cursor-wait bg-brand/70'
                        : 'bg-brand hover:bg-brand-deep',
                    )}
                  >
                    {status === 'updating' && (
                      <Loader2 size={16} className="animate-spin" />
                    )}
                    {status === 'updating' ? 'Updating…' : 'Update password'}
                  </button>
                </form>
              )}
            </>
          )}
        </div>

        <p className="mt-6 text-center text-[12px] font-medium text-ink-soft/70">
          Security tip: NearbyPay never asks for your PIN or password over chat.
        </p>
      </div>
    </div>
  );
}
