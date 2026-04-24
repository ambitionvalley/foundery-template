"use client";

import { useEffect } from "react";

import { Button } from "@/components/base/button";

export default function AppError({
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
    <div className="flex flex-col items-start gap-4 rounded-[16px] border-[0.5px] border-black/10 p-6">
      <h2 className="text-[18px] leading-[28px] font-semibold text-black">
        This view failed to load
      </h2>
      <p className="text-[14px] leading-[20px] text-black/60">
        {error.digest ? `Reference: ${error.digest}` : "Please try again."}
      </p>
      <Button
        size="medium"
        variant="filled"
        radius={12}
        onClick={() => reset()}
      >
        Try again
      </Button>
    </div>
  );
}
