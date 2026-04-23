import type { ReactNode } from "react";

export type InputTwoProps = {
  /** Stack the two fields vertically instead of side-by-side. */
  vertical?: boolean;
  /** Render the hover-revealed action button at the trailing edge. */
  hover?: boolean;
  /** Leading (or top) field value. */
  firstValue?: ReactNode;
  /** Trailing (or bottom) field value. */
  secondValue?: ReactNode;
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

/**
 * InputTwo — two joined Input fields, horizontal or vertical. The shared edge
 * renders as a single hairline (no double-border) so the pair reads as a
 * single control. When <code>hover</code> is set, a small trailing action
 * button is revealed at the edge of the second field.
 *
 * @example
 *   <InputTwo firstValue="Jane" secondValue="Doe" />
 *   <InputTwo vertical firstValue="Address line 1" secondValue="Address line 2" />
 */
export function InputTwo({
  vertical = false,
  hover = false,
  firstValue = "Text",
  secondValue = "Text",
  action,
  className,
}: InputTwoProps) {
  // First field always has a full border; its rounded corners hug the leading side.
  const firstBase =
    "flex flex-col items-start justify-center overflow-clip border-[0.5px] border-solid border-black/20 bg-white/80 px-[16px] py-[12px]";
  const firstRounded = vertical
    ? "rounded-t-[16px] w-full shrink-0"
    : "rounded-l-[16px] flex-1 min-w-px";

  // Second field: no border on the side facing the first (to avoid doubling).
  const secondBase = vertical
    ? "flex flex-col items-start justify-center overflow-clip border-[0.5px] border-t-0 border-solid border-black/20 bg-white/80 px-[16px] py-[12px] rounded-b-[16px] w-full shrink-0"
    : "flex flex-col items-start justify-center overflow-clip border-[0.5px] border-l-0 border-solid border-black/20 bg-white/80 px-[16px] py-[12px] rounded-r-[16px] flex-1 min-w-px";

  const hoverButtonPos = vertical
    ? "right-[14px] bottom-[14px]"
    : "right-[14px] top-1/2 -translate-y-1/2";

  return (
    <div
      className={`relative inline-flex w-[360px] ${vertical ? "flex-col items-start" : "items-center"} ${className ?? ""}`}
    >
      <div className={`${firstBase} ${firstRounded}`}>
        <span
          className="w-full text-[14px] leading-[20px] font-normal text-black"
          style={TEXT_STYLE}
        >
          {firstValue}
        </span>
      </div>
      <div className={secondBase}>
        <span
          className="w-full text-[14px] leading-[20px] font-normal text-black"
          style={TEXT_STYLE}
        >
          {secondValue}
        </span>
      </div>
      {hover && (
        <div className={`absolute ${hoverButtonPos}`}>
          <ActionButton>{action ?? <DefaultIcon />}</ActionButton>
        </div>
      )}
    </div>
  );
}
