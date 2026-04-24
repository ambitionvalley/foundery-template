import type { CSSProperties, ReactNode } from "react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { brand } from "@/config/brand";

type DocRow = {
  title: string;
  body: ReactNode;
  accent?: boolean;
  divider?: "hairline" | "emphasis";
};

const docRows: DocRow[] = [
  {
    title: "Introduction",
    accent: true,
    body: (
      <>
        <p>Effect styles are a key part of the design system.</p>
        <p>
          To define Effect styles, we have the following principles: 1. Widely
          used in design. 2. The number of Effect styles should be as small as
          possible.
        </p>
      </>
    ),
  },
  {
    title: "Rules of use",
    accent: true,
    body: (
      <>
        <p>Please try to keep the number of Effect styles below 8.</p>
        <p>
          90% principle: If the Effect styles used in a single product accounts
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
        Effect styles can be added, modified and deleted. Modifying them will
        affect all components and pages, please proceed with caution.
      </p>
    ),
  },
];

type EffectCard = {
  label: string;
  subtitle?: ReactNode;
  style: CSSProperties;
  border?: boolean;
};

const effectCards: EffectCard[] = [
  {
    label: "Glass 1",
    style: {
      background: "rgba(255,255,255,0.2)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      boxShadow: "0 4px 16px 0 rgba(0,0,0,0.04)",
    },
  },
  {
    label: "Glass 2",
    style: {
      background: "rgba(255,255,255,0.2)",
      backdropFilter: "blur(40px)",
      WebkitBackdropFilter: "blur(40px)",
      boxShadow: "0 8px 28px 0 rgba(0,0,0,0.1)",
    },
  },
  {
    label: "Glow",
    style: {
      background: "rgba(0,0,0,0.04)",
      boxShadow:
        "0 0 12px 8px rgba(255,255,255,0.2), 0 0 12px 8px rgba(0,0,0,0.2)",
    },
  },
  {
    label: "Focus",
    subtitle: (
      <>
        <p>Focus styles, Focus ring, Focus indicator.</p>
        <p>Can change shadow color to brand color.</p>
      </>
    ),
    border: true,
    style: {
      background: "#ffffff",
      boxShadow: "0 0 0 4px rgba(0,0,0,0.04)",
    },
  },
  {
    label: "Inner shadow",
    style: {
      background: "rgba(0,0,0,0.04)",
      boxShadow: [
        "inset 0 -0.5px 1px 0 rgba(255,255,255,0.3)",
        "inset 0 -0.5px 1px 0 rgba(255,255,255,0.25)",
        "inset 1px 1.5px 4px 0 rgba(0,0,0,0.08)",
        "inset 1px 1.5px 4px 0 rgba(0,0,0,0.1)",
      ].join(", "),
    },
  },
  {
    label: "Drop shadow 1",
    style: {
      background: "rgba(0,0,0,0.04)",
      boxShadow: "0 0.5px 0.5px 0 rgba(0,0,0,0.1)",
    },
  },
  {
    label: "Drop shadow 2",
    style: {
      background: "rgba(0,0,0,0.04)",
      boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)",
    },
  },
  {
    label: "Image hover",
    style: {
      background: "rgba(0,0,0,0.04)",
      boxShadow: [
        "inset 0 -20px 20px 0 rgba(255,255,255,0.2)",
        "inset 0 20px 20px 0 rgba(0,0,0,1)",
      ].join(", "),
    },
  },
  {
    label: "Background blur 40",
    style: {
      background: "rgba(0,0,0,0.04)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
    },
  },
  {
    label: "Background blur 100",
    style: {
      background: "rgba(0,0,0,0.04)",
      backdropFilter: "blur(50px)",
      WebkitBackdropFilter: "blur(50px)",
    },
  },
];

function DocRowItem({ row }: { row: DocRow }) {
  const padding =
    row.divider === "emphasis" ? "pt-[28px] pb-[48px]" : "py-[28px]";
  const border =
    row.divider === "emphasis" ? "border-b border-b-black/80" : "border-b border-b-black/10";

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

function EffectCardItem({ card }: { card: EffectCard }) {
  const borderClass = card.border ? "border border-solid border-black/10" : "";
  return (
    <div
      className={`flex w-[320px] flex-col items-center justify-center rounded-[16px] p-[20px] ${borderClass}`}
      style={card.style}
    >
      <p
        className="w-full text-center text-[14px] leading-[20px] text-black"
        style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
      >
        {card.label}
      </p>
      {card.subtitle && (
        <div
          className="mt-1 w-full text-center text-[12px] leading-[18px] text-black/40"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1, 'cv11' 1" }}
        >
          {card.subtitle}
        </div>
      )}
    </div>
  );
}

function EffectStylesRow() {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 py-[48px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Effect Styles
        </h2>
      </div>
      <div className="flex min-w-[358px] flex-1 flex-col items-start gap-[8px]">
        {effectCards.map((card) => (
          <EffectCardItem key={card.label} card={card} />
        ))}
      </div>
    </section>
  );
}

export default function EffectStylesPage() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-4 sm:p-8 lg:p-12">
      <article className="flex w-full max-w-[1440px] flex-col overflow-hidden rounded-[40px] bg-white p-[28px]">
        <header className="flex flex-wrap items-start justify-between gap-6 rounded-[28px] bg-[#f9f9fa] p-[40px]">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <h1
              className="text-[48px] font-semibold leading-[56px] tracking-[0] text-black"
              style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
            >
              Effect Styles
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
          <EffectStylesRow />
        </div>
      </article>
    </div>
  );
}
