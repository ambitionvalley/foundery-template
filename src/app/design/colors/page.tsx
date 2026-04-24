import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { brand } from "@/config/brand";

type IntroRow = {
  title: string;
  body: ReactNode;
  divider?: "hairline" | "emphasis";
};

const introRows: IntroRow[] = [
  {
    title: "Introduction",
    body: (
      <>
        <p>Colors are a key part of the design system.</p>
        <p>
          To define Colors, we have the following principles: 1. Widely used in
          design. 2. The number of Colors should be as small as possible.
        </p>
        <p>
          The color in {brand.name} has two parts, the color in the Themes variable
          and the Color styles. Their difference is: when switching between
          light and dark mode, the color in the Themes variable will change,
          but the color in the Color styles will remain unchanged.
        </p>
      </>
    ),
  },
  {
    title: "Rules of use",
    body: (
      <>
        <p>Please try to keep the number of Colors below 32.</p>
        <p>
          90% principle: If the color used in a single product accounts for
          less than 10%, please do not include it in the design system.
        </p>
      </>
    ),
  },
  {
    title: "How to use",
    divider: "emphasis",
    body: (
      <p>
        Colors can be added, modified and deleted. Modifying them will affect
        all components and pages, please proceed with caution.
      </p>
    ),
  },
];

const THEMES = ["Light", "Dark", "iOS-Light", "iOS-Dark"] as const;
type Theme = (typeof THEMES)[number];
const SELECTED_THEMES: ReadonlyArray<Theme> = ["Dark", "iOS-Dark"];

type Swatch = {
  label: string;
  bg: string;
  fg?: "black" | "white";
  border?: boolean;
};

type ColorSection = {
  title: string;
  columns: Record<Theme, Swatch[]>;
  divider?: "none" | "emphasis";
  firstSwatchEmphasis?: boolean;
};

const primary: ColorSection = {
  title: "Primary",
  firstSwatchEmphasis: true,
  columns: {
    "Light": [
      { label: "Primary", bg: "#000000", fg: "white", border: true },
      { label: "Color 1", bg: "#edeefc", fg: "black" },
      { label: "Color 2", bg: "#e6f1fd", fg: "black" },
    ],
    "Dark": [
      { label: "Primary", bg: "#adadfb", fg: "white" },
      { label: "Color 1", bg: "#edeefc", fg: "black" },
      { label: "Color 2", bg: "#e6f1fd", fg: "black" },
    ],
    "iOS-Light": [
      { label: "Primary", bg: "#007aff", fg: "white" },
      { label: "Color 1", bg: "#e7e7ee", fg: "black" },
      { label: "Color 2", bg: "#e7ebf5", fg: "black" },
    ],
    "iOS-Dark": [
      { label: "Primary", bg: "#0a84ff", fg: "white" },
      { label: "Color 1", bg: "#e7e7ee", fg: "black" },
      { label: "Color 2", bg: "#e7ebf5", fg: "black" },
    ],
  },
};

function blackScale(): Swatch[] {
  const levels: [string, string][] = [
    ["Black 100%", "#000000"],
    ["Black 80%", "rgba(0,0,0,0.8)"],
    ["Black 40%", "rgba(0,0,0,0.4)"],
    ["Black 20%", "rgba(0,0,0,0.2)"],
    ["Black 10%", "rgba(0,0,0,0.1)"],
    ["Black 4%", "rgba(0,0,0,0.04)"],
  ];
  return levels.map(([label, bg]) => ({ label, bg, fg: "white", border: true }));
}

function whiteOnDarkScale(): Swatch[] {
  // When the theme is dark, the "Black" row shows white tokens over a dark backdrop
  const levels: [string, string][] = [
    ["White 100%", "#ffffff"],
    ["White 80%", "rgba(255,255,255,0.8)"],
    ["White 40%", "rgba(255,255,255,0.4)"],
    ["White 20%", "rgba(255,255,255,0.2)"],
    ["White 15%", "rgba(255,255,255,0.15)"],
    ["White 10%", "rgba(255,255,255,0.1)"],
  ];
  return levels.map(([label, bg]) => ({ label, bg, fg: "black", border: true }));
}

function whiteScale(): Swatch[] {
  const levels: [string, string][] = [
    ["White 100%", "#ffffff"],
    ["White 80%", "rgba(255,255,255,0.8)"],
    ["White 40%", "rgba(255,255,255,0.4)"],
    ["White 20%", "rgba(255,255,255,0.2)"],
    ["White 10%", "rgba(255,255,255,0.1)"],
    ["White 4%", "rgba(255,255,255,0.04)"],
  ];
  return levels.map(([label, bg]) => ({ label, bg, fg: "black", border: true }));
}

function blackOnLightScale(): Swatch[] {
  const levels: [string, string][] = [
    ["Black 100%", "#000000"],
    ["Black 80%", "rgba(0,0,0,0.8)"],
    ["Black 40%", "rgba(0,0,0,0.4)"],
    ["Black 20%", "rgba(0,0,0,0.2)"],
    ["Black 15%", "rgba(0,0,0,0.15)"],
    ["Black 10%", "rgba(0,0,0,0.1)"],
  ];
  return levels.map(([label, bg]) => ({ label, bg, fg: "white", border: true }));
}

