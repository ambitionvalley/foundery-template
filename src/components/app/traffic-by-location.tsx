// Traffic by Location — donut chart + legend. Arcs derived from the
// per-slice percentage; colors pulled from the Foundry secondary palette
// to match Traffic by Device. Template data; replace with real geo
// telemetry.
const SLICES: { label: string; pct: number; color: string }[] = [
  { label: "United States", pct: 52.1, color: "#000000" },
  { label: "Canada", pct: 22.8, color: "#71dd8c" },
  { label: "Mexico", pct: 13.9, color: "#b899eb" },
  { label: "Other", pct: 11.2, color: "#a0bce8" },
];

export function TrafficByLocation() {
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const r = 66;
  const rInner = 46;

  let cursor = -90; // start at 12 o'clock
  const arcs = SLICES.map((slice) => {
    const sweep = (slice.pct / 100) * 360;
    const start = cursor;
    const end = cursor + sweep;
    cursor = end;
    return { ...slice, start, end };
  });

  return (
    <div
      className="flex flex-col gap-4 rounded-[16px] bg-[#f7f7f8] p-6"
      style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
    >
      <h2 className="text-[14px] leading-[20px] font-semibold text-black">
        Traffic by Location
      </h2>
      <div className="flex items-center gap-6">
        <svg
          role="img"
          aria-label="Traffic share by country"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="shrink-0"
        >
          {arcs.map((arc, i) => (
            <path
              key={i}
              d={donutSlice(cx, cy, r, rInner, arc.start, arc.end)}
              fill={arc.color}
            />
          ))}
        </svg>
        <ul className="flex flex-1 flex-col gap-2 text-[12px] leading-[18px]">
          {SLICES.map((slice) => (
            <li
              key={slice.label}
              className="flex items-center justify-between gap-2"
            >
              <span className="flex items-center gap-2 text-black/60">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: slice.color }}
                />
                {slice.label}
              </span>
              <span className="text-black">{slice.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function donutSlice(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startDeg: number,
  endDeg: number,
) {
  const sweep = endDeg - startDeg;
  // Leave a tiny visual gap between slices.
  const gap = 1;
  const a = startDeg + gap / 2;
  const b = endDeg - gap / 2;
  const largeArc = sweep - gap > 180 ? 1 : 0;
  const p1 = polar(cx, cy, rOuter, a);
  const p2 = polar(cx, cy, rOuter, b);
  const p3 = polar(cx, cy, rInner, b);
  const p4 = polar(cx, cy, rInner, a);
  return [
    `M ${p1.x} ${p1.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    "Z",
  ].join(" ");
}
