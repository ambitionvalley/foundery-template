import type { ReactNode } from "react";

export type TextOrientation = "vertical" | "horizontal";
export type TextState = "default" | "hover" | "static";

export type TextProps = {
  /** Stack items vertically (block) or lay them out inline with gap-4px. */
  orientation?: TextOrientation;
  /**
   * "hover" adds horizontal padding so the frame has a visible hit area when
   * used as an interactive label. "default" and "static" are visually identical
   * — "static" exists to mark frames that should never wrap on their own.
   */
  state?: TextState;
  className?: string;
  children?: ReactNode;
};

/**
 * Design-system Text frame — a consistent 14/20 typography container that can
 * hold one or more text slots stacked vertically or laid out inline.
 *
 * @example
 *   <Text orientation="vertical">
 *     <p>Line 1</p>
 *     <p>Line 2</p>
 *   </Text>
 */
export function Text({
  orientation = "vertical",
  state = "default",
  className,
  children,
}: TextProps) {
  const layout =
    orientation === "vertical"
      ? "flex-col items-start justify-center"
      : "flex-wrap content-center items-center gap-[4px] whitespace-nowrap";

  const padding = state === "hover" ? "px-[4px]" : "";

  return (
    <div
      className={`flex rounded-[12px] text-[14px] leading-[20px] font-normal text-black ${layout} ${padding} ${className ?? ""}`}
      style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
    >
      {children}
    </div>
  );
}
