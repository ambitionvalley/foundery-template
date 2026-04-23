import Image from "next/image";
import type { ReactNode } from "react";

type DocRow = {
  title: string;
  body: ReactNode;
  accent?: boolean;
  divider?: "hairline" | "emphasis" | "none";
  padding?: "default" | "spacer-top" | "spacer-bottom";
};

const docRows: DocRow[] = [
  {
    title: "Introduction",
    accent: true,
    body: (
      <>
        <p>Text styles are a key part of the design system.</p>
        <p>
          To define Text styles, we have the following principles: 1. Widely
          used in design. 2. The number of Text styles should be as small as
          possible.
        </p>
        <p>
          The font we use is:{" "}
          <a
            href="https://fonts.google.com/specimen/Inter"
            target="_blank"
            rel="noreferrer"
            className="text-[#95a4fc] hover:underline"
          >
            Inter
          </a>
          <span className="text-[#95a4fc]">↗</span>, other recommended fonts:
          SF Pro, Roboto, Averta.
        </p>
      </>
    ),
  },
  {
    title: "Rules of use",
    accent: true,
    body: (
      <>
        <p>Please try to keep the number of Text styles below 20.</p>
        <p>
          90% principle: If the Text styles used in a single product accounts
          for less than 10%, please do not include it in the design system.
        </p>
      </>
    ),
  },
  {
    title: "How to use",
    accent: true,
    divider: "emphasis",
    body: (
      <p>
        Text styles can be added, modified and deleted. Modifying them will
        affect all components and pages, please proceed with caution.
      </p>
    ),
  },
  {
    title: "Notes",
    divider: "none",
    padding: "spacer-top",
    body: (
      <>
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

type TextStyle = {
  label: string;
  size: number;
  lineHeight: number;
  weight: 400 | 600;
  bg: string;
  fg: "black" | "white";
};

const textStyles: TextStyle[] = [
  { label: "64 Semibold", size: 64, lineHeight: 72, weight: 600, bg: "rgba(0,0,0,0.04)", fg: "black" },
  { label: "64 Regular", size: 64, lineHeight: 72, weight: 400, bg: "rgba(0,0,0,0.04)", fg: "black" },
  { label: "48 Semibold", size: 48, lineHeight: 56, weight: 600, bg: "rgba(0,0,0,0.04)", fg: "black" },
  { label: "48 Regular", size: 48, lineHeight: 56, weight: 400, bg: "rgba(0,0,0,0.04)", fg: "black" },
  { label: "32 Semibold", size: 32, lineHeight: 40, weight: 600, bg: "rgba(0,0,0,0.04)", fg: "black" },
  { label: "32 Regular", size: 32, lineHeight: 40, weight: 400, bg: "rgba(0,0,0,0.04)", fg: "black" },
  { label: "24 Semibold", size: 24, lineHeight: 32, weight: 600, bg: "rgba(0,0,0,0.1)", fg: "black" },
  { label: "24 Regular", size: 24, lineHeight: 32, weight: 400, bg: "rgba(0,0,0,0.04)", fg: "black" },
  { label: "18 Semibold", size: 18, lineHeight: 28, weight: 600, bg: "rgba(0,0,0,0.2)", fg: "black" },
  { label: "18 Regular", size: 18, lineHeight: 28, weight: 400, bg: "rgba(0,0,0,0.2)", fg: "black" },
  { label: "16 Semibold", size: 16, lineHeight: 24, weight: 600, bg: "rgba(0,0,0,0.04)", fg: "black" },
  { label: "16 Regular", size: 16, lineHeight: 24, weight: 400, bg: "rgba(0,0,0,0.1)", fg: "black" },
  { label: "14 Semibold", size: 14, lineHeight: 20, weight: 600, bg: "rgba(0,0,0,0.4)", fg: "white" },
  { label: "14 Regular", size: 14, lineHeight: 20, weight: 400, bg: "#000000", fg: "white" },
  { label: "12 Semibold", size: 12, lineHeight: 16, weight: 600, bg: "rgba(0,0,0,0.2)", fg: "black" },
  { label: "12 Regular", size: 12, lineHeight: 16, weight: 400, bg: "#000000", fg: "white" },
];

function SnowUILogo() {
  return (
    <div className="flex items-center gap-[6px]" aria-label="SnowUI">
      <Image src="/figma/snowui-logo.svg" alt="" width={28} height={28} priority />
      <div className="relative h-[12px] w-[71px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/snowui-wordmark-left.svg"
          alt=""
          width={53}
          height={12}
          className="absolute top-0 left-0 block"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/snowui-wordmark-right.svg"
          alt=""
          width={15}
          height={12}
          className="absolute top-0 block"
          style={{ left: "56px" }}
        />
      </div>
    </div>
  );
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

function TextStyleCard({ style }: { style: TextStyle }) {
  return (
    <div
      className="flex flex-col items-start justify-center rounded-[16px] px-[20px] py-[20px]"
      style={{ background: style.bg }}
    >
      <p
        className="whitespace-nowrap"
        style={{
          fontSize: `${style.size}px`,
          lineHeight: `${style.lineHeight}px`,
          fontWeight: style.weight,
          color: style.fg,
          fontFeatureSettings: "'ss01' 1, 'cv01' 1",
        }}
      >
        {style.label}
      </p>
    </div>
  );
}

function FontScaleRow() {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 pt-[28px] pb-[48px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Font: Inter
        </h2>
      </div>
      <div className="flex min-w-[358px] flex-1 flex-col items-start gap-[8px]">
        {textStyles.map((style) => (
          <TextStyleCard key={style.label} style={style} />
        ))}
      </div>
    </section>
  );
}

export default function TextStylesPage() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-4 sm:p-8 lg:p-12">
      <article className="flex w-full max-w-[1440px] flex-col overflow-hidden rounded-[40px] bg-white p-[28px]">
        <header className="flex flex-wrap items-start justify-between gap-6 rounded-[28px] bg-[#f9f9fa] p-[40px]">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <h1
              className="text-[48px] font-semibold leading-[56px] tracking-[0] text-black"
              style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
            >
              Text Styles
            </h1>
            <p className="text-[14px] leading-[20px] text-black/40">
              <a
                className="cursor-pointer hover:underline"
                href="https://snowui.byewind.com"
                target="_blank"
                rel="noreferrer"
              >
                snowui.byewind.com/text-styles
              </a>
              <span className="ml-0.5">↗</span>
            </p>
          </div>
          <SnowUILogo />
        </header>

        <div className="flex flex-col px-[40px]">
          {docRows.map((row) => (
            <DocRowItem key={row.title} row={row} />
          ))}
          <FontScaleRow />
        </div>
      </article>
    </div>
  );
}
