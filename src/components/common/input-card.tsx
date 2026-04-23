import type { ReactNode } from "react";

export type InputCardProps = {
  /** Card-number value. Empty → placeholder "Card number". */
  cardNumber?: ReactNode;
  /** Two-digit month. Empty → placeholder "MM". */
  month?: ReactNode;
  /** Two-digit year. Empty → placeholder "YY". */
  year?: ReactNode;
  /** CVC / CVV value. Empty → placeholder "CVC". */
  cvc?: ReactNode;
  /** Leading icon. Defaults to a Phosphor-style credit-card glyph. */
  icon?: ReactNode;
  className?: string;
};

const TEXT_STYLE = { fontFeatureSettings: "'ss01' 1, 'cv01' 1" as const };

function CreditCardIcon() {
  return (
    <svg
      aria-hidden
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0"
    >
      <rect
        x="1.5"
        y="3.5"
        width="13"
        height="9"
        rx="1.5"
        stroke="black"
        strokeOpacity="0.8"
        strokeWidth="1"
      />
      <path
        d="M1.5 6.5 H14.5"
        stroke="black"
        strokeOpacity="0.8"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M4 9.75 H6"
        stroke="black"
        strokeOpacity="0.8"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * InputCard — three joined Input fields sized for a credit-card row:
 * card number (with leading icon), expiry month/year, and CVC. The two
 * shared edges collapse to single 0.5px hairlines so the trio reads as
 * one control. When a value slot is omitted, its placeholder shows at
 * black/20% (with the "/" separator in the middle field at black/10%).
 *
 * @example
 *   <InputCard />
 *   <InputCard cardNumber="4242 4242 4242 4242" month="12" year="28" cvc="123" />
 */
export function InputCard({
  cardNumber,
  month,
  year,
  cvc,
  icon,
  className,
}: InputCardProps) {
  const cell =
    "flex flex-col items-start justify-center overflow-clip bg-white/80 px-[16px] py-[12px]";

  const firstBase = `${cell} flex-1 min-w-px rounded-l-[16px] border-[0.5px] border-solid border-black/20`;
  // Middle drops its left border (shares hairline with first) — keeps top/bottom/right.
  const middleBase = `${cell} shrink-0 border-[0.5px] border-l-0 border-solid border-black/20`;
  // Last drops its left border (shares hairline with middle) — rounds trailing corners.
  const lastBase = `${cell} shrink-0 rounded-r-[16px] border-[0.5px] border-l-0 border-solid border-black/20`;

  const valueClass = "text-[14px] leading-[20px] font-normal text-black";
  const placeholderClass =
    "text-[14px] leading-[20px] font-normal text-black/20";

  return (
    <div
      className={`relative inline-flex w-[360px] items-center ${className ?? ""}`}
    >
      <div className={firstBase}>
        <div className="flex h-[20px] w-full items-center gap-[8px]">
          <span className="inline-flex items-center justify-center">
            {icon ?? <CreditCardIcon />}
          </span>
          <span
            className={`min-w-px flex-1 whitespace-nowrap ${cardNumber ? valueClass : placeholderClass}`}
            style={TEXT_STYLE}
          >
            {cardNumber ?? "Card number"}
          </span>
        </div>
      </div>

      <div className={middleBase}>
        <div className="flex h-[20px] items-center gap-[8px] whitespace-nowrap">
          <span
            className={month ? valueClass : placeholderClass}
            style={TEXT_STYLE}
          >
            {month ?? "MM"}
          </span>
          <span className="text-[14px] leading-[20px] font-normal text-black/10" style={TEXT_STYLE}>
            /
          </span>
          <span
            className={year ? valueClass : placeholderClass}
            style={TEXT_STYLE}
          >
            {year ?? "YY"}
          </span>
        </div>
      </div>

      <div className={lastBase}>
        <span
          className={`whitespace-nowrap ${cvc ? valueClass : placeholderClass}`}
          style={TEXT_STYLE}
        >
          {cvc ?? "CVC"}
        </span>
      </div>
    </div>
  );
}
