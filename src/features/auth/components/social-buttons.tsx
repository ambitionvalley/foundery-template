"use client";

import Image from "next/image";

import { Button } from "@/components/base/button";

export type SocialProvider = "google" | "apple" | "microsoft";
export type SocialAction = "signin" | "signup";

type ProviderConfig = {
  label: string;
  iconSrc: string;
  bg: string;
};

const PROVIDERS: Record<SocialProvider, ProviderConfig> = {
  google: { label: "Google", iconSrc: "/social/google.svg", bg: "#8156fa" },
  apple: { label: "Apple", iconSrc: "/social/apple.svg", bg: "#000000" },
  microsoft: {
    label: "Microsoft",
    iconSrc: "/social/microsoft.svg",
    bg: "#2f2f2f",
  },
};

export type SocialButtonsProps = {
  action?: SocialAction;
  onProvider?: (provider: SocialProvider) => void;
};

export function SocialButtons({
  action = "signin",
  onProvider,
}: SocialButtonsProps) {
  const verb = action === "signin" ? "Sign in" : "Sign up";
  return (
    <div className="flex w-full items-center gap-2">
      {(Object.entries(PROVIDERS) as [SocialProvider, ProviderConfig][]).map(
        ([id, cfg]) => (
          <Button
            key={id}
            type="button"
            size="large"
            radius={20}
            aria-label={`${verb} with ${cfg.label}`}
            onClick={() => onProvider?.(id)}
            className="hover:opacity-90"
            style={{
              backgroundColor: cfg.bg,
              color: "#ffffff",
              flex: "1 1 0%",
              minWidth: 0,
            }}
          >
            <Image
              src={cfg.iconSrc}
              alt=""
              width={24}
              height={24}
              aria-hidden
            />
          </Button>
        ),
      )}
    </div>
  );
}
