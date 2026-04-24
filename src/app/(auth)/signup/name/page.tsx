"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { Suspense } from "react";
import { Button } from "@/components/base/button";
import { Input } from "@/components/common/input";
import { BrandLogo } from "@/components/brand-logo";

export default function SignupNamePage() {
  return (
    <Suspense fallback={<NameCardSkeleton />}>
      <NameCard />
    </Suspense>
  );
}

function NameCard() {
  const router = useRouter();
  const params = useSearchParams();
  // Provider is forwarded from the /signup social buttons so fork-owners can
  // skip this step if their OAuth callback already returned a full name.
  const provider = params.get("provider");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: persist first/last name on the freshly created account
    // (Supabase update, Auth0 patch, etc.). Template just continues.
    console.warn(
      `TODO: persist profile name${provider ? ` (from ${provider} OAuth)` : ""}`,
    );
    router.push("/app");
  }

  return (
    <section
      className="relative flex w-full max-w-[680px] flex-col items-center justify-center gap-6 overflow-hidden rounded-[32px] bg-white p-6"
      aria-labelledby="enter-name-heading"
    >
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
        <BrandLogo variant="mark" size={80} priority />

        <h1
          id="enter-name-heading"
          className="text-[24px] leading-[32px] font-semibold text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Enter your name
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center gap-4"
        >
          <Input
            size="lg"
            type="text"
            name="firstName"
            autoComplete="given-name"
            placeholder="First name"
            aria-label="First name"
          />
          <Input
            size="lg"
            type="text"
            name="lastName"
            autoComplete="family-name"
            placeholder="Last name"
            aria-label="Last name"
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
          <Link
            href="/app"
            className="text-[14px] leading-[20px] text-black/40 hover:text-black"
            style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
          >
            Skip
          </Link>
        </form>
      </div>
    </section>
  );
}

function NameCardSkeleton() {
  return (
    <section
      className="relative flex w-full max-w-[680px] flex-col items-center justify-center gap-6 rounded-[32px] bg-white p-6"
      aria-hidden
    >
      <div className="h-[420px] w-full max-w-[313px]" />
    </section>
  );
}
