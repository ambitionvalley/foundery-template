import type { ReactNode } from "react";

export type TooltipVariant = "dark" | "light";

export type TooltipProps = {
  /** Dark is a translucent dark gradient; light is a subtle 4% black pill. */
  variant?: TooltipVariant;
  /** Primary label content. */
  children?: ReactNode;
  /** Optional secondary text (e.g. a keyboard shortcut). */
  shortcut?: ReactNode;
  className?: string;
};

const DARK_BG =
  "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%), linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 100%)";

/**
 * Tooltip — compact hover label with optional shortcut. Two variants: a
 * translucent dark gradient for image / dark surfaces and a subtle 4% black
 * pill for light surfaces. Both apply a 20px backdrop blur.
 *
 * @example
 *   <Tooltip>Copy</Tooltip>
 *   <Tooltip shortcut="⌘C">Copy</Tooltip>
 *   <Tooltip variant="light" shortcut="?">Help</Tooltip>
 */
export function Tooltip({
  variant = "dark",
  children = "Tooltip",
  shortcut,
  className,
}: TooltipProps) {
  const isLight = variant === "light";
  const labelColor = isLight ? "black" : "white";
  const shortcutColor = isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)";

  return (
    <div
      role="tooltip"
      className={`inline-flex items-center gap-[4px] rounded-[12px] px-[8px] py-[4px] text-[12px] leading-[16px] font-normal whitespace-nowrap backdrop-blur-[20px] ${
        isLight ? "bg-black/[0.04]" : ""
      } ${className ?? ""}`}
      style={isLight ? undefined : { backgroundImage: DARK_BG }}
    >
      <span style={{ color: labelColor, fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
        {children}
      </span>
      {shortcut !== undefined && shortcut !== null && shortcut !== false && (
        <span style={{ color: shortcutColor, fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
          {shortcut}
        </span>
      )}
    </div>
  );
}
