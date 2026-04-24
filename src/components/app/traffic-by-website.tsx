// Traffic by Website — 202x330 block. Each row renders N small 2px pills
// with a repeating opacity pattern (1, 0.4, 0.1, then solid). Pill count
// per row matches the Figma source; fork-owners replace the label +
// count list with real per-site telemetry.
const ROWS: { label: string; count: number }[] = [
  { label: "Google", count: 7 },
  { label: "YouTube", count: 4 },
  { label: "Instagram", count: 6 },
  { label: "Pinterest", count: 3 },
  { label: "Facebook", count: 8 },
  { label: "Twitter", count: 5 },
];

const OPACITY_PATTERN = [1, 0.4, 0.1];

export function TrafficByWebsite() {
  return (
    <div
      className="flex flex-col gap-4 rounded-[20px] bg-[#f9f9fa] p-6"
      style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
    >
      <h2 className="text-[14px] leading-[20px] font-semibold text-black">
        Traffic by Website
      </h2>
      <ul className="flex flex-1 flex-col justify-between">
        {ROWS.map((row) => (
          <li
            key={row.label}
            className="flex items-center gap-4"
            aria-label={row.label}
          >
            <span className="flex-1 truncate text-[12px] leading-[16px] text-black">
              {row.label}
            </span>
            <div
              aria-hidden
              className="flex h-[34px] w-20 shrink-0 items-center gap-0.5"
            >
              {Array.from({ length: row.count }).map((_, i) => (
                <span
                  key={i}
                  className="h-0.5 flex-1 rounded-full bg-black"
                  style={{ opacity: OPACITY_PATTERN[i] ?? 1 }}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
