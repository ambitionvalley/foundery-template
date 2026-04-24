"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { Suspense } from "react";
import { Button } from "@/components/base/button";
import { Input } from "@/components/common/input";
import { BrandLogo } from "@/components/brand-logo";

type LoginMode = "password" | "passwordless";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginCardSkeleton />}>
      <LoginCard />
    </Suspense>
  );
}

function LoginCard() {
  const router = useRouter();
  const params = useSearchParams();
  const mode: LoginMode =
    params.get("mode") === "passwordless" ? "passwordless" : "password";
  const switchHref = mode === "password" ? "/login?mode=passwordless" : "/login";
  const switchLabel =
    mode === "password"
      ? "Sign in with email code instead"
      : "Use password instead";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: replace with real auth (Supabase, Auth0, etc.). For the template
    // we skip credential checking and route straight to email verification so
    // fork-owners can click through the flow end-to-end.
    const data = new FormData(event.currentTarget);
    const identifier = (data.get("identifier") ?? "").toString().trim();
    const query = new URLSearchParams({ method: "email" });
    if (identifier.includes("@")) query.set("contact", identifier);
    router.push(`/verify?${query.toString()}`);
  }

  return (
    <section
      className="relative flex w-full max-w-[680px] flex-col items-center justify-center gap-6 overflow-hidden rounded-[32px] bg-white p-6"
      aria-labelledby="signin-heading"
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
          id="signin-heading"
          className="text-[24px] leading-[32px] font-semibold text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Sign In
        </h1>

        <div className="flex w-full items-center gap-2">
          <SocialButton
            label="Continue with Google"
            bg="#8156fa"
            iconSrc="/social/google.svg"
            provider="Google"
          />
          <SocialButton
            label="Continue with Apple"
            bg="#000000"
            iconSrc="/social/apple.svg"
            provider="Apple"
          />
          <SocialButton
            label="Continue with Facebook"
            bg="#1877f2"
            iconSrc="/social/facebook.svg"
            provider="Facebook"
          />
        </div>

        <div className="h-px w-full bg-black/10" role="separator" />

        <form
          className="flex w-full flex-col items-center gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            size="lg"
            type="text"
            name="identifier"
            autoComplete="username"
            placeholder="Email or Phone number"
            aria-label="Email or Phone number"
          />
          {mode === "password" && (
            <Input
              size="lg"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Password"
              aria-label="Password"
            />
          )}
          <Button
            type="submit"
            size="large"
            variant="filled"
            radius={16}
            className="w-full"
          >
            Sign In
          </Button>
          <Link
            href={switchHref}
            className="text-[14px] leading-[20px] text-[#adadfb] hover:text-black"
            style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
          >
            {switchLabel}
          </Link>
        </form>

        <div
          className="flex flex-wrap items-start gap-4 text-[14px] leading-[20px] text-[#adadfb]"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          <Link href="/signup" className="hover:text-black">
            Sign Up
          </Link>
          <Link href="#" className="hover:text-black">
            Forgot Password
          </Link>
          <Link href="#" className="hover:text-black">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

function LoginCardSkeleton() {
  return (
    <section
      className="relative flex w-full max-w-[680px] flex-col items-center justify-center gap-6 rounded-[32px] bg-white p-6"
      aria-hidden
    >
      <div className="h-[560px] w-full max-w-[313px]" />
    </section>
  );
}

function SocialButton({
  label,
  bg,
  iconSrc,
  provider,
}: {
  label: string;
  bg: string;
  iconSrc: string;
  provider: string;
}) {
  return (
    <Button
      type="button"
      size="large"
      radius={20}
      aria-label={label}
      onClick={() => console.warn(`TODO: wire ${provider} sign-in`)}
      className="hover:opacity-90"
      // Inline styles override the filled variant's bg-black + the base shrink-0
      // so the three buttons share width equally within the parent flex row.
      style={{
        backgroundColor: bg,
        color: "#ffffff",
        flex: "1 1 0%",
        minWidth: 0,
      }}
    >
      <Image src={iconSrc} alt="" width={24} height={24} aria-hidden />
    </Button>
  );
}
