import type { ReactNode } from "react";

export type TapState = "active" | "inactive" | "hover";

export type TapProps = {
  /** Visual state: active underlined, inactive dimmed, hover full-contrast. */
  state?: TapState;
  children?: ReactNode;
  className?: string;
};

/**
 * Tap — tab-style label with an active-state underline. Use in tab bars,
 * segmented navigation rows, and anywhere a group of inline labels needs
 * to show which one is currently selected.
 *
 * @example
 *   <Tap state="active">Overview</Tap>
 *   <Tap state="inactive">Activity</Tap>
 *   <Tap state="hover">Settings</Tap>
 */
export function Tap({ state = "active", children = "Text", className }: TapProps) {
  const isActive = state === "active";
  const textColor =
    state === "inactive" ? "rgba(0,0,0,0.4)" : "black";

  return (
    <div
      className={`inline-flex flex-col items-center ${isActive ? "gap-[4px]" : ""} ${className ?? ""}`}
    >
      <span
        className="rounded-[12px] text-[14px] leading-[20px] font-normal whitespace-nowrap"
        style={{ color: textColor, fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
      >
        {children}
      </span>
      {isActive && (
        <span aria-hidden className="block h-px w-full bg-black" />
      )}
    </div>
  );
}
