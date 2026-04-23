import type { ReactNode } from "react";

export type SearchPopupItem = {
  /** Leading visual — a 16×16 search glyph, a 24px avatar, or any ReactNode. */
  icon?: ReactNode;
  /** Primary label. */
  label: ReactNode;
  /** Trailing hint (e.g. ↩ shortcut). */
  trailing?: ReactNode;
  /** Highlight as the currently-focused item. */
  active?: boolean;
};

export type SearchPopupSection = {
  /** Section heading label. */
  label: ReactNode;
  items: SearchPopupItem[];
};

export type SearchPopupProps = {
  /** Current input value. Empty → shows the placeholder. */
  value?: ReactNode;
  placeholder?: string;
  /** If omitted, renders the Figma sample sections. */
  sections?: SearchPopupSection[];
  className?: string;
};

const TEXT_STYLE = { fontFeatureSettings: "'ss01' 1, 'cv01' 1" as const };

function SearchGlyph({ size = 16 }: { size?: number }) {
  const inset = size * 0.09;
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0"
    >
      <circle
        cx="7"
        cy="7"
        r="4.5"
        stroke="rgba(0,0,0,0.4)"
        strokeWidth={size > 20 ? 1 : 1.2}
      />
      <path
        d="M10.5 10.5 L13.5 13.5"
        stroke="rgba(0,0,0,0.4)"
        strokeWidth={size > 20 ? 1 : 1.2}
        strokeLinecap="round"
      />
      {/* padding marker so the inset reads as intentional */}
      <rect x={inset} y={inset} width={0} height={0} />
    </svg>
  );
}

function Avatar({ gradient }: { gradient: string }) {
  return (
    <span
      aria-hidden
      className="block size-6 shrink-0 overflow-clip rounded-full bg-black/[0.04]"
      style={{ background: gradient }}
    />
  );
}

const BYEWIND_AVATAR =
  "linear-gradient(135deg, #1f1f3a 0%, #3b3b5c 100%)";
const EMMA_AVATAR =
  "linear-gradient(135deg, #b899eb 0%, #ff7eb3 100%)";
const MELODY_AVATAR =
  "linear-gradient(135deg, #ffb199 0%, #e8a09a 100%)";

const SAMPLE_SECTIONS: SearchPopupSection[] = [
  {
    label: "Recent search",
    items: [
      { icon: <SearchGlyph />, label: "Landing page design" },
      {
        icon: <Avatar gradient={BYEWIND_AVATAR} />,
        label: "ByeWind",
        trailing: "↩",
        active: true,
      },
      { icon: <SearchGlyph />, label: "Text" },
    ],
  },
  {
    label: "Recently visited",
    items: [
      { icon: <SearchGlyph />, label: "Overview" },
      { icon: <SearchGlyph />, label: "Text" },
      { icon: <SearchGlyph />, label: "Text" },
    ],
  },
  {
    label: "Contacts",
    items: [
      { icon: <Avatar gradient={BYEWIND_AVATAR} />, label: "ByeWind" },
      { icon: <Avatar gradient={EMMA_AVATAR} />, label: "Emma Smith" },
      { icon: <Avatar gradient={MELODY_AVATAR} />, label: "Melody Macy" },
    ],
  },
];

function Item({ icon, label, trailing, active }: SearchPopupItem) {
  return (
    <div
      className={`flex w-full items-center gap-[8px] rounded-[16px] p-[16px] ${
        active ? "bg-black/[0.04]" : ""
      }`}
    >
      <div className="flex min-w-px flex-1 items-center gap-[8px]">
        {icon}
        <span
          className="text-[14px] leading-[20px] font-normal text-black"
          style={TEXT_STYLE}
        >
          {label}
        </span>
      </div>
      {trailing !== undefined && trailing !== null && (
        <span
          className="text-[14px] leading-[20px] font-normal text-black/40"
          style={TEXT_STYLE}
        >
          {trailing}
        </span>
      )}
    </div>
  );
}

function Section({ label, items }: SearchPopupSection) {
  return (
    <div className="flex w-full flex-col items-center justify-end gap-[4px]">
      <div className="flex w-full flex-col items-start justify-center rounded-[16px] px-[16px] py-[4px]">
        <span
          className="w-full text-[14px] leading-[20px] font-normal text-black/40"
          style={TEXT_STYLE}
        >
          {label}
        </span>
      </div>
      {items.map((item, i) => (
        <Item key={i} {...item} />
      ))}
    </div>
  );
}

/**
 * SearchPopup — command-palette-style search overlay. A 600×auto card that
 * wraps a 24px search input and any number of grouped results (recent
 * searches, recently visited pages, contacts). The surface is 90% white with
 * a 40px backdrop blur and a soft 28px drop shadow so it floats over any
 * background.
 *
 * @example
 *   <SearchPopup />
 *   <SearchPopup value="ByeWind" sections={customSections} />
 */
export function SearchPopup({
  value,
  placeholder = "Search",
  sections = SAMPLE_SECTIONS,
  className,
}: SearchPopupProps) {
  const hasValue = value !== undefined && value !== null && value !== "";
  return (
    <div
      className={`flex w-[600px] flex-col items-start rounded-[32px] bg-white/90 p-[28px] shadow-[0_8px_28px_0_rgba(0,0,0,0.1)] backdrop-blur-[40px] ${className ?? ""}`}
    >
      {/* Search bar */}
      <div className="flex w-full items-center gap-[8px] overflow-clip border-b border-solid border-black/[0.04] px-[8px] pt-[4px] pb-[24px]">
        <div className="flex min-w-px flex-1 items-center gap-[8px] rounded-[12px]">
          <span className="inline-flex size-[32px] items-center justify-center">
            <SearchGlyph size={32} />
          </span>
          <span
            className="flex items-center text-[24px] leading-[32px] font-normal whitespace-nowrap"
            style={TEXT_STYLE}
          >
            {/* Caret glyph */}
            <span className="text-black">|</span>
            <span style={{ color: hasValue ? "black" : "rgba(0,0,0,0.2)" }}>
              {hasValue ? value : placeholder}
            </span>
          </span>
        </div>
      </div>

      {/* Groups */}
      <div className="flex w-full flex-col items-center justify-end gap-[4px] py-[16px]">
        <Section {...sections[0]} />
      </div>
      {sections.slice(1, -1).map((section, i) => (
        <div
          key={i}
          className="flex w-full flex-col items-center justify-end gap-[4px] pb-[16px]"
        >
          <Section {...section} />
        </div>
      ))}
      {sections.length > 1 && (
        <div className="flex w-full flex-col items-center justify-end gap-[4px]">
          <Section {...sections[sections.length - 1]} />
        </div>
      )}
    </div>
  );
}
