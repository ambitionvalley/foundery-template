import type { ReactNode } from "react";

export type QuickActionProps = {
  /** Option rows. When omitted, renders <code>count</code> default "Option N" rows. */
  options?: ReactNode[];
  /** Fallback row count when <code>options</code> is omitted. 1–8. */
  count?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /** Optional click handler per row index. */
  onSelect?: (index: number) => void;
  className?: string;
};

const TEXT_STYLE = { fontFeatureSettings: "'ss01' 1, 'cv01' 1" as const };

/**
 * QuickAction — floating menu card with up to eight tap-targets stacked in a
 * column. The 120px-wide surface uses translucent white (90%) with a soft
 * drop-shadow and backdrop-blur so it sits cleanly over any background. Each
 * row gets a 12px hover surface via its own 8px padding.
 *
 * @example
 *   <QuickAction count={3} />
 *   <QuickAction options={["Rename", "Duplicate", "Delete"]} onSelect={fn} />
 */
export function QuickAction({
  options,
  count = 3,
  onSelect,
  className,
}: QuickActionProps) {
  const rows: ReactNode[] =
    options ??
    Array.from({ length: count }, (_, i) => `Option ${i + 1}`);

  return (
    <div
      className={`flex w-[120px] flex-col items-start rounded-[16px] bg-white/90 p-[12px] shadow-[0_8px_28px_0_rgba(0,0,0,0.1)] backdrop-blur-[20px] ${className ?? ""}`}
    >
      {rows.map((row, i) => {
        const content = (
          <span
            className="block w-full text-[14px] leading-[20px] font-normal text-black"
            style={TEXT_STYLE}
          >
            {row}
          </span>
        );

        const rowClass =
          "flex w-full shrink-0 flex-col items-start justify-center rounded-[12px] p-[8px]";

        return onSelect ? (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            className={`${rowClass} text-left transition-colors hover:bg-black/[0.04]`}
          >
            {content}
          </button>
        ) : (
          <div key={i} className={rowClass}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
