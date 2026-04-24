import { TrendDown, TrendUp } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

type Tone = "blue" | "lilac";

const TONE_BG: Record<Tone, string> = {
  blue: "bg-[#e6f1fd]",
  lilac: "bg-[#edeefc]",
};

export type StatCardProps = {
  label: string;
  value: ReactNode;
  /** Signed percentage string, e.g. "+11.01%" or "-0.03%". */
  delta: string;
  /** Background tone — Figma alternates blue/lilac across the 4-up row. */
  tone: Tone;
};

// KPI card for the Overview dashboard. Layout mirrors the Figma: label
// on top (14/20 Regular), value and delta on a shared baseline (value
// 24/32 Semi Bold, delta 12/16 Regular with a TrendUp/TrendDown glyph).
// All text is black — no dimmed deltas.
export function StatCard({ label, value, delta, tone }: StatCardProps) {
  const isNegative = delta.trim().startsWith("-");
  const Trend = isNegative ? TrendDown : TrendUp;
  return (
    <div
      className={`flex flex-1 flex-col gap-2 rounded-[20px] p-6 ${TONE_BG[tone]}`}
      style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
    >
      <p className="text-[14px] leading-[20px] text-black">{label}</p>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[24px] leading-[32px] font-semibold text-black">
          {value}
        </p>
        <span className="flex items-center gap-2 text-[12px] leading-[16px] text-black">
          {delta}
          <Trend size={16} weight="bold" />
        </span>
      </div>
    </div>
  );
}
