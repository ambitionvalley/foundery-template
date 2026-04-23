import type { ReactNode } from "react";

export type TooltipPosition = "top" | "bottom" | "left" | "right" | "center";

export type TooltipAnchorProps = {
  /** Where the tooltip sits relative to the trigger. */
  position?: TooltipPosition;
  /** Controls tooltip visibility (for prototype / controlled usage). */
  open?: boolean;
  /** Tooltip label. */
  label?: ReactNode;
  /** The anchor — what the tooltip is attached to. */
  children?: ReactNode;
  className?: string;
};

const GAP = 4;

/**
 * TooltipAnchor — positions a Tooltip-style bubble around a trigger. Use it
 * for inline docs on icon buttons, table cells, or any control where a hover
 * label belongs next to its anchor.
 *
 * @example
 *   <TooltipAnchor label="Duplicate" position="bottom">
 *     <IconButton>...</IconButton>
 *   </TooltipAnchor>
 */
export function TooltipAnchor({
  position = "bottom",
  open = true,
  label = "Tooltip",
  children,
  className,
}: TooltipAnchorProps) {
  const bubbleClass =
    position === "top"
      ? `bottom-full left-1/2 -translate-x-1/2 mb-[${GAP}px]`
      : position === "bottom"
        ? `top-full left-1/2 -translate-x-1/2 mt-[${GAP}px]`
        : position === "left"
          ? `right-full top-1/2 -translate-y-1/2 mr-[${GAP}px]`
          : position === "right"
            ? `left-full top-1/2 -translate-y-1/2 ml-[${GAP}px]`
            : `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`;

  return (
    <span className={`relative inline-flex ${className ?? ""}`}>
      {children}
      {open && (
        <span
          role="tooltip"
          className={`absolute rounded-[12px] bg-black/80 px-[8px] py-[4px] text-[12px] leading-[16px] font-normal whitespace-nowrap text-white ${bubbleClass}`}
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          {label}
        </span>
      )}
    </span>
  );
}
