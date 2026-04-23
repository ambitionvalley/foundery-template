import type { ReactNode } from "react";

export type InputThreeProps = {
  /** Stack the three fields vertically instead of side-by-side. */
  vertical?: boolean;
  /** Render the hover-revealed action button at the trailing edge. */
  hover?: boolean;
  /** Leading / top field value. */
  firstValue?: ReactNode;
  /** Middle field value. */
  secondValue?: ReactNode;
  /** Trailing / bottom field value. */
  thirdValue?: ReactNode;
  /** Hover action. Falls back to a 16×16 dashed icon placeholder. */
  action?: ReactNode;
  className?: string;
};

const TEXT_STYLE = { fontFeatureSettings: "'ss01' 1, 'cv01' 1" as const };

function DefaultIcon() {
  return (
    <span
      aria-hidden
      className="block size-4 shrink-0 rounded-[4px] border-[0.5px] border-dashed border-black/80 bg-black/[0.04]"
    />
  );
}

function ActionButton({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex min-h-[24px] min-w-[24px] items-center justify-center gap-[4px] rounded-[12px] p-[4px]">
      <span className="inline-flex items-center justify-center">
        {children}
      </span>
    </span>
  );
}

function Value({ children }: { children: ReactNode }) {
  return (
    <span
      className="w-full text-[14px] leading-[20px] font-normal text-black"
      style={TEXT_STYLE}
    >
      {children}
    </span>
  );
}

/**
 * InputThree — three joined Input fields, horizontal or vertical. The two
 * shared edges collapse to single hairlines. Use for tightly-coupled triples
 * like day / month / year, area / prefix / line, or range with midpoint.
 *
 * @example
 *   <InputThree firstValue="12" secondValue="04" thirdValue="2026" />
 */
export function InputThree({
  vertical = false,
  hover = false,
  firstValue = "Text",
  secondValue = "Text",
  thirdValue = "Text",
  action,
  className,
}: InputThreeProps) {
  const cell = "flex flex-col items-start justify-center overflow-clip bg-white/80 px-[16px] py-[12px]";

  const firstBase = `${cell} border-[0.5px] border-solid border-black/20`;
  const firstRounded = vertical
    ? "rounded-t-[16px] w-full shrink-0"
    : "rounded-l-[16px] flex-1 min-w-px";

  // Middle and last drop the border on the side facing the previous cell.
  const middleBase = vertical
    ? `${cell} border-[0.5px] border-t-0 border-solid border-black/20 w-full shrink-0`
    : `${cell} border-[0.5px] border-l-0 border-solid border-black/20 flex-1 min-w-px`;

  const lastBase = vertical
    ? `${cell} border-[0.5px] border-t-0 border-solid border-black/20 rounded-b-[16px] w-full shrink-0`
    : `${cell} border-[0.5px] border-l-0 border-solid border-black/20 rounded-r-[16px] flex-1 min-w-px`;

  const hoverButtonPos = vertical
    ? "right-[14px] bottom-[14px]"
    : "right-[14px] top-1/2 -translate-y-1/2";

  return (
    <div
      className={`relative inline-flex w-[360px] ${vertical ? "flex-col items-start" : "items-center"} ${className ?? ""}`}
    >
      <div className={`${firstBase} ${firstRounded}`}>
        <Value>{firstValue}</Value>
      </div>
      <div className={middleBase}>
        <Value>{secondValue}</Value>
      </div>
      <div className={lastBase}>
        <Value>{thirdValue}</Value>
      </div>
      {hover && (
        <div className={`absolute ${hoverButtonPos}`}>
          <ActionButton>{action ?? <DefaultIcon />}</ActionButton>
        </div>
      )}
    </div>
  );
}
