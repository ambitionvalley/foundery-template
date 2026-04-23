import type { ReactNode } from "react";

export type BadgeProps = {
  /** "dot" = 16×16 frame with a 6px indigo dot. "number" = indigo pill with content. */
  type?: "dot" | "number";
  /** Number or label to render when type="number". */
  children?: ReactNode;
  className?: string;
};

/**
 * Badge — a small status indicator.
 *
 * @example
 *   <Badge />                     // dot variant
 *   <Badge type="number">12</Badge>
 *   <Badge type="number">99+</Badge>
 */
export function Badge({ type = "dot", children, className }: BadgeProps) {
  if (type === "number") {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-[#adadfb] px-[6px] py-px text-center text-[12px] leading-[16px] font-normal whitespace-nowrap text-white ${className ?? ""}`}
        style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        aria-hidden={!children}
      >
        {children ?? "12"}
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className={`inline-flex items-center justify-center rounded-[4px] ${className ?? ""}`}
      style={{ width: 16, height: 16 }}
    >
      <span
        className="block rounded-full bg-[#adadfb]"
        style={{ width: 6, height: 6 }}
      />
    </span>
  );
}
