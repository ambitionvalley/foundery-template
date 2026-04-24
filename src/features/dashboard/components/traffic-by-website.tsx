import { Strip } from "@/components/base/strip";

// Traffic by Website — 202x330 Overview block. Each row is a <Strip>
// from the base design system with the opacity pattern Figma uses
// across the widget. Fork-owners replace the list with real telemetry.
const ROWS: { label: string; count: number }[] = [
  { label: "Google", count: 7 },
  { label: "YouTube", count: 4 },
  { label: "Instagram", count: 6 },
  { label: "Pinterest", count: 3 },
  { label: "Facebook", count: 8 },
  { label: "Twitter", count: 5 },
];

const PATTERN = [1, 0.4, 0.1] as const;

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
            <Strip
              count={row.count}
              gap={2}
              pattern={PATTERN}
              className="!w-20"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
