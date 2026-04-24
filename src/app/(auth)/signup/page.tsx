"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { Button } from "@/components/base/button";
import { Input } from "@/components/common/input";
import { BrandLogo } from "@/components/brand-logo";

export default function SignupPage() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: replace with real signup (Supabase, Auth0, …).
    // Email → verify directly with a `next` that continues to password setup.
    // Phone → detour through /signup/country so the user picks a dial code
    // before we format the contact for SMS verification.
    const data = new FormData(event.currentTarget);
    const identifier = (data.get("identifier") ?? "").toString().trim();
    if (!identifier.includes("@")) {
      const q = new URLSearchParams();
      if (identifier) q.set("phone", identifier);
      router.push(`/signup/country?${q.toString()}`);
      return;
    }
    const query = new URLSearchParams({
      method: "email",
      next: "/signup/password",
      contact: identifier,
    });
    router.push(`/verify?${query.toString()}`);
  }

  return (
    <section
      className="relative flex w-full max-w-[680px] flex-col items-center justify-center gap-6 overflow-hidden rounded-[32px] bg-white p-6"
      aria-labelledby="signup-heading"
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
          id="signup-heading"
          className="text-[24px] leading-[32px] font-semibold text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Sign Up
        </h1>

        <div className="flex w-full items-center gap-2">
          <SocialButton
            label="Continue with Google"
            bg="#8156fa"
            iconSrc="/social/google.svg"
            provider="Google"
            onSignIn={() => router.push("/app")}
          />
          <SocialButton
            label="Continue with Apple"
            bg="#000000"
            iconSrc="/social/apple.svg"
            provider="Apple"
            onSignIn={() => router.push("/app")}
          />
          <SocialButton
            label="Continue with Microsoft"
            bg="#2f2f2f"
            iconSrc="/social/microsoft.svg"
            provider="Microsoft"
            onSignIn={() => router.push("/app")}
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
          <Button
            type="submit"
            size="large"
            variant="filled"
            radius={16}
            className="w-full"
          >
            Sign Up
          </Button>
        </form>

        <div
          className="flex flex-wrap items-start gap-4 text-[14px] leading-[20px] text-[#adadfb]"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          <Link href="/login" className="hover:text-black">
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}

function SocialButton({
  label,
  bg,
  iconSrc,
  provider,
  onSignIn,
}: {
  label: string;
  bg: string;
  iconSrc: string;
  provider: string;
  onSignIn: () => void;
}) {
  return (
    <Button
      type="button"
      size="large"
      radius={20}
      aria-label={label}
      // Template placeholder — logs a TODO and simulates a successful sign-up
      // by navigating via onSignIn. Fork-owners replace with the provider's
      // real OAuth redirect (Supabase, NextAuth, Clerk, Auth0, …).
      onClick={() => {
        console.warn(`TODO: wire ${provider} OAuth`);
        onSignIn();
      }}
      className="hover:opacity-90"
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
