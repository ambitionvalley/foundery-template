import type { ReactNode } from "react";

export type FrameTextProps = {
  /** Force the hover surface (for showcase). */
  hover?: boolean;
  children?: ReactNode;
  className?: string;
};

/**
 * FrameText — single-label slot with the Frame family&apos;s 12px-rounded
 * hoverable surface. Use it for lone labels that share row layouts with
 * other Frame primitives.
 *
 * @example
 *   <FrameText>Starred</FrameText>
 */
export function FrameText({ hover = false, children = "Text", className }: FrameTextProps) {
  const bg = hover ? "bg-black/[0.04]" : "hover:bg-black/[0.04]";
  return (
    <div
      className={`flex flex-wrap content-center items-center gap-[8px] gap-y-[8px] rounded-[12px] ${bg} ${className ?? ""}`}
    >
      <span
        className="flex min-w-px flex-[1_0_0] flex-col items-start justify-center rounded-[12px] text-[14px] leading-[20px] font-normal whitespace-nowrap text-black"
        style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
      >
        {children}
      </span>
    </div>
  );
}
