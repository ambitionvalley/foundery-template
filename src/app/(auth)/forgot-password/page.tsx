"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { Button } from "@/components/base/button";
import { Input } from "@/components/common/input";

export default function ForgotPasswordPage() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: replace with real password-reset request (Supabase, Auth0, …).
    // Template routes to /verify and then /forgot-password/reset so the user
    // can click through the full flow.
    const data = new FormData(event.currentTarget);
    const identifier = (data.get("identifier") ?? "").toString().trim();
    const verifyMethod = identifier.includes("@") ? "email" : "sms";
    // Forward the identifier to the reset step so it can end up back on /login
    // as ?user=<email> (returning-user state) after the new password is set.
    const nextParams = new URLSearchParams();
    if (identifier) nextParams.set("user", identifier);
    const next = `/forgot-password/reset${nextParams.size ? `?${nextParams.toString()}` : ""}`;

    const query = new URLSearchParams({ method: verifyMethod, next });
    if (identifier) query.set("contact", identifier);
    router.push(`/verify?${query.toString()}`);
  }

  return (
    <section
      className="relative flex w-full max-w-[680px] flex-col items-center justify-center gap-6 overflow-hidden rounded-[32px] bg-white p-6"
      aria-labelledby="forgot-password-heading"
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

      <div className="flex w-full max-w-[313px] flex-col items-center gap-7">
        <KeyIcon />

        <div className="flex w-full flex-col items-start gap-2">
          <h1
            id="forgot-password-heading"
            className="w-full text-center text-[24px] leading-[32px] font-semibold text-black"
            style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
          >
            Forgot Password
          </h1>
          <p
            className="w-full text-[14px] leading-[20px] text-black"
            style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
          >
            Please enter the Email or phone number used during sign up.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center gap-4"
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
            Submit
          </Button>
        </form>

        <Link
          href="#"
          className="text-[14px] leading-[20px] text-[#adadfb] hover:text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Contact Us
        </Link>
      </div>
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
