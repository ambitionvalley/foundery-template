import type { MouseEvent, ReactNode } from "react";

export type TagVariant = "default" | "left-arrow" | "right-arrow";

export type TagProps = {
  /** `default` is a rounded pill. `left-arrow` / `right-arrow` add a triangular tip. */
  variant?: TagVariant;
  /** Leading round dot (default variant only). */
  leadingDot?: boolean;
  /** Trailing close × (default variant only). Pass `onClose` to make it a button. */
  trailingClose?: boolean;
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Force hover styling (for the showcase). */
  hover?: boolean;
  children?: ReactNode;
  className?: string;
};

const TEXT_STYLE = { fontFeatureSettings: "'ss01' 1, 'cv01' 1" as const };
const BG_DEFAULT = "rgba(0,0,0,0.04)";
const BG_HOVER = "rgba(0,0,0,0.1)";

function Dot() {
  return (
    <span aria-hidden className="flex size-3 shrink-0 items-center justify-center">
      <span className="size-[4.5px] rounded-full bg-black" />
    </span>
  );
}

function CloseGlyph() {
  return (
    <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M3.24 3.24L8.76 8.76M8.76 3.24L3.24 8.76"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseSlot({ onClose }: { onClose?: (e: MouseEvent<HTMLButtonElement>) => void }) {
  if (onClose) {
    return (
      <button
        type="button"
        aria-label="Remove"
        onClick={onClose}
        className="flex size-3 shrink-0 cursor-pointer items-center justify-center text-black focus-visible:outline-none"
      >
        <CloseGlyph />
      </button>
    );
  }
  return (
    <span aria-hidden className="flex size-3 shrink-0 items-center justify-center text-black">
      <CloseGlyph />
    </span>
  );
}

/**
 * Tag — inline pill label.
 *
 * Default variant: rounded 8px pill with optional leading dot and/or trailing ×.
 * Arrow variants: same pill + a 14.878×20 triangular tip on one side (step-flow chip).
 *
 * Surface is 4% black by default, 10% on hover.
 *
 * @example
 *   <Tag>Draft</Tag>
 *   <Tag leadingDot>Live</Tag>
 *   <Tag trailingClose onClose={remove}>Frontend</Tag>
 *   <Tag variant="right-arrow">Step 1</Tag>
 */
export function Tag({
  variant = "default",
  leadingDot = false,
  trailingClose = false,
  onClose,
  hover = false,
  children = "Tag",
  className,
}: TagProps) {
  const bg = hover ? BG_HOVER : BG_DEFAULT;

  if (variant === "left-arrow" || variant === "right-arrow") {
    return (
      <ArrowTag direction={variant} bg={bg} hover={hover} className={className}>
        {children}
      </ArrowTag>
    );
  }

  let padding = "px-[8px]";
  if (leadingDot && trailingClose) padding = "px-[4px]";
  else if (leadingDot) padding = "pl-[4px] pr-[8px]";
  else if (trailingClose) padding = "pl-[8px] pr-[4px]";

  return (
    <span
      className={`inline-flex h-5 items-center rounded-[8px] py-[2px] transition-colors ${padding} ${
        hover ? "" : "hover:[background:rgba(0,0,0,0.1)]"
      } ${className ?? ""}`}
      style={{ background: bg }}
    >
      {leadingDot && <Dot />}
      <span
        className="text-[12px] leading-[16px] font-normal whitespace-nowrap text-black"
        style={TEXT_STYLE}
      >
        {children}
      </span>
      {trailingClose && <CloseSlot onClose={onClose} />}
    </span>
  );
}

function ArrowTag({
  direction,
  bg,
  hover,
  children,
  className,
}: {
  direction: "left-arrow" | "right-arrow";
  bg: string;
  hover: boolean;
  children: ReactNode;
  className?: string;
}) {
  const isRight = direction === "right-arrow";

  const pill = (
    <span
      className={`inline-flex h-5 items-center py-[2px] ${
        isRight ? "rounded-l-[8px] pl-[8px] pr-[4px]" : "rounded-r-[8px] pr-[8px] pl-[4px]"
      }`}
      style={{ background: bg }}
    >
      <span
        className="text-[12px] leading-[16px] font-normal whitespace-nowrap text-black"
        style={TEXT_STYLE}
      >
        {children}
      </span>
    </span>
  );

  const arrow = (
    <svg
      aria-hidden
      width="14.878"
      height="20"
      viewBox="0 0 14.878 20"
      className="block shrink-0"
    >
      <path
        d={isRight ? "M0 0L14.878 10L0 20Z" : "M14.878 0L0 10L14.878 20Z"}
        fill={bg}
      />
    </svg>
  );

  return (
    <span
      className={`inline-flex items-center ${
        hover ? "" : "[&:hover_span]:[background:rgba(0,0,0,0.1)] [&:hover_path]:[fill:rgba(0,0,0,0.1)]"
      } ${className ?? ""}`}
    >
      {isRight ? (
        <>
          {pill}
          {arrow}
        </>
      ) : (
        <>
          {arrow}
          {pill}
        </>
      )}
    </span>
  );
}
