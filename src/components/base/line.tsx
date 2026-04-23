export type LineLayout = "horizontal" | "vertical" | "left-arrow" | "right-arrow";

export type LineProps = {
  /** Number of parallel strokes (1 → 8). Arrow layouts ignore count (always 1). */
  count?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /** Orientation / arrow decoration. */
  layout?: LineLayout;
  className?: string;
};

// Cross-axis container sizes taken from the Figma spec.
// Horizontal layout: width is always 80, height grows with count.
const H_CROSS: Record<NonNullable<LineProps["count"]>, number> = {
  1: 1,
  2: 8,
  3: 16,
  4: 32,
  5: 32,
  6: 40,
  7: 40,
  8: 40,
};

// Vertical layout: height is always 80, width grows with count.
const V_CROSS: Record<NonNullable<LineProps["count"]>, number> = {
  1: 1,
  2: 20,
  3: 20,
  4: 40,
  5: 40,
  6: 40,
  7: 40,
  8: 40,
};

const AXIS_LENGTH = 80;
const ARROW_HEAD = 6;

/**
 * Line — a 1px stroked divider.
 *
 * Horizontal (80 wide) and vertical (80 tall) layouts accept 1 → 8 parallel
 * strokes, evenly distributed across the cross-axis. The arrow layouts are
 * single-stroke connectors with a small arrow head at one end.
 *
 * @example
 *   <Line />                           // horizontal, 1 stroke
 *   <Line count={4} />
 *   <Line layout="vertical" count={6} />
 *   <Line layout="right-arrow" />
 */
export function Line({ count = 1, layout = "horizontal", className }: LineProps) {
  if (layout === "left-arrow" || layout === "right-arrow") {
    const isRight = layout === "right-arrow";
    return (
      <svg
        aria-hidden
        className={className}
        width={AXIS_LENGTH}
        height={ARROW_HEAD * 2}
        viewBox={`0 0 ${AXIS_LENGTH} ${ARROW_HEAD * 2}`}
      >
        <line
          x1={isRight ? 0 : ARROW_HEAD}
          y1={ARROW_HEAD}
          x2={isRight ? AXIS_LENGTH - ARROW_HEAD : AXIS_LENGTH}
          y2={ARROW_HEAD}
          stroke="#000"
          strokeWidth={1}
        />
        {isRight ? (
          <polyline
            points={`${AXIS_LENGTH - ARROW_HEAD},${ARROW_HEAD - ARROW_HEAD} ${AXIS_LENGTH},${ARROW_HEAD} ${AXIS_LENGTH - ARROW_HEAD},${ARROW_HEAD * 2}`}
            fill="none"
            stroke="#000"
            strokeWidth={1}
            strokeLinejoin="miter"
          />
        ) : (
          <polyline
            points={`${ARROW_HEAD},0 0,${ARROW_HEAD} ${ARROW_HEAD},${ARROW_HEAD * 2}`}
            fill="none"
            stroke="#000"
            strokeWidth={1}
            strokeLinejoin="miter"
          />
        )}
      </svg>
    );
  }

  const isVertical = layout === "vertical";
  const containerStyle = isVertical
    ? { width: V_CROSS[count], height: AXIS_LENGTH }
    : { width: AXIS_LENGTH, height: H_CROSS[count] };

  return (
    <div
      aria-hidden
      className={`flex ${isVertical ? "flex-row justify-between" : "flex-col justify-between"} ${className ?? ""}`}
      style={containerStyle}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="shrink-0 bg-black"
          style={isVertical ? { width: 1, height: AXIS_LENGTH } : { height: 1, width: AXIS_LENGTH }}
        />
      ))}
    </div>
  );
}
