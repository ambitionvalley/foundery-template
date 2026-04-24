"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { Button } from "@/components/base/button";
import { Input } from "@/components/common/input";
import { BrandLogo } from "@/components/brand-logo";
import { brand } from "@/config/brand";

export default function SignupPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire auth provider (Supabase, Auth0, etc.)
    console.warn("TODO: wire signup submit");
  }

  return (
    <section className="flex w-full max-w-[360px] flex-col items-stretch gap-6 rounded-[24px] bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col items-center gap-3">
        <BrandLogo variant="mark" priority />
        <h1 className="text-[20px] leading-[28px] font-semibold text-black">
          Create your {brand.name} account
        </h1>
      </div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <Input layout="2-row-vertical" title="Name" className="w-full">
          Jane Doe
        </Input>
        <Input layout="2-row-vertical" title="Email" className="w-full">
          you@example.com
        </Input>
        <Input layout="2-row-vertical" title="Password" className="w-full">
          ••••••••
        </Input>
        <Button type="submit" variant="filled" className="mt-2 w-full">
          Create account
        </Button>
      </form>
      <p className="text-center text-[12px] leading-[16px] text-black/60">
        Already have an account?{" "}
        <Link href="/login" className="text-[#adadfb] hover:text-black">
          Sign in
        </Link>
      </p>
    </section>
  );
}
