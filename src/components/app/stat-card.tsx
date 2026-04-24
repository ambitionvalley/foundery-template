import type { ReactNode } from "react";

type Tone = "lilac" | "blue" | "neutral";

const TONE_BG: Record<Tone, string> = {
  lilac: "bg-[#edeefc]",
  blue: "bg-[#e6f1fd]",
  neutral: "bg-[#f7f7f8]",
};

export type StatCardProps = {
  label: string;
  value: ReactNode;
  /** Signed percentage string, e.g. "+11.01%" or "-0.03%". */
  delta: string;
  /** Background tone. Defaults to neutral. */
  tone?: Tone;
};

// KPI card for the Overview dashboard — label on top, large value left,
// percent delta chip on the right with an up/down trend arrow derived from
// the sign of the delta string.
export function StatCard({ label, value, delta, tone = "neutral" }: StatCardProps) {
  const isNegative = delta.trim().startsWith("-");
  return (
    <div
      className={`flex flex-1 flex-col gap-2 rounded-[16px] p-6 ${TONE_BG[tone]}`}
      style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
    >
      <p className="text-[14px] leading-[20px] font-semibold text-black">
        {label}
      </p>
      <div className="flex items-end justify-between gap-2">
        <p className="text-[24px] leading-[32px] font-semibold text-black">
          {value}
        </p>
        <span className="flex items-center gap-1 text-[12px] leading-[18px] text-black">
          {delta}
          <TrendArrow down={isNegative} />
        </span>
      </div>
    </div>
  );
}

function TrendArrow({ down }: { down: boolean }) {
  // 45° arrow that points up-right for positive deltas and down-right for
  // negative deltas — mirrors the Figma treatment where both trend arrows
  // share the same silhouette, just rotated.
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      style={{
        transform: down ? "rotate(90deg)" : "rotate(0deg)",
      }}
    >
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
