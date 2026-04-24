"use client";

import { useState } from "react";

import { Button } from "@/components/base/button";
import { Input } from "@/components/common/input";
import { requestPasswordReset } from "@/features/auth/actions";

export function ForgotPasswordForm() {
  const [status, setStatus] = useState<"idle" | "pending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("pending");
    setError(null);
    const data = new FormData(event.currentTarget);
    const result = await requestPasswordReset(
      (data.get("email") ?? "").toString(),
    );
    if (!result.ok) {
      setError(result.error);
      setStatus("error");
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <p className="text-[14px] leading-[20px] text-black">
        Check your inbox for a reset link.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center gap-4"
    >
      <Input
        size="lg"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="Email"
        aria-label="Email"
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
        disabled={status === "pending"}
      >
        {status === "pending" ? "Sending…" : "Send reset link"}
      </Button>
    </form>
  );
}
