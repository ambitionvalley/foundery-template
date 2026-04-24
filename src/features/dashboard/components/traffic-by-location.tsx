// Traffic by Location — 432x280 block. 120x120 donut with 4 colored
// slices + a right-side legend listing each country with a dot-tagged
// label and its percentage. Colours match the Figma fills; template
// data, swap for real geo telemetry.
const SLICES: { label: string; pct: number; color: string }[] = [
  { label: "United States", pct: 52.1, color: "#000000" },
  { label: "Canada", pct: 22.8, color: "#7DBBFF" },
  { label: "Mexico", pct: 13.9, color: "#71DD8C" },
  { label: "Other", pct: 11.2, color: "#A0BCE8" },
];

export function TrafficByLocation() {
  const size = 120;
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = 56;
  const rInner = 32;

  // Start at 12 o'clock (-90deg) and accumulate sweep offsets functionally
  // so we don't reassign a mutable binding across render.
  const arcs = SLICES.reduce<
    Array<(typeof SLICES)[number] & { start: number; end: number }>
  >((acc, slice) => {
    const prev = acc[acc.length - 1];
    const start = prev ? prev.end : -90;
    const end = start + (slice.pct / 100) * 360;
    acc.push({ ...slice, start, end });
    return acc;
  }, []);

  return (
    <div
      className="flex flex-col gap-4 rounded-[20px] bg-[#f9f9fa] p-6"
      style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
    >
      <h2 className="text-[14px] leading-[20px] font-semibold text-black">
        Traffic by Location
      </h2>
      <div className="flex items-center justify-between gap-10 px-5">
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
              d={donutSlice(cx, cy, rOuter, rInner, arc.start, arc.end)}
              fill={arc.color}
            />
          ))}
        </svg>
        <ul className="flex flex-1 flex-col gap-3 text-[12px] leading-[16px] text-black">
          {SLICES.map((slice) => (
            <li
              key={slice.label}
              className="flex items-center justify-between gap-12"
            >
              <span className="flex items-center gap-2 rounded-[8px] py-0.5 pr-2 pl-1">
                <span
                  aria-hidden
                  className="size-[6px] rounded-full"
                  style={{ backgroundColor: slice.color }}
                />
                {slice.label}
              </span>
              <span>{slice.pct}%</span>
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
  // Small visual gap between slices so the Figma's "Subtract" corner
  // radius shows through as separated segments.
  const gap = 2;
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
