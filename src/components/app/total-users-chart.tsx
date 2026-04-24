"use client";

import { useId, useState } from "react";

// Sample data (arbitrary values normalized to the 0-30K axis). Fork-owners
// swap these for real telemetry — the series just need matching lengths.
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] as const;
const THIS_YEAR = [12, 16, 14, 19, 22, 18, 25];
const LAST_YEAR = [10, 13, 15, 17, 14, 19, 22];

type Tab = "users" | "projects" | "operating";

const TABS: { id: Tab; label: string }[] = [
  { id: "users", label: "Total Users" },
  { id: "projects", label: "Total Projects" },
  { id: "operating", label: "Operating Status" },
];

// Simple dual-line chart rendered as SVG — no chart library dependency.
// Left axis: 30K / 20K / 10K / 0. X axis: Jan–Jul. Two series share the
// same scale; "This year" is a solid line, "Last year" is dashed.
export function TotalUsersChart() {
  const [active, setActive] = useState<Tab>("users");
  const gradId = useId();

  const width = 600;
  const height = 220;
  const padLeft = 40;
  const padRight = 12;
  const padTop = 16;
  const padBottom = 32;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;
  const maxY = 30;

  function path(values: readonly number[]) {
    return values
      .map((v, i) => {
        const x = padLeft + (plotW * i) / (values.length - 1);
        const y = padTop + plotH - (plotH * v) / maxY;
        return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ");
  }

  function areaPath(values: readonly number[]) {
    const line = path(values);
    const lastX = padLeft + plotW;
    const baseY = padTop + plotH;
    return `${line} L ${lastX.toFixed(2)} ${baseY} L ${padLeft} ${baseY} Z`;
  }

  return (
    <div
      className="flex flex-col gap-4 rounded-[16px] bg-[#f7f7f8] p-6"
      style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-4">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`text-[14px] leading-[20px] font-semibold ${
                active === tab.id ? "text-black" : "text-black/40"
              } hover:text-black`}
            >
              {tab.label}
              {i === 0 ? (
                <span
                  aria-hidden
                  className="ml-4 inline-block h-3 w-px bg-black/10 align-middle"
                />
              ) : null}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-4 text-[12px] leading-[18px] text-black/60">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            This year
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a8c5e5]" />
            Last year
          </span>
        </div>
      </div>

      <div className="relative">
        <svg
          role="img"
          aria-label="Total users over time"
          viewBox={`0 0 ${width} ${height}`}
          className="w-full"
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 10, 20, 30].map((v) => {
            const y = padTop + plotH - (plotH * v) / maxY;
            return (
              <g key={v}>
                <line
                  x1={padLeft}
                  x2={padLeft + plotW}
                  y1={y}
                  y2={y}
                  stroke="#000"
                  strokeOpacity={v === 0 ? 0.15 : 0.05}
                  strokeWidth={1}
                />
                <text
                  x={padLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="rgba(0,0,0,0.4)"
                >
                  {v === 0 ? "0" : `${v}K`}
                </text>
              </g>
            );
          })}

          <path
            d={areaPath(THIS_YEAR)}
            fill={`url(#${gradId})`}
            stroke="none"
          />
          <path
            d={path(THIS_YEAR)}
            fill="none"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={path(LAST_YEAR)}
            fill="none"
            stroke="#a8c5e5"
            strokeWidth={2}
            strokeDasharray="4 4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {MONTHS.map((m, i) => {
            const x = padLeft + (plotW * i) / (MONTHS.length - 1);
            return (
              <text
                key={m}
                x={x}
                y={height - 10}
                textAnchor="middle"
                fontSize="11"
                fill="rgba(0,0,0,0.4)"
              >
                {m}
              </text>
            );
          })}
        </svg>
        <span className="sr-only">
          Showing {active === "users" ? "Total Users" : active === "projects" ? "Total Projects" : "Operating Status"} for This year vs Last year.
        </span>
      </div>
    </div>
  );
}
