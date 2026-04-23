import type { ReactNode } from "react";

export type DatePickerType =
  | "date"
  | "date-time"
  | "date-range"
  | "date-range-time";

export type DatePickerProps = {
  /** Which of the four Figma variants to render. */
  type?: DatePickerType;
  /** Primary (or range-start) date shown at the top. */
  date?: [month: number, day: number, year: number];
  /** Range-end date — only used by range variants. */
  endDate?: [month: number, day: number, year: number];
  /** Time shown on the top-right (e.g. "04 : 08 AM"). */
  time?: string;
  /** Month/year label on the pager (e.g. "Feb"). */
  monthLabel?: string;
  /** Highlighted day number within the calendar grid. */
  selectedDay?: number;
  className?: string;
};

const TEXT_STYLE = { fontFeatureSettings: "'ss01' 1, 'cv01' 1" as const };

const WEEKDAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

// Figma sample calendar grid — 5 rows × 7 columns.
// Cells with `dim: true` are adjacent-month days (rendered in 20% black).
const CALENDAR_GRID: { day: number; dim: boolean }[][] = [
  [
    { day: 30, dim: true },
    { day: 31, dim: true },
    { day: 1, dim: false },
    { day: 2, dim: false },
    { day: 3, dim: false },
    { day: 4, dim: false },
    { day: 5, dim: false },
  ],
  [
    { day: 6, dim: false },
    { day: 7, dim: false },
    { day: 8, dim: false },
    { day: 9, dim: false },
    { day: 10, dim: false },
    { day: 11, dim: false },
    { day: 12, dim: false },
  ],
  [
    { day: 13, dim: false },
    { day: 14, dim: false },
    { day: 15, dim: false },
    { day: 16, dim: false },
    { day: 17, dim: false },
    { day: 18, dim: false },
    { day: 19, dim: false },
  ],
  [
    { day: 20, dim: false },
    { day: 21, dim: false },
    { day: 22, dim: false },
    { day: 23, dim: false },
    { day: 24, dim: false },
    { day: 25, dim: false },
    { day: 26, dim: false },
  ],
  [
    { day: 27, dim: false },
    { day: 28, dim: false },
    { day: 1, dim: true },
    { day: 2, dim: true },
    { day: 3, dim: true },
    { day: 4, dim: true },
    { day: 5, dim: true },
  ],
];

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function DateDisplay({
  date,
  muted,
}: {
  date: [number, number, number];
  muted?: boolean;
}) {
  const [m, d, y] = date;
  const color = muted ? "rgba(0,0,0,0.2)" : "black";
  const separator = "rgba(0,0,0,0.2)";
  return (
    <span
      className="inline-flex items-center text-[14px] leading-[20px] font-normal whitespace-nowrap"
      style={TEXT_STYLE}
    >
      <span style={{ color }}>{pad2(m)}</span>
      <span className="mx-[4px]" style={{ color: separator }}>
        /
      </span>
      <span style={{ color: muted ? "rgba(0,0,0,0.2)" : "black" }}>{pad2(d)}</span>
      <span className="mx-[4px]" style={{ color: separator }}>
        /
      </span>
      <span style={{ color }}>{y}</span>
    </span>
  );
}

function Time({ value }: { value: string }) {
  return (
    <span
      className="text-[14px] leading-[20px] font-normal whitespace-nowrap text-black"
      style={TEXT_STYLE}
    >
      {value}
    </span>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  const d = direction === "left" ? "M10 12 L6 8 L10 4" : "M6 4 L10 8 L6 12";
  return (
    <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d={d}
        stroke="black"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TextButton({
  children,
  active,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className="rounded-[8px] px-[8px] py-[4px] text-[14px] leading-[20px] font-normal text-black"
      style={{
        ...TEXT_STYLE,
        background: active ? "rgba(0,0,0,0.04)" : "transparent",
      }}
    >
      {children}
    </span>
  );
}

function Day({
  day,
  dim,
  selected,
}: {
  day: number;
  dim: boolean;
  selected: boolean;
}) {
  return (
    <span
      className="flex size-[40px] items-center justify-center rounded-[12px] text-[14px] leading-[20px] font-normal"
      style={{
        ...TEXT_STYLE,
        color: dim ? "rgba(0,0,0,0.2)" : "black",
        background: selected ? "#adadfb" : "transparent",
      }}
    >
      {day}
    </span>
  );
}

/**
 * DatePicker — compact calendar popover with four types: date only, date +
 * time, date range, and date range + time. Renders a static month grid
 * matching the Figma sample — wire <code>selectedDay</code> and
 * <code>date</code> to real state for live use.
 *
 * @example
 *   <DatePicker date={[10, 22, 2026]} selectedDay={10} />
 *   <DatePicker type="date-range" date={[10, 22, 2026]} endDate={[10, 22, 2026]} />
 */
export function DatePicker({
  type = "date",
  date = [10, 22, 2026],
  endDate = [10, 22, 2026],
  time = "04 : 08 AM",
  monthLabel = "Feb",
  selectedDay = 10,
  className,
}: DatePickerProps) {
  const isRange = type === "date-range" || type === "date-range-time";
  const hasTime = type === "date-time" || type === "date-range-time";

  return (
    <div
      className={`flex w-[360px] flex-col overflow-hidden rounded-[16px] bg-white/80 ${className ?? ""}`}
      style={{ boxShadow: "0 8px 28px 0 rgba(0,0,0,0.1)" }}
    >
      {/* Header: date + optional range end + optional time */}
      <div className="flex items-center justify-between gap-[8px] px-[24px] py-[20px]">
        <div className="flex min-w-px flex-1 items-center gap-[8px]">
          <DateDisplay date={date} />
          {isRange && (
            <>
              <span
                className="text-[14px] leading-[20px] font-normal text-black/40"
                style={TEXT_STYLE}
              >
                –
              </span>
              <DateDisplay date={endDate} muted />
            </>
          )}
        </div>
        {hasTime && <Time value={time} />}
      </div>

      {/* Sub-header: shortcuts + month pager */}
      <div className="flex items-center justify-between gap-[8px] px-[16px] pb-[12px]">
        <div className="flex items-center gap-[4px]">
          <TextButton>Today</TextButton>
          <TextButton active>Last selection</TextButton>
        </div>
        <div className="flex items-center gap-[8px]">
          <span className="inline-flex size-[24px] items-center justify-center rounded-[8px]">
            <Chevron direction="left" />
          </span>
          <span
            className="text-[14px] leading-[20px] font-normal text-black"
            style={TEXT_STYLE}
          >
            {monthLabel}
          </span>
          <span className="inline-flex size-[24px] items-center justify-center rounded-[8px]">
            <Chevron direction="right" />
          </span>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="px-[16px] pb-[20px]">
        <div className="grid grid-cols-7">
          {WEEKDAY_LABELS.map((w) => (
            <span
              key={w}
              className="flex h-[32px] items-center justify-center text-[12px] leading-[16px] font-normal text-black/40"
              style={TEXT_STYLE}
            >
              {w}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {CALENDAR_GRID.flatMap((row, rowIdx) =>
            row.map((cell, colIdx) => (
              <Day
                key={`${rowIdx}-${colIdx}`}
                day={cell.day}
                dim={cell.dim}
                selected={!cell.dim && cell.day === selectedDay}
              />
            )),
          )}
        </div>
      </div>
    </div>
  );
}