const black: ColorSection = {
  title: "Black",
  columns: {
    "Light": blackScale(),
    "Dark": whiteOnDarkScale(),
    "iOS-Light": blackScale(),
    "iOS-Dark": whiteOnDarkScale(),
  },
};

const white: ColorSection = {
  title: "White",
  columns: {
    "Light": whiteScale(),
    "Dark": blackOnLightScale(),
    "iOS-Light": whiteScale(),
    "iOS-Dark": blackOnLightScale(),
  },
};

const secondaryLabels = [
  "Purple",
  "Indigo",
  "Blue",
  "Cyan",
  "Mint",
  "Green",
  "Yellow",
  "Orange",
  "Red",
];

function secondaryCol(values: string[]): Swatch[] {
  return secondaryLabels.map((label, i) => ({
    label,
    bg: values[i],
    fg: "white",
  }));
}

const secondary: ColorSection = {
  title: "secondary",
  columns: {
    "Light": secondaryCol([
      "#b899eb",
      "#adadfb",
      "#7dbbff",
      "#a0bce8",
      "#6be6d3",
      "#71dd8c",
      "#ffcc00",
      "#ffb55b",
      "#ff4747",
    ]),
    "Dark": secondaryCol([
      "#b899eb",
      "#adadfb",
      "#7dbbff",
      "#a0bce8",
      "#6be6d3",
      "#71dd8c",
      "#ffcc00",
      "#ffb55b",
      "#ff4747",
    ]),
    "iOS-Light": secondaryCol([
      "#af52de",
      "#5856d6",
      "#007aff",
      "#32ade6",
      "#00c7be",
      "#34c759",
      "#ffcc00",
      "#ff9500",
      "#ff3b30",
    ]),
    "iOS-Dark": secondaryCol([
      "#bf5af2",
      "#5e5ce6",
      "#0a84ff",
      "#64d2ff",
      "#63e6e2",
      "#30d158",
      "#ffd60a",
      "#ff9f0a",
      "#ff453a",
    ]),
  },
};

const background: ColorSection = {
  title: "Background",
  columns: {
    "Light": [
      { label: "Background 1", bg: "#ffffff", fg: "black", border: true },
      { label: "Background 2", bg: "#f9f9fa", fg: "black", border: true },
      { label: "Background 3", bg: "rgba(255,255,255,0.9)", fg: "black", border: true },
    ],
    "Dark": [
      { label: "Background 1", bg: "#333333", fg: "white" },
      { label: "Background 2", bg: "rgba(255,255,255,0.04)", fg: "black", border: true },
      { label: "Background 3", bg: "rgba(64,64,64,0.9)", fg: "white" },
    ],
    "iOS-Light": [
      { label: "Background 1", bg: "#f5f5f6", fg: "black" },
      { label: "Background 2", bg: "#ffffff", fg: "black", border: true },
      { label: "Background 3", bg: "rgba(255,255,255,0.9)", fg: "black", border: true },
    ],
    "iOS-Dark": [
      { label: "Background 1", bg: "#333333", fg: "white", border: true },
      { label: "Background 2", bg: "rgba(255,255,255,0.04)", fg: "black", border: true },
      { label: "Background 3", bg: "rgba(64,64,64,0.9)", fg: "white" },
    ],
  },
};

const surface: ColorSection = {
  title: "Surface",
  divider: "none",
  columns: {
    "Light": [
      { label: "Surface 1", bg: "#ffffff", fg: "black", border: true },
      { label: "Surface 2", bg: "#f5f5f6", fg: "black", border: true },
      { label: "Surface 3", bg: "#ffffff", fg: "black", border: true },
    ],
    "Dark": [
      { label: "Surface 1", bg: "rgba(255,255,255,0.1)", fg: "black", border: true },
      { label: "Surface 2", bg: "rgba(255,255,255,0.04)", fg: "black", border: true },
      { label: "Surface 3", bg: "rgba(255,255,255,0.1)", fg: "black", border: true },
    ],
    "iOS-Light": [
      { label: "Surface 1", bg: "#ffffff", fg: "black", border: true },
      { label: "Surface 2", bg: "#f5f5f6", fg: "black", border: true },
      { label: "Surface 3", bg: "#ffffff", fg: "black", border: true },
    ],
    "iOS-Dark": [
      { label: "Surface 1", bg: "rgba(255,255,255,0.1)", fg: "black", border: true },
      { label: "Surface 2", bg: "rgba(255,255,255,0.04)", fg: "black", border: true },
      { label: "Surface 3", bg: "rgba(255,255,255,0.1)", fg: "black", border: true },
    ],
  },
};

const colorSections: ColorSection[] = [
  primary,
  black,
  white,
  secondary,
  background,
  surface,
];

