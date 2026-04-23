import type { ReactNode } from "react";

export type InputType =
  | "1-row"
  | "2-row-vertical"
  | "2-row-horizontal"
  | "textarea";

export type InputState = "default" | "hover" | "focus";

export type InputProps = {
  /** Layout: single value, stacked title/value, side-by-side, or multi-line. */
  type?: InputType;
  /** Visual state — drives border + focus ring. */
  state?: InputState;
  /** Small title label (for 2-row layouts). */
  title?: ReactNode;
  /** Value text rendered inside the field. */
  children?: ReactNode;
  /** Character-count suffix for textarea (e.g. "0/200"). */
  counter?: ReactNode;
  className?: string;
};

const TEXT_STYLE = { fontFeatureSettings: "'ss01' 1, 'cv01' 1" as const };

function borderClass(state: InputState) {
  if (state === "default") return "border-black/20";
  return "border-black/40";
}

function ResizeCorner() {
  return (
    <svg
      aria-hidden
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M12 6 V12 H6"
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 9 L9 12"
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Input — text-input field primitive covering four layouts and three states.
 * Surface is translucent white (80%) with a hairline border; focus adds a
 * 4px black-4% halo. Textarea adds a trailing character counter and a
 * resize-corner affordance.
 *
 * @example
 *   <Input>Jane</Input>
 *   <Input title="Email">jane@intakely.com</Input>
 *   <Input type="textarea" counter="12/200">Describe the issue…</Input>
 */
export function Input({
  type = "2-row-vertical",
  state = "default",
  title = "Title",
  children = "Text",
  counter = "0/200",
  className,
}: InputProps) {
  const border = borderClass(state);
  const focusShadow =
    state === "focus" ? "shadow-[0_0_0_4px_rgba(0,0,0,0.04)]" : "";

  const base = `relative inline-flex w-[120px] overflow-clip rounded-[16px] border-[0.5px] border-solid bg-white/80 px-[16px] py-[12px] ${border} ${focusShadow} ${className ?? ""}`;

  const titleEl = (
    <span
      className="text-[12px] leading-[16px] font-normal whitespace-nowrap text-black/40"
      style={TEXT_STYLE}
    >
      {title}
    </span>
  );

  const valueEl = (
    <span
      className="text-[14px] leading-[20px] font-normal text-black"
      style={TEXT_STYLE}
    >
      {children}
    </span>
  );

  if (type === "2-row-vertical") {
    return (
      <div className={`${base} flex-col items-start justify-center gap-[4px]`}>
        <span className="w-full">{titleEl}</span>
        <span className="w-full">{valueEl}</span>
      </div>
    );
  }

  if (type === "2-row-horizontal") {
    return (
      <div className={`${base} items-center gap-[8px]`}>
        <span className="shrink-0">{titleEl}</span>
        <span className="min-w-px flex-1 text-right">
          <span className="text-[14px] leading-[20px] font-normal text-black" style={TEXT_STYLE}>
            {children}
          </span>
        </span>
      </div>
    );
  }

  if (type === "1-row") {
    return (
      <div className={`${base} flex-col items-start justify-center`}>
        <span className="w-full">{valueEl}</span>
      </div>
    );
  }

  // textarea
  return (
    <div className={`${base} flex-col items-start`}>
      <span className="w-full">{valueEl}</span>
      <span className="absolute right-[-0.5px] bottom-[3.5px] inline-flex items-center gap-[8px] pr-[0.5px]">
        <span
          className="text-right text-[12px] leading-[16px] font-normal whitespace-nowrap text-black/20"
          style={TEXT_STYLE}
        >
          {counter}
        </span>
        <ResizeCorner />
      </span>
    </div>
  );
}
