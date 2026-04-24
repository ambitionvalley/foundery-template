"use client";

import { useState } from "react";

import { Button } from "@/components/base/button";
import { Input } from "@/components/common/input";
import { updateProfile } from "@/features/settings/actions";

export function ProfileForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const data = new FormData(event.currentTarget);
    const result = await updateProfile((data.get("name") ?? "").toString());
    setPending(false);
    setMessage(result.ok ? "Saved" : result.error);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[360px] flex-col gap-4"
    >
      <Input
        size="lg"
        type="text"
        name="name"
        autoComplete="name"
        placeholder="Your name"
        aria-label="Your name"
      />
      {message && (
        <p className="text-[12px] text-black/60">{message}</p>
      )}
      <Button
        type="submit"
        size="large"
        variant="filled"
        radius={16}
        disabled={pending}
      >
        {pending ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}
