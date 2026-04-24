import type { ReactNode } from "react";
import { InputThree } from "@/components/common/input-three";
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
      <p>
        Three Inputs is a trio of joined text fields that read as a single
        control. Use it for tightly-coupled values — day / month / year, area
        / prefix / line, or any ordered triple. Horizontal splits the row;
        vertical stacks.
      </p>
    ),
  },
  {
    title: "Rules of use",
    accent: true,
    body: (
      <p>
        The two shared edges collapse to single 0.5px hairlines — each trailing
        field drops its border on the side facing the previous one. Pass
        <code>hover</code> to reveal a trailing action button at the end of
        the third field.
      </p>
    ),
    divider: "emphasis",
  },
];

function DocRowItem({ row }: { row: DocRow }) {
  const padding = row.divider === "emphasis" ? "pt-[28px] pb-[48px]" : "py-[28px]";
  const border =
    row.divider === "emphasis"
      ? "border-b border-b-black/80"
      : "border-b border-b-black/10";

  return (
    <section className={`flex w-full flex-wrap items-start gap-x-1 gap-y-4 ${padding} ${border}`}>
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-center">
        <h2
          className={`text-[24px] leading-[32px] font-normal ${row.accent ? "text-[#adadfb]" : "text-black"}`}
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          {row.title}
        </h2>
      </div>
      <div className="flex min-w-[358px] flex-1 flex-col justify-center">
        <div
          className="flex flex-col gap-2 text-[14px] leading-[20px] text-black [&_code]:rounded-[4px] [&_code]:bg-black/[0.06] [&_code]:px-[4px] [&_code]:py-[1px] [&_code]:font-mono [&_code]:text-[13px]"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          {row.body}
        </div>
      </div>
    </section>
  );
}

const VARIANTS: { x: number; y: number; vertical: boolean; hover: boolean }[] = [
  { x: 20, y: 20, vertical: false, hover: false },
  { x: 400, y: 20, vertical: false, hover: true },
  { x: 20, y: 74, vertical: true, hover: false },
  { x: 400, y: 74, vertical: true, hover: true },
];

/** 1:1 reproduction of the Figma canvas (780×226). */
function FigmaCanvasRow() {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2 className="text-[24px] leading-[32px] font-normal text-black" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
          All variants
        </h2>
        <p className="mt-1 text-[12px] leading-[16px] text-black/40" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
          horizontal · vertical · default · hover
        </p>
      </div>
      <div className="flex min-w-[358px] flex-1 flex-col items-start overflow-x-auto">
        <div
          className="relative rounded-[12px] border border-dashed border-black/15 bg-[#f9f9fa]"
          style={{ width: 780, height: 226 }}
        >
          {VARIANTS.map((v) => (
            <div
              key={`${v.vertical}-${v.hover}`}
              className="absolute"
              style={{ left: v.x, top: v.y }}
            >
              <InputThree vertical={v.vertical} hover={v.hover} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PropsTableRow() {
  const props = [
    { name: "vertical", type: "boolean", default: "false", description: "Stack the three fields vertically." },
    { name: "hover", type: "boolean", default: "false", description: "Reveal the trailing action button." },
    { name: "firstValue", type: "ReactNode", default: '"Text"', description: "Leading / top field value." },
    { name: "secondValue", type: "ReactNode", default: '"Text"', description: "Middle field value." },
    { name: "thirdValue", type: "ReactNode", default: '"Text"', description: "Trailing / bottom field value." },
    { name: "action", type: "ReactNode", default: "—", description: "Hover action button contents; defaults to a dashed icon placeholder." },
    { name: "className", type: "string", default: "—", description: "Merged with base classes." },
  ];

  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2 className="text-[24px] leading-[32px] font-normal text-black" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
          Props
        </h2>
      </div>
      <div className="flex min-w-[358px] flex-1 flex-col overflow-hidden rounded-[16px] border border-black/10">
        <div className="grid grid-cols-[minmax(0,140px)_minmax(0,1fr)_minmax(0,120px)_minmax(0,2fr)] bg-[#f9f9fa] px-4 py-2 text-[12px] leading-[16px] font-semibold text-black/60">
          <div>Name</div>
          <div>Type</div>
          <div>Default</div>
          <div>Description</div>
        </div>
        {props.map((p) => (
          <div
            key={p.name}
            className="grid grid-cols-[minmax(0,140px)_minmax(0,1fr)_minmax(0,120px)_minmax(0,2fr)] items-start gap-x-4 border-t border-black/10 px-4 py-3 text-[13px] leading-[18px] text-black"
          >
            <code className="font-mono text-[13px] text-black">{p.name}</code>
            <code className="font-mono text-[13px] break-words text-black/70">{p.type}</code>
            <code className="font-mono text-[13px] text-black/70">{p.default}</code>
            <span>{p.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function InputThreeShowcasePage() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-4 sm:p-8 lg:p-12">
      <article className="flex w-full max-w-[1440px] flex-col overflow-hidden rounded-[40px] bg-white p-[28px]">
        <header className="flex flex-wrap items-start justify-between gap-6 rounded-[28px] bg-[#f9f9fa] p-[40px]">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="text-[14px] leading-[20px] text-[#adadfb]" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
              Common components
            </div>
            <h1 className="text-[48px] leading-[56px] font-semibold tracking-[0] text-black" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
              Three Inputs
            </h1>
            <p className="text-[14px] leading-[20px] text-black/40">
              <code className="rounded-[4px] bg-black/[0.04] px-[6px] py-[2px] font-mono text-[13px] text-black/70">
                @/components/common/input-three
              </code>
            </p>
          </div>
          <BrandLogo priority />
        </header>

        <div className="flex flex-col px-[40px]">
          {docRows.map((row) => (
            <DocRowItem key={row.title} row={row} />
          ))}
          <FigmaCanvasRow />
          <PropsTableRow />
        </div>
      </article>
    </div>
  );
}
