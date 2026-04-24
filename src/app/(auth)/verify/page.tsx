"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { Suspense } from "react";
import { Input } from "@/components/common/input";

export default function VerifyPage() {
  return (
    <Suspense fallback={<VerifyCardSkeleton />}>
      <VerifyCard />
    </Suspense>
  );
}

function VerifyCard() {
  const params = useSearchParams();
  const email = params.get("email") ?? "you@example.com";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire verification (OTP check, magic-link handler, etc.)
    console.warn("TODO: wire verify submit");
  }

  return (
    <section
      className="relative flex w-full max-w-[680px] flex-col items-center justify-center gap-6 overflow-hidden rounded-[32px] bg-white p-6"
      aria-labelledby="verify-heading"
    >
      <Link
        href="/login"
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

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[313px] flex-col items-center gap-7"
      >
        <EnvelopeIcon />

        <div className="flex w-full flex-col items-center gap-2 text-center">
          <h1
            id="verify-heading"
            className="text-[24px] leading-[32px] font-semibold text-black"
            style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
          >
            Check your inbox
          </h1>
          <p
            className="text-[14px] leading-[20px] text-black"
            style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
          >
            Please open the link in the email to continue or enter the
            verification code we sent to
          </p>
          <p
            className="text-[18px] leading-[28px] font-semibold text-black"
            style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
          >
            {email}
          </p>
        </div>

        <OtpInput length={4} />

        <div
          className="flex w-full flex-col items-center gap-4 text-center text-[14px] leading-[20px]"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          <p className="text-black/20">Resend (60s)</p>
          <Link href="#" className="text-[#adadfb] hover:text-black">
            Switch verification method
          </Link>
        </div>
      </form>
    </section>
  );
}

function VerifyCardSkeleton() {
  return (
    <section
      className="relative flex w-full max-w-[680px] flex-col items-center justify-center gap-6 rounded-[32px] bg-white p-6"
      aria-hidden
    >
      <div className="h-[440px] w-full max-w-[313px]" />
    </section>
  );
}

function EnvelopeIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden
      className="text-black"
    >
      <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM40,75.54l82.59,75.59a8,8,0,0,0,10.82,0L216,75.54V192H40Z" />
    </svg>
  );
}

function OtpInput({ length }: { length: number }) {
  return (
    <div className="flex w-full max-w-[248px] items-center gap-2">
      {Array.from({ length }).map((_, i) => (
        <Input
          key={i}
          size="lg"
          type="text"
          name={`otp-${i}`}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          placeholder=""
          aria-label={`Digit ${i + 1}`}
          className="min-w-0 flex-1 [&_input]:text-center"
        />
      ))}
    </div>
  );
}
