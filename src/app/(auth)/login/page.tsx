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

const RETURNING_AVATAR = "/figma/avatar-3d-03.png";

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
  const rememberedUser = params.get("user");
  const isReturning = Boolean(rememberedUser);

  const switchHref = mode === "password" ? "/login?mode=passwordless" : "/login";
  const switchLabel =
    mode === "password"
      ? "Sign in with email or SMS code instead"
      : "Use password instead";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: replace with real auth (Supabase, Auth0, etc.). For the template
    // we skip credential checking and route to the verification screen that
    // matches the identifier — email vs phone — so fork-owners can click
    // through either flow end-to-end.
    const data = new FormData(event.currentTarget);
    const identifier = (data.get("identifier") ?? "").toString().trim();
    const verifyMethod = identifier.includes("@") ? "email" : "sms";
    const query = new URLSearchParams({ method: verifyMethod });
    if (identifier) query.set("contact", identifier);
    router.push(`/verify?${query.toString()}`);
  }

  const displayName = isReturning
    ? deriveNameFromIdentifier(rememberedUser ?? "")
    : null;

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
        {isReturning ? (
          <div className="h-20 w-20 overflow-hidden rounded-full bg-black/[0.04]">
            <Image
              src={RETURNING_AVATAR}
              alt={displayName ?? "Your account"}
              width={80}
              height={80}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <BrandLogo variant="mark" size={80} priority />
        )}

        <h1
          id="signin-heading"
          className="text-center text-[24px] leading-[32px] font-semibold text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          {isReturning ? `Welcome back, ${displayName}` : "Sign In"}
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
            defaultValue={isReturning ? (rememberedUser ?? undefined) : undefined}
            trailing={isReturning ? <ClearUserButton /> : undefined}
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
          {!isReturning && (
            <Link
              href={switchHref}
              className="text-[14px] leading-[20px] text-[#adadfb] hover:text-black"
              style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
            >
              {switchLabel}
            </Link>
          )}
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

function ClearUserButton() {
  // "Forget this account" — strips ?user= so /login reverts to its empty state.
  // Fork-owners replace this with a real localStorage/cookie wipe + reload.
  return (
    <Link
      href="/login"
      aria-label="Use another account"
      className="flex h-5 w-5 items-center justify-center text-black/30 hover:text-black"
    >
      <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
      </svg>
    </Link>
  );
}

function deriveNameFromIdentifier(identifier: string): string {
  const local = identifier.split("@")[0] ?? identifier;
  if (!local) return "there";
  return local.charAt(0).toUpperCase() + local.slice(1);
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
      // Template placeholder — logs a TODO and simulates a successful sign-in
      // by navigating via onSignIn. Fork-owners replace with the provider's
      // real OAuth redirect (Supabase, NextAuth, Clerk, Auth0, …).
      onClick={() => {
        console.warn(`TODO: wire ${provider} OAuth`);
        onSignIn();
      }}
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
