import type { ReactNode } from "react";

export type SliderProps = {
  /** Progress value, 0–100. */
  value?: number;
  /** Active (grabbing) state — enlarges the handle from 4px to 8px. */
  active?: boolean;
  /** Label rendered inside / alongside the fill. */
  label?: ReactNode;
  className?: string;
};

const TRACK_WIDTH = 160;
const TRACK_HEIGHT = 32;
const HANDLE_MIN = 8;
const LABEL_LEFT = 8;

/**
 * Slider — progress bar with a draggable handle, a label inside the fill,
 * and the current percentage on the trailing edge.
 *
 * The label renders inside the filled portion (white) when value > 0 and on
 * the empty track (black) when value = 0. The percentage on the right sits on
 * top of whichever surface is underneath it, at 20% opacity (inactive) or
 * 40% opacity (active).
 *
 * @example
 *   <Slider value={28} />
 *   <Slider value={74} active label="Loading" />
 */
export function Slider({
  value = 0,
  active = false,
  label = "Text",
  className,
}: SliderProps) {
  const pct = Math.max(0, Math.min(100, value));
  const isZero = pct === 0;
  const isFull = pct >= 100;
  const fillPx = isZero ? HANDLE_MIN : (pct / 100) * TRACK_WIDTH;
  const handleHeight = active ? 8 : 4;

  const labelColor = isZero ? "black" : "white";
  const pctColor = isFull
    ? active
      ? "rgba(255,255,255,0.4)"
      : "rgba(255,255,255,0.2)"
    : active
      ? "rgba(0,0,0,0.4)"
      : "rgba(0,0,0,0.2)";

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={`relative h-8 w-40 overflow-clip rounded-[8px] bg-black/[0.04] ${className ?? ""}`}
      style={{ width: TRACK_WIDTH, height: TRACK_HEIGHT }}
    >
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-0 rounded-[8px] bg-black"
        style={{ width: fillPx }}
      />
      <span
        className="absolute top-1/2 -translate-y-1/2 text-[12px] leading-[16px] font-normal whitespace-nowrap"
        style={{
          left: LABEL_LEFT,
          color: labelColor,
          fontFeatureSettings: "'ss01' 1, 'cv01' 1",
        }}
      >
        {label}
      </span>
      <span
        aria-hidden
        className="absolute top-1/2 block -translate-y-1/2 bg-white"
        style={{
          left: fillPx - 4,
          width: 1,
          height: handleHeight,
        }}
      />
      <span
        className="absolute top-1/2 -translate-y-1/2 text-[12px] leading-[16px] font-normal whitespace-nowrap"
        style={{
          right: 8,
          color: pctColor,
          fontFeatureSettings: "'ss01' 1, 'cv01' 1",
        }}
      >
        {pct}%
      </span>
    </div>
  );
}
