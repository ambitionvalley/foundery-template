"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/base/button";
import { Input } from "@/components/common/input";
import { verifyEmail } from "@/features/auth/actions";

export type VerifyFormProps = {
  redirectTo?: string;
};

export function VerifyForm({ redirectTo = "/app" }: VerifyFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const data = new FormData(event.currentTarget);
    const token = (data.get("token") ?? "").toString();
    const result = await verifyEmail(token);
    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(redirectTo);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center gap-4"
    >
      <Input
        size="lg"
        type="text"
        name="token"
        inputMode="numeric"
        placeholder="Verification code"
        aria-label="Verification code"
      />
      {error && (
        <p role="alert" className="w-full text-[12px] text-red-500">
          {error}
        </p>
      )}
      <Button
        type="submit"
        size="large"
        variant="filled"
        radius={16}
        className="w-full"
        disabled={pending}
      >
        {pending ? "Verifying…" : "Verify"}
      </Button>
    </form>
  );
}
