"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { brand } from "@/config/brand";

const NAV_ITEMS = ["Product", "Solutions", "Resources", "Download", "Pricing"];

export default function LoginPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire auth provider (Supabase, Auth0, etc.)
    console.warn("TODO: wire login submit");
  }

  return (
    <div className="relative min-h-screen bg-[#f9f9fa]">
      <header className="flex items-center justify-between px-7 py-4">
        <div className="flex-1">
          <Link href="/" aria-label={brand.name}>
            <BrandLogo priority />
          </Link>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {NAV_ITEMS.map((label) => (
            <Link
              key={label}
              href="#"
              className="rounded-[12px] px-3 py-1 text-[12px] leading-[16px] text-black hover:bg-black/[0.04]"
              style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
          <Link
            href="/signup"
            className="rounded-[12px] bg-black/[0.04] px-3 py-1 text-[12px] leading-[16px] text-black hover:bg-black/[0.08]"
            style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
          >
            Sign up
          </Link>
          <Link
            href="/login"
            className="rounded-[12px] bg-black px-3 py-1 text-[12px] leading-[16px] text-white hover:bg-[#333]"
            style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
          >
            Sign in
          </Link>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-64px-80px)] items-center justify-center px-6">
        <section
          className="relative flex w-full max-w-[680px] flex-col items-center justify-center gap-6 overflow-hidden rounded-[32px] bg-white p-6 backdrop-blur-[20px]"
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
                iconAlt="Google"
              />
              <SocialButton
                label="Continue with Apple"
                bg="#000000"
                iconSrc="/social/apple.svg"
                iconAlt="Apple"
              />
              <SocialButton
                label="Continue with Facebook"
                bg="#1877f2"
                iconSrc="/social/facebook.svg"
                iconAlt="Facebook"
              />
            </div>

            <div className="h-px w-full bg-black/10" role="separator" />

            <form
              className="flex w-full flex-col items-center gap-4"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="identifier"
                autoComplete="username"
                placeholder="Email or Phone number"
                className="h-14 w-full rounded-[16px] border-[0.5px] border-black/20 bg-white/80 px-5 py-4 text-[18px] leading-[28px] text-black placeholder:text-black/20 focus:border-black/40 focus:outline-none"
                style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
              />
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                className="h-14 w-full rounded-[16px] border-[0.5px] border-black/20 bg-white/80 px-5 py-4 text-[18px] leading-[28px] text-black placeholder:text-black/20 focus:border-black/40 focus:outline-none"
                style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
              />
              <button
                type="submit"
                className="flex min-h-12 w-full items-center justify-center rounded-[16px] bg-black px-6 py-4 text-[16px] leading-[24px] text-white hover:bg-[#333] active:bg-[#1a1a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#adadfb] focus-visible:ring-offset-2"
                style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
              >
                Sign In
              </button>
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
      </main>

      <footer className="flex justify-center pb-12">
        <p
          className="text-[12px] leading-[16px] text-black/40"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          © 2026 {brand.name}
        </p>
      </footer>
    </div>
  );
}

function SocialButton({
  label,
  bg,
  iconSrc,
  iconAlt,
}: {
  label: string;
  bg: string;
  iconSrc: string;
  iconAlt: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      // TODO: wire OAuth provider
      onClick={() => console.warn(`TODO: wire ${iconAlt} sign-in`)}
      className="flex min-h-12 flex-1 items-center justify-center rounded-[20px] p-3 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#adadfb] focus-visible:ring-offset-2"
      style={{ backgroundColor: bg }}
    >
      <Image src={iconSrc} alt="" width={24} height={24} aria-hidden />
    </button>
  );
}
