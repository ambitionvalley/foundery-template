export type StripProps = {
  /** Number of equal segments (1 → 7). */
  count?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /** Render as a vertical 2×134 column instead of a horizontal 160×2 row. */
  vertical?: boolean;
  className?: string;
};

/**
 * Strip — a segmented line. Horizontal is 160×2, vertical is 2×134. Segments
 * are separated by an 8px gap and share the full available length equally.
 *
 * @example
 *   <Strip count={4} />
 *   <Strip count={7} vertical />
 */
export function Strip({ count = 1, vertical = false, className }: StripProps) {
  const gap = count > 1 ? 8 : 0;

  return (
    <div
      aria-hidden
      className={`flex overflow-clip ${vertical ? "h-[134px] w-[2px] flex-col items-center" : "h-[2px] w-[160px] items-start"} ${className ?? ""}`}
      style={{ gap }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`flex-[1_0_0] bg-black ${vertical ? "min-h-px w-full" : "h-full min-w-px"}`}
        />
      ))}
    </div>
  );
}
