export type ScrollBarProps = {
  /** `default` is 4px wide at 20% black; `hover` is 8px wide at 40% black. */
  hover?: boolean;
  /** Track length in pixels. */
  length?: number;
  className?: string;
};

/**
 * ScrollBar — decorative scrollbar thumb. Mirrors the SnowUI spec: 4px wide
 * at rest and 8px wide on hover, with a 20% white inner border so the bar
 * reads on both light and dark surfaces.
 *
 * @example
 *   <ScrollBar />
 *   <ScrollBar hover />
 */
export function ScrollBar({ hover = false, length = 80, className }: ScrollBarProps) {
  const width = hover ? 8 : 4;
  const bg = hover ? "bg-black/40" : "bg-black/20";
  return (
    <span
      aria-hidden
      className={`block rounded-[8px] border border-solid border-white/20 ${bg} ${className ?? ""}`}
      style={{ width, height: length }}
    />
  );
}
