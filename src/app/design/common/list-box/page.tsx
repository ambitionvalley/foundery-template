import type { ReactNode } from "react";
import { ListBox, ListBoxItem } from "@/components/common/list-box";
import { BrandLogo } from "@/components/brand-logo";
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
        List Box is a floating popover menu. Use it for dropdown menus,
        command lists, select popovers, and right-click context menus. The
        highlighted item signals hover, keyboard focus, or the current
        selection.
      </p>
    ),
  },
  {
    title: "Rules of use",
    accent: true,
    body: (
      <p>
        The surface is 90%-white with a 40px backdrop blur and a soft 28px
        drop shadow, so the popover floats over any background. Items use a
        12px hover radius nested inside the 16px container radius.
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

/** 1:1 reproduction of the Figma symbol (120×124). */
function FigmaCanvasRow() {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2 className="text-[24px] leading-[32px] font-normal text-black" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
          All variants
        </h2>
        <p className="mt-1 text-[12px] leading-[16px] text-black/40" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
          single variant · 120 × 124
        </p>
      </div>
      <div className="flex min-w-[358px] flex-1 flex-col items-start">
        <div
          className="relative rounded-[12px] border border-dashed border-black/15 bg-[#f9f9fa]"
          style={{ width: 200, height: 180 }}
        >
          <div className="absolute" style={{ left: 40, top: 28 }}>
            <ListBox>
              <ListBoxItem active>ListboxItem</ListBoxItem>
              <ListBoxItem>ListboxItem</ListBoxItem>
              <ListBoxItem>ListboxItem</ListBoxItem>
            </ListBox>
          </div>
        </div>
      </div>
    </section>
  );
}

function PropsTableRow() {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2 className="text-[24px] leading-[32px] font-normal text-black" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
          Props
        </h2>
      </div>
      <div className="flex min-w-[358px] flex-1 flex-col gap-[16px]">
        <div className="flex flex-col overflow-hidden rounded-[16px] border border-black/10">
          <div className="bg-[#f9f9fa] px-4 py-2 text-[12px] leading-[16px] font-semibold text-black/60">
            ListBox
          </div>
          <div className="grid grid-cols-[minmax(0,140px)_minmax(0,1fr)_minmax(0,120px)_minmax(0,2fr)] bg-white px-4 py-2 text-[12px] leading-[16px] font-semibold text-black/60">
            <div>Name</div>
            <div>Type</div>
            <div>Default</div>
            <div>Description</div>
          </div>
          {[
            { name: "width", type: "number", default: "120", description: "Popover width in pixels." },
            { name: "children", type: "ReactNode", default: "—", description: "Menu items (use ListBoxItem)." },
            { name: "className", type: "string", default: "—", description: "Merged with base classes." },
          ].map((p) => (
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

        <div className="flex flex-col overflow-hidden rounded-[16px] border border-black/10">
          <div className="bg-[#f9f9fa] px-4 py-2 text-[12px] leading-[16px] font-semibold text-black/60">
            ListBoxItem
          </div>
          <div className="grid grid-cols-[minmax(0,140px)_minmax(0,1fr)_minmax(0,120px)_minmax(0,2fr)] bg-white px-4 py-2 text-[12px] leading-[16px] font-semibold text-black/60">
            <div>Name</div>
            <div>Type</div>
            <div>Default</div>
            <div>Description</div>
          </div>
          {[
            { name: "active", type: "boolean", default: "false", description: "Show the highlighted surface." },
            { name: "onClick", type: "(e: MouseEvent) => void", default: "—", description: "Click handler." },
            { name: "children", type: "ReactNode", default: "—", description: "Item label." },
            { name: "className", type: "string", default: "—", description: "Merged with base classes." },
          ].map((p) => (
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
      </div>
    </section>
  );
}

export default function ListBoxShowcasePage() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-4 sm:p-8 lg:p-12">
      <article className="flex w-full max-w-[1440px] flex-col overflow-hidden rounded-[40px] bg-white p-[28px]">
        <header className="flex flex-wrap items-start justify-between gap-6 rounded-[28px] bg-[#f9f9fa] p-[40px]">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="text-[14px] leading-[20px] text-[#adadfb]" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
              Common components
            </div>
            <h1 className="text-[48px] leading-[56px] font-semibold tracking-[0] text-black" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
              List Box
            </h1>
            <p className="text-[14px] leading-[20px] text-black/40">
              <code className="rounded-[4px] bg-black/[0.04] px-[6px] py-[2px] font-mono text-[13px] text-black/70">
                @/components/common/list-box
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
