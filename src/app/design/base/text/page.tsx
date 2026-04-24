import type { ReactNode } from "react";
import { Text, type TextState } from "@/components/base/text";
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
        <p>
          Text is a base component — a consistent frame around one or more
          text slots. It fixes typography at 14/20 Inter Regular and handles
          the stack-vs-inline distinction.
        </p>
        <p>
          Use it as a building block inside other base components where a
          text slot needs swappable content (buttons, list items, tags).
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
          Pick <code>vertical</code> when lines should break onto new rows
          (multi-line descriptions, cards). Pick <code>horizontal</code> for
          inline chips of content separated by a 4px gap.
        </p>
        <p>
          Use <code>state=&quot;hover&quot;</code> when the frame itself is
          the hover target — it adds 4px of horizontal padding so the hover
          rectangle extends past the text.
        </p>
      </>
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
          className="flex flex-col text-[14px] leading-[20px] text-black [&_code]:rounded-[4px] [&_code]:bg-black/[0.06] [&_code]:px-[4px] [&_code]:py-[1px] [&_code]:font-mono [&_code]:text-[13px]"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          {row.body}
        </div>
      </div>
    </section>
  );
}

function Labeled({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className="text-[12px] leading-[16px] text-black/40"
        style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
      >
        {label}
      </span>
      <div className="rounded-[12px] border border-dashed border-black/15 p-[12px]">
        {children}
      </div>
    </div>
  );
}

const COUNTS = [1, 2, 3, 4, 5, 6, 7] as const;
const STATES: TextState[] = ["default", "hover", "static"];

function slotsFor(n: number): string[] {
  return Array.from({ length: n }, (_, i) => (i === 0 ? "Text" : `Text ${i + 1}`));
}

function OrientationRow() {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 py-[28px] border-b border-b-black/10">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Orientation
        </h2>
        <p
          className="mt-1 text-[12px] leading-[16px] text-black/40"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          vertical vs horizontal
        </p>
      </div>
      <div className="grid min-w-[358px] flex-1 grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[20px]">
        <Labeled label='orientation="vertical"'>
          <Text orientation="vertical">
            {slotsFor(4).map((s, i) => (
              <p key={i}>{s}</p>
            ))}
          </Text>
        </Labeled>
        <Labeled label='orientation="horizontal"'>
          <Text orientation="horizontal">
            {slotsFor(4).map((s, i) => (
              <p key={i}>{s}</p>
            ))}
          </Text>
        </Labeled>
      </div>
    </section>
  );
}

function SlotsRow({ orientation }: { orientation: "vertical" | "horizontal" }) {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 py-[28px] border-b border-b-black/10">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          {orientation === "vertical" ? "Vertical slots" : "Horizontal slots"}
        </h2>
        <p
          className="mt-1 text-[12px] leading-[16px] text-black/40"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          1 → 7 children
        </p>
      </div>
      <div className="grid min-w-[358px] flex-1 grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-[20px]">
        {COUNTS.map((n) => (
          <Labeled key={n} label={`${n} slot${n === 1 ? "" : "s"}`}>
            <Text orientation={orientation}>
              {slotsFor(n).map((s, i) => (
                <p key={i}>{s}</p>
              ))}
            </Text>
          </Labeled>
        ))}
      </div>
    </section>
  );
}

function StateRow() {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 py-[28px] border-b border-b-black/10">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          State
        </h2>
        <p
          className="mt-1 text-[12px] leading-[16px] text-black/40"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          hover adds 4px horizontal padding
        </p>
      </div>
      <div className="grid min-w-[358px] flex-1 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[20px]">
        {STATES.map((s) => (
          <Labeled key={s} label={`state="${s}"`}>
            <Text orientation="horizontal" state={s}>
              <p>Text</p>
              <p>Text 2</p>
              <p>Text 3</p>
            </Text>
          </Labeled>
        ))}
      </div>
    </section>
  );
}

function PropsTableRow() {
  const props = [
    { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Stack order of child slots." },
    { name: "state", type: '"default" | "hover" | "static"', default: '"default"', description: "Hover adds 4px horizontal padding." },
    { name: "children", type: "ReactNode", default: "—", description: "One or more text nodes." },
    { name: "className", type: "string", default: "—", description: "Passed through to the frame." },
  ];

  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 py-[28px] border-b border-b-black/10">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
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
            <code className="font-mono text-[13px] break-words text-black/70">
              {p.type}
            </code>
            <code className="font-mono text-[13px] text-black/70">{p.default}</code>
            <span>{p.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function TextShowcasePage() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-4 sm:p-8 lg:p-12">
      <article className="flex w-full max-w-[1440px] flex-col overflow-hidden rounded-[40px] bg-white p-[28px]">
        <header className="flex flex-wrap items-start justify-between gap-6 rounded-[28px] bg-[#f9f9fa] p-[40px]">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div
              className="text-[14px] leading-[20px] text-[#adadfb]"
              style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
            >
              Base components
            </div>
            <h1
              className="text-[48px] font-semibold leading-[56px] tracking-[0] text-black"
              style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
            >
              Text
            </h1>
            <p className="text-[14px] leading-[20px] text-black/40">
              <code className="rounded-[4px] bg-black/[0.04] px-[6px] py-[2px] font-mono text-[13px] text-black/70">
                @/components/base/text
              </code>
            </p>
          </div>
          <BrandLogo priority />
        </header>

        <div className="flex flex-col px-[40px]">
          {docRows.map((row) => (
            <DocRowItem key={row.title} row={row} />
          ))}
          <OrientationRow />
          <SlotsRow orientation="vertical" />
          <SlotsRow orientation="horizontal" />
          <StateRow />
          <PropsTableRow />
        </div>
      </article>
    </div>
  );
}
