// Traffic by Website — horizontal bar list. Each row is a site label
// with a fill-bar showing relative volume (0–1 fraction). Template data;
// swap for real telemetry.
const ROWS: { label: string; value: number }[] = [
  { label: "Google", value: 0.8 },
  { label: "YouTube", value: 0.65 },
  { label: "Instagram", value: 0.55 },
  { label: "Pinterest", value: 0.45 },
  { label: "Facebook", value: 0.35 },
  { label: "Twitter", value: 0.25 },
];

export function TrafficByWebsite() {
  return (
    <div
      className="flex flex-col gap-4 rounded-[16px] bg-[#f7f7f8] p-6"
      style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
    >
      <h2 className="text-[14px] leading-[20px] font-semibold text-black">
        Traffic by Website
      </h2>
      <ul className="flex flex-col gap-2">
        {ROWS.map((row) => (
          <li key={row.label} className="flex items-center gap-3">
            <span className="w-[80px] shrink-0 text-[12px] leading-[18px] text-black/60">
              {row.label}
            </span>
            <span
              className="relative h-1 flex-1 overflow-hidden rounded-full bg-black/[0.06]"
              role="progressbar"
              aria-label={`${row.label} traffic share`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(row.value * 100)}
            >
              <span
                className="absolute top-0 left-0 block h-full rounded-full bg-black"
                style={{ width: `${row.value * 100}%` }}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
