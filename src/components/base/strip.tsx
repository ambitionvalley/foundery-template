export type StripProps = {
  /** Number of equal segments. Defaults to 1. */
  count?: number;
  /** Render as a vertical 2×134 column instead of a horizontal 160×2 row. */
  vertical?: boolean;
  /** Gap between segments in px. Defaults to 8 when count > 1. */
  gap?: number;
  /**
   * Per-segment opacity. Segments past the pattern length fall back to
   * fully opaque. Omit for a uniformly solid strip.
   */
  pattern?: readonly number[];
  className?: string;
};

/**
 * Strip — a segmented line. Horizontal defaults to 160×2, vertical to
 * 2×134; override via `className` (e.g. `!w-20` for the 80px rail used
 * in the Overview's Traffic by Website block). Segments share the
 * remaining length equally after subtracting the gap.
 *
 * @example
 *   <Strip count={4} />
 *   <Strip count={7} vertical />
 *   <Strip count={7} gap={2} pattern={[1, 0.4, 0.1]} className="!w-20" />
 */
export function Strip({
  count = 1,
  vertical = false,
  gap,
  pattern,
  className,
}: StripProps) {
  const resolvedGap = gap ?? (count > 1 ? 8 : 0);

  return (
    <div
      aria-hidden
      className={`flex overflow-clip ${vertical ? "h-[134px] w-[2px] flex-col items-center" : "h-[2px] w-[160px] items-start"} ${className ?? ""}`}
      style={{ gap: resolvedGap }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`flex-[1_0_0] rounded-full bg-black ${vertical ? "min-h-px w-full" : "h-full min-w-px"}`}
          style={pattern ? { opacity: pattern[i] ?? 1 } : undefined}
        />
      ))}
    </div>
  );
}
