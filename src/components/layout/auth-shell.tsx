import type { ReactNode } from "react";

import { BrandLogo } from "@/components/brand/brand-logo";

export type AuthShellProps = {
  title?: string;
  children: ReactNode;
};

/**
 * AuthShell — centered auth card wrapper with brand mark and title slot.
 * The (auth) layout already provides the page-level frame; this component
 * wraps the inner card body for simple one-form screens.
 */
export function AuthShell({ title, children }: AuthShellProps) {
  return (
    <section
      className="flex w-full max-w-[680px] flex-col items-center justify-center gap-6 rounded-[32px] bg-white p-6"
      aria-labelledby={title ? "auth-shell-heading" : undefined}
    >
      <div className="flex w-full max-w-[313px] flex-col items-center gap-7">
        <BrandLogo variant="mark" size={80} priority />
        {title && (
          <h1
            id="auth-shell-heading"
            className="text-center text-[24px] leading-[32px] font-semibold text-black"
            style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
          >
            {title}
          </h1>
        )}
        {children}
      </div>
    </section>
  );
}
