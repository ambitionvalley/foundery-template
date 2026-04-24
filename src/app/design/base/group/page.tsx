"use client";

import type { ReactNode } from "react";
import { Group, GroupItem } from "@/components/base/group";
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
          Group is a base component — a flex-wrap container that lays out
          related items horizontally with consistent 8px gaps. It&apos;s the
          primitive behind toolbars, tag strips, and pagination rows.
        </p>
        <p>
          Each cell goes in a <code>GroupItem</code>, which guarantees a 24×24
          minimum target with 4px padding. Pass an <code>onClick</code> and
          the item becomes a <code>&lt;button&gt;</code> with a subtle hover
          treatment.
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
          Prefer Group for peers of the same visual weight — icon buttons,
          mini tags, step indicators. Don&apos;t mix with full-height buttons
          or primary CTAs; compose those separately.
        </p>
        <p>
          Items wrap by default. For scroll-only toolbars, wrap Group in an
          overflow container.
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

function NumberCircle({ n }: { n: number }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={16}
      height={16}
      aria-hidden
      className="text-black"
    >
      <circle
        cx="8"
        cy="8"
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <text
        x="8"
        y="11.5"
        textAnchor="middle"
        fontSize="9"
        fontFamily="Inter, sans-serif"
        fontWeight="500"
        fill="currentColor"
      >
        {n}
      </text>
    </svg>
  );
}

function Labeled({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span
        className="text-[12px] leading-[16px] text-black/40"
        style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
      >
        {label}
      </span>
      <div className="rounded-[12px] border border-dashed border-black/15 p-[16px]">
        {children}
      </div>
    </div>
  );
}

function NumberedRow() {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Numbered group
        </h2>
        <p
          className="mt-1 text-[12px] leading-[16px] text-black/40"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          8 slots · Figma reference
        </p>
      </div>
      <div className="flex min-w-[358px] flex-1 flex-col gap-[20px]">
        <Labeled label="static">
          <Group>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <GroupItem key={n}>
                <NumberCircle n={n} />
              </GroupItem>
            ))}
          </Group>
        </Labeled>
        <Labeled label="interactive — hover an item">
          <Group>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <GroupItem
                key={n}
                onClick={() => undefined}
                aria-label={`Step ${n}`}
              >
                <NumberCircle n={n} />
              </GroupItem>
            ))}
          </Group>
        </Labeled>
      </div>
    </section>
  );
}

function MixedRow() {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Mixed content
        </h2>
        <p
          className="mt-1 text-[12px] leading-[16px] text-black/40"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          icon + label combos
        </p>
      </div>
      <div className="flex min-w-[358px] flex-1 flex-col gap-[20px]">
        <Labeled label="icons with text">
          <Group>
            {["Steps", "Stages", "Tasks", "Milestones"].map((label, i) => (
              <GroupItem key={label} onClick={() => undefined}>
                <NumberCircle n={i + 1} />
                <span
                  className="text-[13px] leading-[16px] text-black"
                  style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
                >
                  {label}
                </span>
              </GroupItem>
            ))}
          </Group>
        </Labeled>
        <Labeled label="wraps when it overflows the parent">
          <div className="max-w-[360px]">
            <Group>
              {Array.from({ length: 14 }).map((_, i) => (
                <GroupItem key={i}>
                  <NumberCircle n={(i % 8) + 1} />
                </GroupItem>
              ))}
            </Group>
          </div>
        </Labeled>
      </div>
    </section>
  );
}

function GapRow() {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Gap
        </h2>
        <p
          className="mt-1 text-[12px] leading-[16px] text-black/40"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          override default 8px
        </p>
      </div>
      <div className="flex min-w-[358px] flex-1 flex-col gap-[20px]">
        {[0, 4, 8, 12, 20].map((gap) => (
          <Labeled key={gap} label={`gap={${gap}}`}>
            <Group gap={gap}>
              {[1, 2, 3, 4, 5].map((n) => (
                <GroupItem key={n}>
                  <NumberCircle n={n} />
                </GroupItem>
              ))}
            </Group>
          </Labeled>
        ))}
      </div>
    </section>
  );
}

