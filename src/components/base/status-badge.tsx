import type { ReactNode } from "react";

export type StatusColor =
  | "purple"
  | "indigo"
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "grey";

export type StatusBadgeProps = {
  /** Semantic colour. */
  color?: StatusColor;
  /** `true` uses 14/20 text + 16px dot; `false` uses 12/16 text + 12px dot. */
  big?: boolean;
  /** `true` → tinted pill (10% surface, no dot). `false` → leading dot + bare label. */
  background?: boolean;
  /** Label content. */
  children?: ReactNode;
  className?: string;
};

const COLOR: Record<StatusColor, string> = {
  purple: "#b899eb",
  indigo: "#adadfb",
  blue: "#7dbbff",
  green: "#71dd8c",
  yellow: "#ffcc00",
  red: "#ff4747",
  grey: "rgba(0,0,0,0.4)",
};

const TEXT_STYLE = { fontFeatureSettings: "'ss01' 1, 'cv01' 1" as const };

/**
 * StatusBadge — semantic status chip.
 *
 * Four shapes: small-dot, small-pill, big-dot, big-pill. Seven colours. The
 * pill variants tint the surface at 10% and drop the dot.
 *
 * @example
 *   <StatusBadge color="green">Live</StatusBadge>
 *   <StatusBadge color="red" big>Error</StatusBadge>
 *   <StatusBadge color="indigo" background>Draft</StatusBadge>
 *   <StatusBadge color="blue" big background>Processing</StatusBadge>
 */
export function StatusBadge({
  color = "purple",
  big = false,
  background = false,
  children = "Label",
  className,
}: StatusBadgeProps) {
  const tone = COLOR[color];
  const textSize = big ? "text-[14px] leading-[20px]" : "text-[12px] leading-[16px]";

  if (background) {
    const padding = big ? "px-[12px] py-[4px]" : "px-[8px] py-[2px]";
    return (
      <span
        className={`relative inline-flex items-center overflow-hidden rounded-[80px] ${padding} ${className ?? ""}`}
      >
        <span
          aria-hidden
          className="absolute inset-0 opacity-10"
          style={{ background: tone }}
        />
        <span
          className={`relative font-normal whitespace-nowrap ${textSize}`}
          style={{ color: tone, ...TEXT_STYLE }}
        >
          {children}
        </span>
      </span>
    );
  }

  const dotSize = big ? 16 : 12;
  const dotInset = big ? "28.13%" : "31.25%";

  return (
    <span
      className={`inline-flex items-center rounded-[4px] ${className ?? ""}`}
    >
      <span
        aria-hidden
        className="relative shrink-0"
        style={{ width: dotSize, height: dotSize }}
      >
        <span
          className="absolute rounded-full"
          style={{
            top: dotInset,
            right: dotInset,
            bottom: dotInset,
            left: dotInset,
            background: tone,
          }}
        />
      </span>
      <span
        className={`font-normal whitespace-nowrap ${textSize}`}
        style={{ color: tone, ...TEXT_STYLE }}
      >
        {children}
      </span>
    </span>
  );
}
