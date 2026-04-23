import type { ReactNode } from "react";

export type SliderBarProps = {
  /** Leading label (e.g. minimum value). */
  startLabel?: ReactNode;
  /** Trailing label (e.g. maximum value). */
  endLabel?: ReactNode;
  className?: string;
};

function Handle() {
  return (
    <span
      aria-hidden
      className="block size-8 shrink-0 rounded-full border border-black/10 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
    />
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <span
      className="shrink-0 rounded-[12px] text-[14px] leading-[20px] font-normal whitespace-nowrap text-black"
      style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
    >
      {children}
    </span>
  );
}

/**
 * SliderBar — dual-handle range slider with flanking labels. The segment
 * between the two handles is filled (black); segments outside the handles
 * are dim rails. Use when a bounded range (e.g. min / max price) needs to
 * be adjusted from both ends.
 *
 * @example
 *   <SliderBar startLabel="$20" endLabel="$200" />
 */
export function SliderBar({
  startLabel = "Text",
  endLabel = "Text",
  className,
}: SliderBarProps) {
  return (
    <div
      className={`inline-flex w-[240px] items-center gap-[16px] px-[16px] py-[12px] ${className ?? ""}`}
    >
      <Label>{startLabel}</Label>
      <div className="flex flex-1 items-center">
        <span className="block h-px flex-1 bg-black/20" />
        <Handle />
        <span className="block h-px flex-1 bg-black" />
        <span className="block h-px flex-1 bg-black" />
        <Handle />
        <span className="block h-px flex-1 bg-black/20" />
      </div>
      <Label>{endLabel}</Label>
    </div>
  );
}