function IntroRowItem({
  row,
  isLast,
}: {
  row: IntroRow;
  isLast: boolean;
}) {
  const verticalPadding =
    row.divider === "emphasis"
      ? "pt-[28px] pb-[48px]"
      : isLast
        ? "py-[28px]"
        : "py-[28px]";

  const borderColor =
    row.divider === "emphasis" ? "border-b-black/80" : "border-b-black/10";

  return (
    <section
      className={`flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b ${verticalPadding} ${borderColor}`}
    >
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-center">
        <h2
          className="text-[24px] leading-[32px] font-normal text-[#adadfb]"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          {row.title}
        </h2>
      </div>
      <div className="flex min-w-[358px] flex-1 flex-col justify-center">
        <div
          className="flex flex-col text-[14px] leading-[20px] text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          {row.body}
        </div>
      </div>
    </section>
  );
}

function ThemeSelectorRow() {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 pt-[48px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1" />
      <div className="flex min-w-[358px] flex-1 items-start gap-[8px]">
        {THEMES.map((theme) => {
          const selected = SELECTED_THEMES.includes(theme);
          return (
            <div
              key={theme}
              className="flex flex-1 flex-wrap items-center justify-center gap-y-2 rounded-[8px]"
            >
              <div className="flex size-[40px] items-center justify-center">
                <span
                  aria-hidden
                  className={`block size-[16px] rounded-full border ${
                    selected
                      ? "border-black bg-black/0"
                      : "border-black/40 bg-transparent"
                  } relative`}
                >
                  {selected && (
                    <span className="absolute top-1/2 left-1/2 block size-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
                  )}
                </span>
              </div>
              <span
                className="text-[14px] leading-[20px] text-black"
                style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
              >
                {theme}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SwatchCard({
  swatch,
  emphasis = false,
}: {
  swatch: Swatch;
  emphasis?: boolean;
}) {
  const base =
    "flex w-full flex-col items-start justify-center rounded-[16px] p-[20px]";
  const height = emphasis ? "h-[60px]" : "";
  const border = swatch.border ? "border border-white/100" : "";

  const borderStyle =
    swatch.border && swatch.bg === "#000000"
      ? { border: "1px solid #ffffff" }
      : swatch.border &&
          (swatch.bg === "#ffffff" ||
            swatch.bg.startsWith("rgba(255,255,255") ||
            swatch.bg === "#f9f9fa" ||
            swatch.bg === "#f5f5f6")
        ? { border: "1px solid rgba(0,0,0,0.1)" }
        : swatch.border
          ? { border: "1px solid rgba(0,0,0,0.1)" }
          : {};

  return (
    <div
      className={`${base} ${height} ${border}`}
      style={{ background: swatch.bg, ...borderStyle }}
    >
      <p
        className={`w-full text-center text-[14px] leading-[20px] ${
          swatch.fg === "black" ? "text-black" : "text-white"
        }`}
        style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
      >
        {swatch.label}
      </p>
    </div>
  );
}

function ColorSectionRow({ section }: { section: ColorSection }) {
  const showBorder = section.divider !== "none";
  return (
    <section
      className={`flex w-full flex-wrap items-start gap-x-1 gap-y-4 py-[28px] ${
        showBorder ? "border-b border-b-black/10" : ""
      }`}
    >
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          {section.title}
        </h2>
      </div>
      <div className="flex min-w-[358px] flex-1 items-start gap-[28px]">
        {THEMES.map((theme) => (
          <div key={theme} className="flex min-w-0 flex-1 flex-col gap-[8px]">
            {section.columns[theme].map((swatch, i) => (
              <SwatchCard
                key={`${theme}-${i}-${swatch.label}`}
                swatch={swatch}
                emphasis={section.firstSwatchEmphasis && i === 0}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ColorsPage() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-4 sm:p-8 lg:p-12">
      <article className="flex w-full max-w-[1440px] flex-col overflow-hidden rounded-[40px] bg-white p-[28px]">
        <header className="flex flex-wrap items-start justify-between gap-6 rounded-[28px] bg-[#f9f9fa] p-[40px]">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <h1
              className="text-[48px] font-semibold leading-[56px] tracking-[0] text-black"
              style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
            >
              Colors
            </h1>
            <p className="text-[14px] leading-[20px] text-black/40">
              <a
                className="cursor-pointer hover:underline"
                href={brand.url}
                target="_blank"
                rel="noreferrer"
              >
                Design docs
              </a>
              <span className="ml-0.5">↗</span>
            </p>
          </div>
          <BrandLogo priority />
        </header>

        <div className="flex flex-col px-[40px]">
          {introRows.map((row, idx) => (
            <IntroRowItem
              key={row.title}
              row={row}
              isLast={idx === introRows.length - 1}
            />
          ))}

          <ThemeSelectorRow />

          {colorSections.map((section) => (
            <ColorSectionRow key={section.title} section={section} />
          ))}
        </div>
      </article>
    </div>
  );
}

