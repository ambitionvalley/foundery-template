import type { MouseEvent, ReactNode } from "react";

export type CardState = "default" | "hover" | "selected" | "static";

export type CardProps = {
  /** Border + indicator — default/static have no border, hover adds a hairline, selected uses a solid black border + filled radio. */
  state?: CardState;
  /** Stack children vertically (120 wide) or side-by-side (160 wide). */
  vertical?: boolean;
  /** Render N placeholder "Text" lines (1–4). Useful for Figma-parity previews. */
  count?: 1 | 2 | 3 | 4;
  /** Arbitrary card content. Overrides `count`. */
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

const TEXT_STYLE = { fontFeatureSettings: "'ss01' 1, 'cv01' 1" as const };

function RadioIcon({ selected }: { selected: boolean }) {
  return (
    <svg
      aria-hidden
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <circle
        cx="12"
        cy="12"
        r="10.5"
        fill={selected ? "black" : "none"}
        stroke={selected ? "none" : "rgba(0,0,0,0.4)"}
        strokeWidth="1"
      />
      {selected && <circle cx="12" cy="12" r="3.5" fill="white" />}
    </svg>
  );
}

function Line({
  vertical,
  children,
}: {
  vertical: boolean;
  children: ReactNode;
}) {
  return (
    <span
      className={`flex flex-col items-start justify-center rounded-[12px] ${
        vertical ? "w-full shrink-0" : "min-w-px flex-[1_0_0]"
      }`}
    >
      <span
        className="w-full text-[14px] leading-[20px] font-normal text-black"
        style={TEXT_STYLE}
      >
        {children}
      </span>
    </span>
  );
}

/**
 * Card — selectable content card. Four states (default, hover, selected,
 * static) × horizontal or vertical layout. Hover shows a hairline border
 * plus a hollow radio; selected uses a solid black border plus a filled
 * radio with a white inner dot.
 *
 * @example
 *   <Card state="selected" count={3} />
 *   <Card state="hover" vertical={false} count={2} />
 */
export function Card({
  state = "default",
  vertical = true,
  count = 1,
  children,
  onClick,
  className,
}: CardProps) {
  const isHover = state === "hover";
  const isSelected = state === "selected";

  const border = isSelected
    ? "border border-solid border-black"
    : isHover
      ? "border-[0.5px] border-solid border-black/40"
      : "";

  const layout = vertical
    ? `flex-col items-start ${count > 1 ? "gap-[4px]" : ""}`
    : "flex items-start gap-[4px]";

  const width = vertical ? "w-[120px]" : "w-[160px]";

  const lines =
    children ??
    Array.from({ length: count }).map((_, i) => (
      <Line key={i} vertical={vertical}>
        Text
      </Line>
    ));

  const content = (
    <>
      {lines}
      {(isHover || isSelected) && (
        <span
          className="absolute flex items-center justify-center"
          style={{
            right: isHover ? 11.5 : 11,
            top: isHover ? 11.5 : 11,
          }}
        >
          <RadioIcon selected={isSelected} />
        </span>
      )}
    </>
  );

  const classes = `relative flex overflow-hidden bg-white/80 px-[16px] py-[12px] rounded-[16px] ${layout} ${width} ${border} ${className ?? ""}`;

  if (onClick || isHover || isSelected) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={isSelected || undefined}
        className={`${classes} cursor-pointer text-left`}
      >
        {content}
      </button>
    );
  }
  return <div className={classes}>{content}</div>;
}
