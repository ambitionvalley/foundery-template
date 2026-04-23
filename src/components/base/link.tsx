import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type LinkProps = ComponentPropsWithoutRef<"a"> & {
  children: ReactNode;
};

/**
 * Design-system Link — styled `<a>` with indigo resting color and a dark
 * hover transition. Use for inline text links; for client-side navigation,
 * wrap with `next/link` externally.
 *
 * @example
 *   <Link href="https://example.com" target="_blank" rel="noreferrer">
 *     Read more
 *   </Link>
 */
export function Link({ children, className, ...rest }: LinkProps) {
  return (
    <a
      className={`rounded-[12px] text-[14px] leading-[20px] font-normal text-[#adadfb] transition-colors duration-150 hover:text-[#232332] ${className ?? ""}`}
      style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
      {...rest}
    >
      {children}
    </a>
  );
}
