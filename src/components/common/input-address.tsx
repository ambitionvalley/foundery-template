import type { ReactNode } from "react";

export type InputAddressProps = {
  /** Country value (shown with a chevron-up-down affordance). */
  country?: ReactNode;
  /** Street address line. Pass a string to render as a placeholder. */
  address?: ReactNode;
  /** State / region (shown with a chevron-up-down affordance). */
  state?: ReactNode;
  /** City value. Pass a string to render as a placeholder. */
  city?: ReactNode;
  /** ZIP / postal code. Pass a string to render as a placeholder. */
  zip?: ReactNode;
  className?: string;
};

const TEXT_STYLE = { fontFeatureSettings: "'ss01' 1, 'cv01' 1" as const };

function ChevronUpDown() {
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
        d="M4.5 6 L8 2.5 L11.5 6"
        stroke="black"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 10 L8 13.5 L11.5 10"
        stroke="black"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Value({
  children,
  placeholder,
}: {
  children?: ReactNode;
  placeholder?: string;
}) {
  const isPlaceholder = children === undefined || children === null;
  return (
    <span
      className="w-full text-[14px] leading-[20px] font-normal"
      style={{ ...TEXT_STYLE, color: isPlaceholder ? "rgba(0,0,0,0.2)" : "black" }}
    >
      {isPlaceholder ? placeholder : children}
    </span>
  );
}

/**
 * InputAddress — stacked address form with four joined rows: country,
 * street, state, and a split city / ZIP row. All edges coalesce to single
 * 0.5px hairlines, and the country + state rows expose a chevron-up-down
 * affordance to signal they&apos;re selectable.
 *
 * @example
 *   <InputAddress
 *     country="United States"
 *     address="500 Folsom St"
 *     state="California"
 *     city="San Francisco"
 *     zip="94107"
 *   />
 */
export function InputAddress({
  country = "United States",
  address,
  state = "State",
  city,
  zip,
  className,
}: InputAddressProps) {
  const cell =
    "flex flex-col items-start justify-center overflow-clip bg-white/80 px-[16px] py-[12px]";

  return (
    <div
      className={`relative inline-flex w-[360px] flex-col items-end ${className ?? ""}`}
    >
      <div
        className={`${cell} w-full shrink-0 rounded-t-[16px] border-[0.5px] border-solid border-black/20`}
      >
        <div className="flex w-full flex-wrap content-center items-center gap-[8px] rounded-[12px]">
          <span className="min-w-px flex-1">
            <Value>{country}</Value>
          </span>
          <span className="inline-flex items-center justify-center">
            <ChevronUpDown />
          </span>
        </div>
      </div>
      <div
        className={`${cell} w-full shrink-0 border-x-[0.5px] border-solid border-black/20`}
      >
        <Value placeholder="Address">{address}</Value>
      </div>
      <div
        className={`${cell} w-full shrink-0 border-x-[0.5px] border-t-[0.5px] border-solid border-black/20`}
      >
        <div className="flex w-full flex-wrap content-center items-center gap-[8px] rounded-[12px]">
          <span className="min-w-px flex-1">
            <Value>{state}</Value>
          </span>
          <span className="inline-flex items-center justify-center">
            <ChevronUpDown />
          </span>
        </div>
      </div>
      <div className="flex w-full shrink-0 items-center">
        <div
          className={`${cell} min-w-px flex-1 rounded-bl-[16px] border-[0.5px] border-solid border-black/20`}
        >
          <Value placeholder="City">{city}</Value>
        </div>
        <div
          className={`${cell} min-w-px flex-1 rounded-br-[16px] border-y-[0.5px] border-r-[0.5px] border-solid border-black/20`}
        >
          <Value placeholder="ZIP">{zip}</Value>
        </div>
      </div>
    </div>
  );
}
