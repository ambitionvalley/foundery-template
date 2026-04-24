import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { brand } from "@/config/brand";

type DocRow = {
  title: string;
  body: ReactNode;
  accent?: boolean;
  divider?: "hairline" | "emphasis" | "none";
  padding?: "default" | "spacer-top";
};

const docRows: DocRow[] = [
  {
    title: "Introduction",
    accent: true,
    body: (
      <>
        <p>
          Spacing, Icon size, Corner radius are key parts of the design system,
          you can find them in variables.
        </p>
        <p>
          To define them, we have the following principles: 1. Widely used in
          design. 2. The number of Spacing, Icon size, and Corner radius should
          be as small as possible.
        </p>
      </>
    ),
  },
  {
    title: "Rules of use",
    accent: true,
    body: (
      <>
        <p>
          Please try to keep the number of Spacing, Icon size, and Corner
          radius below 16.
        </p>
        <p>
          90% principle: If Spacing, Icon size, Corner radius used in a single
          product accounts for less than 10%, please do not include it in the
          design system.
        </p>
        <p>Their values are multiples of 4.</p>
      </>
    ),
  },
  {
    title: "How to use",
    accent: true,
    divider: "emphasis",
    body: (
      <p>
        Spacing, Icon size, Corner radius can be added, modified and deleted.
        Modifying them will affect all components and pages, please proceed
        with caution.
      </p>
    ),
  },
  {
    title: "Notes",
    divider: "none",
    padding: "spacer-top",
    body: (
      <>
        <p>A dashed border indicates that the value is not available yet.</p>
        <p>
          The fill color from dark to light represents the frequency of use
          from high to low.
        </p>
        <p>
          Different products will have different frequency of use, here is the{" "}
          <a
            href="https://www.figma.com/file/pTTWqClVP5NPzmImOUiPn3"
            target="_blank"
            rel="noreferrer"
            className="text-[#95a4fc] hover:underline"
          >
            Snow Dashboard UI Kit
          </a>
          <span className="text-[#95a4fc]">↗</span> as a reference.
        </p>
      </>
    ),
  },
];

// Fill: hex/rgba bg, or "dashed" for an unavailable value
type ScaleSwatch = { value: number; fill: string | "dashed" };

const spacingScale: ScaleSwatch[] = [
  { value: 80, fill: "dashed" },
  { value: 48, fill: "rgba(0,0,0,0.1)" },
  { value: 40, fill: "rgba(0,0,0,0.2)" },
  { value: 32, fill: "dashed" },
  { value: 28, fill: "#000000" },
  { value: 24, fill: "#000000" },
  { value: 20, fill: "rgba(0,0,0,0.4)" },
  { value: 16, fill: "#000000" },
  { value: 12, fill: "rgba(0,0,0,0.2)" },
  { value: 8, fill: "#000000" },
  { value: 4, fill: "rgba(0,0,0,0.4)" },
  { value: 0, fill: "rgba(0,0,0,0.4)" },
];

const sizeScale: ScaleSwatch[] = [
  { value: 80, fill: "rgba(0,0,0,0.4)" },
  { value: 48, fill: "rgba(0,0,0,0.2)" },
  { value: 40, fill: "rgba(0,0,0,0.4)" },
  { value: 32, fill: "rgba(0,0,0,0.2)" },
  { value: 28, fill: "rgba(0,0,0,0.1)" },
  { value: 24, fill: "rgba(0,0,0,0.8)" },
  { value: 20, fill: "#000000" },
  { value: 16, fill: "rgba(0,0,0,0.8)" },
  { value: 12, fill: "rgba(0,0,0,0.1)" },
  { value: 8, fill: "dashed" },
  { value: 4, fill: "dashed" },
  { value: 0, fill: "dashed" },
];

const cornerRadiusScale: ScaleSwatch[] = [
  { value: 80, fill: "rgba(0,0,0,0.4)" },
  { value: 48, fill: "rgba(0,0,0,0.04)" },
  { value: 40, fill: "rgba(0,0,0,0.04)" },
  { value: 32, fill: "rgba(0,0,0,0.1)" },
  { value: 28, fill: "rgba(0,0,0,0.04)" },
  { value: 24, fill: "rgba(0,0,0,0.4)" },
  { value: 20, fill: "rgba(0,0,0,0.2)" },
  { value: 16, fill: "#000000" },
  { value: 12, fill: "#000000" },
  { value: 8, fill: "#000000" },
  { value: 4, fill: "rgba(0,0,0,0.8)" },
  { value: 0, fill: "rgba(0,0,0,0.2)" },
];

// Backgrounds at or above this darkness get white text; lighter ones get black/20% label
function isDark(fill: string): boolean {
  if (fill === "#000000") return true;
  const m = fill.match(/rgba\(0,0,0,([\d.]+)\)/);
  if (m) return parseFloat(m[1]) >= 0.4;
  return false;
}

function DocRowItem({ row }: { row: DocRow }) {
  const padding =
    row.padding === "spacer-top"
      ? "pt-[48px] pb-[28px]"
      : row.divider === "emphasis"
        ? "pt-[28px] pb-[48px]"
        : "py-[28px]";

  const border =
    row.divider === "none"
      ? ""
      : row.divider === "emphasis"
        ? "border-b border-b-black/80"
        : "border-b border-b-black/10";

  return (
    <section
      className={`flex w-full flex-wrap items-start gap-x-1 gap-y-4 ${padding} ${border}`}
    >
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-center">
        <h2
          className={`text-[24px] leading-[32px] font-normal ${
            row.accent ? "text-[#adadfb]" : "text-black"
          }`}
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

function ScaleSwatchCell({ swatch }: { swatch: ScaleSwatch }) {
  const dashed = swatch.fill === "dashed";
  const dark = !dashed && isDark(swatch.fill);

  return (
    <div
      className={`flex min-w-px flex-1 flex-col items-center justify-center self-stretch rounded-[16px] py-[40px] ${
        dashed ? "border border-dashed border-black/10" : ""
      }`}
      style={dashed ? undefined : { background: swatch.fill }}
    >
      <p
        className={`w-full text-center text-[14px] leading-[20px] ${
          dark ? "text-white" : "text-black/20"
        }`}
        style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
      >
        {swatch.value}
      </p>
    </div>
  );
}

function ScaleRow({
  title,
  scale,
}: {
  title: string;
  scale: ScaleSwatch[];
}) {
  return (
    <section className="flex w-full flex-wrap items-center gap-x-1 gap-y-4 py-[28px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-center">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          {title}
        </h2>
      </div>
      <div className="flex min-w-[358px] flex-1 items-stretch gap-[8px]">
        {scale.map((swatch) => (
          <ScaleSwatchCell key={swatch.value} swatch={swatch} />
        ))}
      </div>
    </section>
  );
}

export default function SpacingSizeRadiusPage() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-4 sm:p-8 lg:p-12">
      <article className="flex w-full max-w-[1440px] flex-col overflow-hidden rounded-[40px] bg-white p-[28px]">
        <header className="flex flex-wrap items-start justify-between gap-6 rounded-[28px] bg-[#f9f9fa] p-[40px]">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <h1
              className="text-[48px] font-semibold leading-[56px] tracking-[0] text-black"
              style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
            >
              Spacing, Size, Corner Radius
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
          {docRows.map((row) => (
            <DocRowItem key={row.title} row={row} />
          ))}
          <ScaleRow title="Spacing" scale={spacingScale} />
          <ScaleRow title="Size" scale={sizeScale} />
          <ScaleRow title="Corner Radius" scale={cornerRadiusScale} />
        </div>
      </article>
    </div>
  );
}
