"use client";

import { useEffect } from "react";

import { Button } from "@/components/base/button";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center bg-white p-8">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <h1 className="text-[24px] leading-[32px] font-semibold text-black">
          Something went wrong
        </h1>
        <p className="text-[14px] leading-[20px] text-black/60">
          {error.digest ? `Reference: ${error.digest}` : "Please try again."}
        </p>
        <Button
          size="large"
          variant="filled"
          radius={16}
          onClick={() => reset()}
        >
          Try again
        </Button>
      </div>
    </main>
  );
}
