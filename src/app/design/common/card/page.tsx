import type { ReactNode } from "react";
import { Card, type CardState } from "@/components/common/card";
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
        Card is a selectable content block. Four states (default, hover,
        selected, static) × 1–4 text lines × horizontal or vertical layout.
        Typical uses: option tiles, plan selectors, filter pills.
      </p>
    ),
  },
  {
    title: "Rules of use",
    accent: true,
    body: (
      <p>
        Hover shows a hairline border plus a hollow radio indicator. Selected
        uses a solid black border plus a filled radio with a white inner dot.
        Static is visually identical to default — use it for non-interactive
        previews.
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

type VariantCoord = {
  x: number;
  y: number;
  state: CardState;
  vertical: boolean;
  count: 1 | 2 | 3 | 4;
};

const VARIANTS: VariantCoord[] = [
  // Default row — y=20
  { x: 20, y: 20, state: "default", vertical: true, count: 4 },
  { x: 160, y: 20, state: "default", vertical: true, count: 3 },
  { x: 300, y: 20, state: "default", vertical: true, count: 2 },
  { x: 440, y: 20, state: "default", vertical: true, count: 1 },
  { x: 600, y: 20, state: "default", vertical: false, count: 4 },
  { x: 780, y: 20, state: "default", vertical: false, count: 3 },
  { x: 960, y: 20, state: "default", vertical: false, count: 2 },
  // Hover — y=84..156 depending on count
  { x: 20, y: 156, state: "hover", vertical: true, count: 1 },
  { x: 160, y: 132, state: "hover", vertical: true, count: 2 },
  { x: 300, y: 108, state: "hover", vertical: true, count: 3 },
  { x: 440, y: 84, state: "hover", vertical: true, count: 4 },
  { x: 600, y: 84, state: "hover", vertical: false, count: 2 },
  { x: 780, y: 84, state: "hover", vertical: false, count: 3 },
  { x: 960, y: 84, state: "hover", vertical: false, count: 4 },
  // Selected — y=220
  { x: 20, y: 220, state: "selected", vertical: true, count: 4 },
  { x: 160, y: 220, state: "selected", vertical: true, count: 3 },
  { x: 300, y: 220, state: "selected", vertical: true, count: 2 },
  { x: 440, y: 220, state: "selected", vertical: true, count: 1 },
  { x: 600, y: 220, state: "selected", vertical: false, count: 4 },
  { x: 780, y: 220, state: "selected", vertical: false, count: 3 },
  { x: 960, y: 220, state: "selected", vertical: false, count: 2 },
  // Static — y=284..356
  { x: 20, y: 356, state: "static", vertical: true, count: 1 },
  { x: 160, y: 332, state: "static", vertical: true, count: 2 },
  { x: 300, y: 308, state: "static", vertical: true, count: 3 },
  { x: 440, y: 284, state: "static", vertical: true, count: 4 },
  { x: 600, y: 284, state: "static", vertical: false, count: 2 },
  { x: 780, y: 284, state: "static", vertical: false, count: 3 },
  { x: 960, y: 284, state: "static", vertical: false, count: 4 },
];

/** 1:1 reproduction of the Figma canvas (1140×420). */
function FigmaCanvasRow() {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2 className="text-[24px] leading-[32px] font-normal text-black" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
          All variants
        </h2>
        <p className="mt-1 text-[12px] leading-[16px] text-black/40" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
          4 states · 1–4 lines · horizontal / vertical
        </p>
      </div>
      <div className="flex min-w-[358px] flex-1 flex-col items-start overflow-x-auto">
        <div
          className="relative rounded-[12px] border border-dashed border-black/15 bg-[#f9f9fa]"
          style={{ width: 1140, height: 420 }}
        >
          {VARIANTS.map((v) => (
            <div
              key={`${v.state}-${v.vertical}-${v.count}-${v.x}-${v.y}`}
              className="absolute"
              style={{ left: v.x, top: v.y }}
            >
              <Card state={v.state} vertical={v.vertical} count={v.count} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PropsTableRow() {
  const props = [
    { name: "state", type: '"default" | "hover" | "selected" | "static"', default: '"default"', description: "Border + radio indicator." },
    { name: "vertical", type: "boolean", default: "true", description: "Stack children or lay out side-by-side." },
    { name: "count", type: "1 | 2 | 3 | 4", default: "1", description: "Placeholder line count (Figma parity)." },
    { name: "children", type: "ReactNode", default: "—", description: "Custom content; overrides the placeholder lines." },
    { name: "onClick", type: "(e: MouseEvent) => void", default: "—", description: "Click handler; makes the card a <button>." },
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

export default function CardShowcasePage() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-4 sm:p-8 lg:p-12">
      <article className="flex w-full max-w-[1440px] flex-col overflow-hidden rounded-[40px] bg-white p-[28px]">
        <header className="flex flex-wrap items-start justify-between gap-6 rounded-[28px] bg-[#f9f9fa] p-[40px]">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="text-[14px] leading-[20px] text-[#adadfb]" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
              Common components
            </div>
            <h1 className="text-[48px] leading-[56px] font-semibold tracking-[0] text-black" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
              Card
            </h1>
            <p className="text-[14px] leading-[20px] text-black/40">
              <code className="rounded-[4px] bg-black/[0.04] px-[6px] py-[2px] font-mono text-[13px] text-black/70">
                @/components/common/card
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
