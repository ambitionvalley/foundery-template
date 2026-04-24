"use client";

import { useId, useState } from "react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] as const;
// Sample data normalised to the 0-30K axis. Fork-owners swap for real
// telemetry — the two series just need matching lengths.
const THIS_YEAR = [12, 16, 14, 19, 22, 18, 25];
const LAST_YEAR = [10, 13, 15, 17, 14, 19, 22];

type Tab = "users" | "projects" | "operating";

const TABS: { id: Tab; label: string }[] = [
  { id: "users", label: "Total Users" },
  { id: "projects", label: "Total Projects" },
  { id: "operating", label: "Operating Status" },
];

const TEXT_STYLE = { fontFeatureSettings: "'ss01' 1, 'cv01' 1" as const };

// Total Users block. Outer container (662x330, radius 20, bg #F9F9FA,
// pad 24) + tab row with a "|" separator and two legend tags + a
// dual-series SVG line chart (solid black for This year, dashed #A0BCE8
// for Last year).
export function TotalUsersChart() {
  const [active, setActive] = useState<Tab>("users");
  const gradId = useId();

  // Chart viewBox matches the Figma: 575 wide plot area, 246 tall.
  const W = 575;
  const H = 246;
  const padTop = 16;
  const padBottom = 28;
  const plotH = H - padTop - padBottom; // 202
  const maxY = 30;
  const n = MONTHS.length;

  function x(i: number) {
    return (W * i) / (n - 1);
  }
  function y(v: number) {
    return padTop + plotH - (plotH * v) / maxY;
  }

  // Smooth curve through the sample points using cubic Beziers with
  // control points derived from neighbouring deltas (Catmull-Rom style).
  function smoothPath(values: readonly number[]) {
    const pts = values.map((v, i) => ({ x: x(i), y: y(v) }));
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] ?? pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] ?? p2;
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)} ${cp2x.toFixed(2)} ${cp2y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
    }
    return d;
  }

  function areaPath(values: readonly number[]) {
    const base = padTop + plotH;
    return `${smoothPath(values)} L ${W} ${base} L 0 ${base} Z`;
  }

  return (
    <div
      className="flex flex-col gap-4 rounded-[20px] bg-[#f9f9fa] p-6"
      style={TEXT_STYLE}
    >
      <div className="flex flex-wrap items-center gap-4 text-[14px] leading-[20px]">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={
              active === tab.id
                ? "font-semibold text-black"
                : "text-black/40 hover:text-black"
            }
          >
            {tab.label}
          </button>
        ))}
        <span aria-hidden className="text-black/10">
          |
        </span>
        <LegendTag label="This year" dotColor="#000000" />
        <LegendTag label="Last year" dotColor="#A0BCE8" />
      </div>

      <div className="flex gap-4">
        <div className="flex w-6 shrink-0 flex-col justify-between pt-4 pb-7 text-[12px] leading-[16px] text-black/40">
          <span>30K</span>
          <span>20K</span>
          <span>10K</span>
          <span>0</span>
        </div>
        <div className="relative flex-1">
          <svg
            role="img"
            aria-label="Total users over time — This year vs Last year"
            viewBox={`0 0 ${W} ${H}`}
            className="w-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </linearGradient>
            </defs>

            {[30, 20, 10, 0].map((v) => {
              const yy = y(v);
              return (
                <line
                  key={v}
                  x1={0}
                  x2={W}
                  y1={yy}
                  y2={yy}
                  stroke="#000"
                  strokeOpacity={v === 0 ? 0.1 : 0.04}
                  strokeWidth={1}
                />
              );
            })}

            <path d={areaPath(THIS_YEAR)} fill={`url(#${gradId})`} stroke="none" />

            <path
              d={smoothPath(LAST_YEAR)}
              fill="none"
              stroke="#A0BCE8"
              strokeWidth={1}
              strokeDasharray="2 4"
              strokeLinecap="round"
            />
            <path
              d={smoothPath(THIS_YEAR)}
              fill="none"
              stroke="#000"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
          <div className="mt-2 flex text-[12px] leading-[16px] text-black/40">
            {MONTHS.map((m) => (
              <span key={m} className="flex-1 text-center">
                {m}
              </span>
            ))}
          </div>
          <span className="sr-only">
            Showing {active === "users" ? "Total Users" : active === "projects" ? "Total Projects" : "Operating Status"}.
          </span>
        </div>
      </div>
    </div>
  );
}

function LegendTag({ label, dotColor }: { label: string; dotColor: string }) {
  return (
    <span className="flex items-center gap-1 rounded-[8px] py-0.5 pr-2 pl-1 text-[12px] leading-[16px] text-black">
      <span
        aria-hidden
        className="size-[6px] rounded-full"
        style={{ backgroundColor: dotColor }}
      />
      {label}
    </span>
  );
}