function AxesMatrixRow() {
  const counts = [1, 2, 3, 4, 5, 6, 7, 8];
  const axes: Array<{ label: string; vertical: boolean; reverse: boolean }> = [
    { label: "horizontal · normal", vertical: false, reverse: false },
    { label: "horizontal · reverse", vertical: false, reverse: true },
    { label: "vertical · normal", vertical: true, reverse: false },
    { label: "vertical · reverse", vertical: true, reverse: true },
  ];

  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Full axes matrix
        </h2>
        <p
          className="mt-1 text-[12px] leading-[16px] text-black/40"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          vertical × reverse · counts 1 → 8
        </p>
      </div>
      <div className="grid min-w-[358px] flex-1 grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[20px]">
        {axes.map((axis) => (
          <Labeled key={axis.label} label={axis.label}>
            <div className="flex flex-col gap-[12px]">
              {counts.map((n) => (
                <div
                  key={n}
                  className={`flex ${axis.vertical ? "flex-col" : "flex-col"} gap-[6px]`}
                >
                  <span
                    className="font-mono text-[10px] leading-[12px] text-black/30"
                    style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
                  >
                    count={n}
                  </span>
                  <Group vertical={axis.vertical} reverse={axis.reverse}>
                    {Array.from({ length: n }).map((_, i) => (
                      <GroupItem key={i}>
                        <NumberCircle n={((i) % 8) + 1} />
                      </GroupItem>
                    ))}
                  </Group>
                </div>
              ))}
            </div>
          </Labeled>
        ))}
      </div>
    </section>
  );
}

function PropsTableRow() {
  const groupProps = [
    { name: "gap", type: "number", default: "8", description: "Gap between items in px." },
    { name: "vertical", type: "boolean", default: "false", description: "Stack items vertically (flex-col)." },
    { name: "reverse", type: "boolean", default: "false", description: "Align items to the end of the main axis." },
    { name: "children", type: "ReactNode", default: "—", description: "Group items." },
    { name: "className", type: "string", default: "—", description: "Merged with base classes." },
  ];
  const itemProps = [
    { name: "padding", type: "number", default: "4", description: "Internal padding around content." },
    { name: "onClick", type: "(e) => void", default: "—", description: "Promotes the item to a <button>." },
    { name: "children", type: "ReactNode", default: "—", description: "Slot content." },
    { name: "className", type: "string", default: "—", description: "Merged with base classes." },
    { name: "...rest", type: "button/div attrs", default: "—", description: "Native element attributes." },
  ];

  return (
    <>
      <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
        <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
          <h2
            className="text-[24px] leading-[32px] font-normal text-black"
            style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
          >
            Group props
          </h2>
        </div>
        <div className="flex min-w-[358px] flex-1 flex-col overflow-hidden rounded-[16px] border border-black/10">
          <div className="grid grid-cols-[minmax(0,140px)_minmax(0,1fr)_minmax(0,100px)_minmax(0,2fr)] bg-[#f9f9fa] px-4 py-2 text-[12px] leading-[16px] font-semibold text-black/60">
            <div>Name</div>
            <div>Type</div>
            <div>Default</div>
            <div>Description</div>
          </div>
          {groupProps.map((p) => (
            <div
              key={p.name}
              className="grid grid-cols-[minmax(0,140px)_minmax(0,1fr)_minmax(0,100px)_minmax(0,2fr)] items-start gap-x-4 border-t border-black/10 px-4 py-3 text-[13px] leading-[18px] text-black"
            >
              <code className="font-mono text-[13px] text-black">{p.name}</code>
              <code className="font-mono text-[13px] break-words text-black/70">{p.type}</code>
              <code className="font-mono text-[13px] text-black/70">{p.default}</code>
              <span>{p.description}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
        <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
          <h2
            className="text-[24px] leading-[32px] font-normal text-black"
            style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
          >
            GroupItem props
          </h2>
        </div>
        <div className="flex min-w-[358px] flex-1 flex-col overflow-hidden rounded-[16px] border border-black/10">
          <div className="grid grid-cols-[minmax(0,140px)_minmax(0,1fr)_minmax(0,100px)_minmax(0,2fr)] bg-[#f9f9fa] px-4 py-2 text-[12px] leading-[16px] font-semibold text-black/60">
            <div>Name</div>
            <div>Type</div>
            <div>Default</div>
            <div>Description</div>
          </div>
          {itemProps.map((p) => (
            <div
              key={p.name}
              className="grid grid-cols-[minmax(0,140px)_minmax(0,1fr)_minmax(0,100px)_minmax(0,2fr)] items-start gap-x-4 border-t border-black/10 px-4 py-3 text-[13px] leading-[18px] text-black"
            >
              <code className="font-mono text-[13px] text-black">{p.name}</code>
              <code className="font-mono text-[13px] break-words text-black/70">{p.type}</code>
              <code className="font-mono text-[13px] text-black/70">{p.default}</code>
              <span>{p.description}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default function GroupShowcasePage() {
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
              Group
            </h1>
            <p className="text-[14px] leading-[20px] text-black/40">
              <code className="rounded-[4px] bg-black/[0.04] px-[6px] py-[2px] font-mono text-[13px] text-black/70">
                @/components/base/group
              </code>
            </p>
          </div>
          <BrandLogo priority />
        </header>

        <div className="flex flex-col px-[40px]">
          {docRows.map((row) => (
            <DocRowItem key={row.title} row={row} />
          ))}
          <NumberedRow />
          <AxesMatrixRow />
          <MixedRow />
          <GapRow />
          <PropsTableRow />
        </div>
      </article>
    </div>
  );
}
