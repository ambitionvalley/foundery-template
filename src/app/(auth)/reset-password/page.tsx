"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { Suspense, useMemo, useState } from "react";
import { Button } from "@/components/base/button";
import { Input } from "@/components/common/input";

export default function ForgotPasswordResetPage() {
  return (
    <Suspense fallback={<ResetCardSkeleton />}>
      <ResetCard />
    </Suspense>
  );
}

function ResetCard() {
  const router = useRouter();
  const params = useSearchParams();
  const user = params.get("user");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);

  const strength = useMemo(() => computeStrength(password), [password]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: replace with real password-reset commit (Supabase, Auth0, …).
    // Template checks that the two fields match, then routes back to /login
    // with ?user=<email> so the returning-user variant greets them.
    const data = new FormData(event.currentTarget);
    const pw = data.get("password")?.toString() ?? "";
    const repeat = data.get("repeatPassword")?.toString() ?? "";
    if (pw && pw === repeat) {
      console.warn("TODO: wire password-reset submit");
      const q = new URLSearchParams();
      if (user) q.set("user", user);
      router.push(q.size ? `/login?${q.toString()}` : "/login");
      return;
    }
    console.warn("Password mismatch (template does not surface errors yet).");
  }

  return (
    <section
      className="relative flex w-full max-w-[680px] flex-col items-center justify-center gap-6 overflow-hidden rounded-[32px] bg-white p-6"
      aria-labelledby="reset-password-heading"
    >
      <Link
        href="/forgot-password"
        aria-label="Back"
        className="absolute top-6 left-6 flex h-9 w-9 items-center justify-center rounded-[16px] bg-black/[0.04] hover:bg-black/[0.08]"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M12.5 4L6.5 10L12.5 16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <Link
        href="/"
        aria-label="Close"
        className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-[16px] hover:bg-black/[0.04]"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M5 5L15 15M15 5L5 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </Link>

      <div className="flex w-full max-w-[313px] flex-col items-center gap-7">
        <KeyIcon />

        <h1
          id="reset-password-heading"
          className="text-[24px] leading-[32px] font-semibold text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Setup password
        </h1>

        <form
          className="flex w-full flex-col items-center gap-6"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full flex-col items-center gap-2">
            <Input
              size="lg"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              placeholder="Password"
              aria-label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              trailing={
                <EyeToggle
                  visible={showPassword}
                  onToggle={() => setShowPassword((v) => !v)}
                />
              }
            />
            <StrengthBar score={strength} />
            <p
              className="w-full text-[14px] leading-[20px] text-black/40"
              style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
            >
              Use 8 or more characters with a mix of letters, numbers &amp; symbols.
            </p>
          </div>

          <Input
            size="lg"
            type={showRepeat ? "text" : "password"}
            name="repeatPassword"
            autoComplete="new-password"
            placeholder="Repeat Password"
            aria-label="Repeat Password"
            trailing={
              <EyeToggle
                visible={showRepeat}
                onToggle={() => setShowRepeat((v) => !v)}
              />
            }
          />

          <Button
            type="submit"
            size="large"
            variant="filled"
            radius={16}
            className="w-full"
          >
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
}

function ResetCardSkeleton() {
  return (
    <section
      className="relative flex w-full max-w-[680px] flex-col items-center justify-center gap-6 rounded-[32px] bg-white p-6"
      aria-hidden
    >
      <div className="h-[520px] w-full max-w-[313px]" />
    </section>
  );
}

function KeyIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden
      className="text-black"
    >
      <path d="M160,16A80.07,80.07,0,0,0,83.91,120.78L26.34,178.34A8,8,0,0,0,24,184v40a8,8,0,0,0,8,8H72a8,8,0,0,0,8-8V208H96a8,8,0,0,0,8-8V184h16a8,8,0,0,0,5.66-2.34l9.57-9.57A80,80,0,1,0,160,16Zm0,144a63.7,63.7,0,0,1-23.65-4.51,8,8,0,0,0-8.84,1.68L116.69,168H96a8,8,0,0,0-8,8v16H72a8,8,0,0,0-8,8v16H40V187.31l58.83-58.82a8,8,0,0,0,1.68-8.84A64,64,0,1,1,160,160Zm20-100a12,12,0,1,1-12-12A12,12,0,0,1,180,60Z" />
    </svg>
  );
}

function EyeToggle({
  visible,
  onToggle,
}: {
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={visible ? "Hide password" : "Show password"}
      onClick={onToggle}
      className="flex h-5 w-5 items-center justify-center text-black/40 hover:text-black"
    >
      {visible ? <EyeIcon /> : <EyeSlashIcon />}
    </button>
  );
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" />
    </svg>
  );
}

function EyeSlashIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.67,70l14.75,16.22A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128c-4.69-8.79-19.66-33.39-47.35-49.38L158.58,42.22A112,112,0,0,1,247.28,131.26Z" />
    </svg>
  );
}

function StrengthBar({ score }: { score: number }) {
  const palette = ["#cfcfd5", "#ef4444", "#f59e0b", "#eab308", "#22c55e"];
  const active = palette[Math.min(Math.max(score, 0), 4)];
  return (
    <div
      className="flex w-full items-center gap-1"
      role="progressbar"
      aria-label="Password strength"
      aria-valuemin={0}
      aria-valuemax={4}
      aria-valuenow={score}
    >
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="h-1 flex-1 rounded-[2px]"
          style={{ backgroundColor: i < score ? active : "#e5e7eb" }}
        />
      ))}
    </div>
  );
}

function computeStrength(password: string): number {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  if (password.length === 0) return 0;
  if (score === 0) return 1;
  return Math.min(score, 4);
}
