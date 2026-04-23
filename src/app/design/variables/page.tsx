import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { brand } from "@/config/brand";

type Row = {
  title: string;
  body: ReactNode;
  accent?: boolean;
  divider?: "hairline" | "emphasis";
};

const rows: Row[] = [
  {
    title: "Introduction",
    accent: true,
    body: (
      <>
        <p>
          In {brand.name}, we use variables to control color, spacing, icon size, and
          corner radius. These are key parts of the design system.
        </p>
        <p>
          In addition, we also have variables such as Icon weight, Show text,
          Text, etc.
        </p>
      </>
    ),
  },
  {
    title: "Rules of use",
    accent: true,
    body: <p>Please see below.</p>,
  },
  {
    title: "How to use",
    accent: true,
    divider: "emphasis",
    body: (
      <p>
        Variables can be added, modified and deleted. Modifying them will affect
        all components and pages, please proceed with caution.
      </p>
    ),
  },
  {
    title: "Colors",
    body: (
      <>
        <p>
          The Colors variable is used to switch between light and dark modes,
          and the colors in this variable are a key part of the design system.
        </p>
        <p>Applies to: all elements.</p>
        <RulesLink />
      </>
    ),
  },
  {
    title: "Corner Radius",
    body: (
      <>
        <p>The Corner Radius variable is used to set the value of the corner radius.</p>
        <p>Applies to: vector element, component, block, frame, page.</p>
        <RulesLink />
      </>
    ),
  },
  {
    title: "Font",
    body: <p>The Font variable is used to switch fonts.</p>,
  },
  {
    title: "Font Weight",
    body: <p>The Font Weight variable is used to switch font weight.</p>,
  },
  {
    title: "Paragraph Spacing",
    body: (
      <p>
        The Paragraph Spacing variable changes the paragraph text spacing when
        the text is a paragraph.
      </p>
    ),
  },
  {
    title: "Show or Hide",
    body: <p>A Boolean value used to control whether the element is hidden.</p>,
  },
  {
    title: "Show or Hide 2",
    body: (
      <p>Another Boolean value used to control whether the element is hidden.</p>
    ),
  },
  {
    title: "Size",
    body: (
      <>
        <p>The Size variable is used to control the element size.</p>
        <p>Applies to: the size of icons, avatars, logos, images, emoji, etc.</p>
        <RulesLink />
      </>
    ),
  },
  {
    title: "Spacing",
    body: (
      <>
        <p>The Spacing variable is used to set the value of spacing.</p>
        <p>Applies to: Gap, Padding, Margin.</p>
        <RulesLink />
      </>
    ),
  },
];

function RulesLink() {
  return (
    <a href="#rules-of-use" className="mt-0 block text-[#adadfb] hover:underline">
      Rules of use
    </a>
  );
}

export default function VariablesPage() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-4 sm:p-8 lg:p-12">
      <article
        className="flex w-full max-w-[1440px] flex-col overflow-hidden rounded-[40px] bg-white p-[28px]"
        data-node-id="60755:5387"
      >
        <header
          className="flex flex-wrap items-start justify-between gap-6 rounded-[28px] bg-[#f9f9fa] p-[40px]"
          data-node-id="60755:5388"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <h1
              className="text-[48px] font-semibold leading-[56px] tracking-[0] text-black"
              style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
            >
              Variables
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

        <div className="flex flex-col px-[40px]" data-node-id="60755:5389">
          {rows.map((row, idx) => {
            const isLast = idx === rows.length - 1;
            return (
              <DocRow
                key={row.title}
                row={row}
                isFirst={idx === 0}
                isLast={isLast}
              />
            );
          })}
        </div>
      </article>
    </div>
  );
}

type DocRowProps = {
  row: Row;
  isFirst: boolean;
  isLast: boolean;
};

function DocRow({ row, isFirst, isLast }: DocRowProps) {
  const verticalPadding =
    row.divider === "emphasis"
      ? "pt-[28px] pb-[48px]"
      : isLast
        ? "pt-[48px] pb-[28px]"
        : "py-[28px]";

  const borderColor =
    row.divider === "emphasis"
      ? "border-b-black/80"
      : isLast
        ? "border-b-transparent"
        : "border-b-black/10";

  const borderClass = isFirst
    ? `border-t border-t-transparent border-b ${borderColor}`
    : `border-b ${borderColor}`;

  return (
    <section
      className={`flex w-full flex-wrap items-start gap-x-1 gap-y-4 ${verticalPadding} ${borderClass}`}
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
          className="flex flex-col gap-0 text-[14px] leading-[20px] text-black [&>p]:leading-[20px]"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          {row.body}
        </div>
      </div>
    </section>
  );
}
