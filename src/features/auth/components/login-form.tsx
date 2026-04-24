"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/base/button";
import { Input } from "@/components/common/input";
import { signIn } from "@/features/auth/actions";

export type LoginFormProps = {
  redirectTo?: string;
};

export function LoginForm({ redirectTo = "/app" }: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);
    const data = new FormData(event.currentTarget);
    const result = await signIn(
      (data.get("email") ?? "").toString(),
      (data.get("password") ?? "").toString(),
    );
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
        type="email"
        name="email"
        autoComplete="username"
        placeholder="Email"
        aria-label="Email"
      />
      <Input
        size="lg"
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="Password"
        aria-label="Password"
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
        {pending ? "Signing in…" : "Sign In"}
      </Button>
    </form>
  );
}
