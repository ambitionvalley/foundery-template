import type { MouseEvent, ReactNode } from "react";

export type SearchVariant = "gray" | "outline";
export type SearchState = "default" | "hover" | "focus";

export type SearchProps = {
  /** Gray uses a tinted surface; outline uses a bordered white surface. */
  variant?: SearchVariant;
  /** Visual state — drives surface, border, and focus halo. */
  state?: SearchState;
  /** Typed value. When set, replaces the shortcut with a clear (×) button. */
  value?: ReactNode;
  /** Placeholder shown when empty. */
  placeholder?: ReactNode;
  /** Keyboard shortcut hint (20×16 pill on the trailing edge). */
  shortcut?: ReactNode;
  onClear?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

const TEXT_STYLE = { fontFeatureSettings: "'ss01' 1, 'cv01' 1" as const };

function SearchIcon() {
  return (
    <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <circle cx="7" cy="7" r="4.5" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" />
      <path
        d="M10.5 10.5 L13.5 13.5"
        stroke="rgba(0,0,0,0.4)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function XCircle() {
  return (
    <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <circle cx="8" cy="8" r="6.5" fill="rgba(0,0,0,0.2)" />
      <path
        d="M6 6 L10 10 M10 6 L6 10"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function surfaceClasses(variant: SearchVariant, state: SearchState) {
  if (variant === "gray") {
    if (state === "hover") return "bg-black/10";
    if (state === "focus")
      return "bg-white/80 border-[0.5px] border-solid border-black/40 shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";
    return "bg-black/[0.04]";
  }
  // outline
  if (state === "hover")
    return "bg-white/80 border-[0.5px] border-solid border-black/40";
  if (state === "focus")
    return "bg-white/80 border-[0.5px] border-solid border-black/40 shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";
  return "bg-white/80 border-[0.5px] border-solid border-black/20";
}

/**
 * Search — search-input affordance. Two surfaces (gray / outline) × three
 * states (default / hover / focus). When <code>value</code> is set, the
 * trailing keyboard-shortcut hint is swapped for a clear (×) button.
 *
 * @example
 *   <Search />                               // empty gray placeholder
 *   <Search variant="outline" value="cats" onClear={clear} />
 *   <Search state="focus" value="dogs" />
 */
export function Search({
  variant = "gray",
  state = "default",
  value,
  placeholder = "Search",
  shortcut = "/",
  onClear,
  className,
}: SearchProps) {
  const hasValue = value !== undefined && value !== null && value !== "";
  const surface = surfaceClasses(variant, state);

  return (
    <div
      className={`relative inline-flex w-[160px] items-center gap-[8px] overflow-clip rounded-[16px] px-[8px] py-[4px] ${surface} ${className ?? ""}`}
    >
      <div className="flex min-w-px flex-1 flex-wrap content-center items-center gap-[8px] rounded-[12px]">
        <span className="inline-flex items-center justify-center">
          <SearchIcon />
        </span>
        <span
          className="text-[14px] leading-[20px] font-normal whitespace-nowrap"
          style={{
            ...TEXT_STYLE,
            color: hasValue ? "black" : "rgba(0,0,0,0.2)",
          }}
        >
          {hasValue ? value : placeholder}
        </span>
      </div>
      {hasValue ? (
        onClear ? (
          <button
            type="button"
            aria-label="Clear"
            onClick={onClear}
            className="inline-flex shrink-0 items-center justify-center"
          >
            <XCircle />
          </button>
        ) : (
          <span aria-hidden className="inline-flex shrink-0 items-center justify-center">
            <XCircle />
          </span>
        )
      ) : (
        <span
          aria-hidden
          className="flex w-[20px] shrink-0 flex-col items-center justify-center rounded-[4px] border-[0.5px] border-solid border-black/10 text-center text-[12px] leading-[16px] font-normal text-black/20"
          style={TEXT_STYLE}
        >
          {shortcut}
        </span>
      )}
    </div>
  );
}
