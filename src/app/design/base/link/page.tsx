import type { ReactNode } from "react";
import { Link } from "@/components/base/link";
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
      <>
        <p>
          Link is a base component — an <code>&lt;a&gt;</code> styled with the
          indigo accent color. It signals navigational or external references
          inline within body copy.
        </p>
        <p>
          Resting state uses <code>#adadfb</code> (secondary/indigo). On hover
          the color transitions to <code>#232332</code> for feedback.
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
          Use Link for inline references only. For call-to-action navigation,
          reach for Button instead.
        </p>
        <p>
          Always include <code>rel=&quot;noreferrer&quot;</code> when pointing
          to external URLs. For client-side routing, wrap Link with Next&apos;s{" "}
          <code>&lt;Link&gt;</code>.
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

function Labeled({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
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

function StatesRow() {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 py-[28px] border-b border-b-black/10">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          States
        </h2>
        <p
          className="mt-1 text-[12px] leading-[16px] text-black/40"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          default · hover
        </p>
      </div>
      <div className="grid min-w-[358px] flex-1 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[20px]">
        <Labeled label="Default">
          <Link href="#default">Link</Link>
        </Labeled>
        <Labeled label="Hover — force the dark color">
          {/* The :hover selector can't be triggered statically, so this
              demo mirrors the hover color via a native tailwind class on a
              span to preview the end state. */}
          <span
            className="rounded-[12px] text-[14px] leading-[20px] font-normal text-[#232332]"
            style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
          >
            Link
          </span>
        </Labeled>
        <Labeled label="Live — hover me to see transition">
          <Link href="#live">Link</Link>
        </Labeled>
      </div>
    </section>
  );
}

function InlineRow() {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 py-[28px] border-b border-b-black/10">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Inline in copy
        </h2>
        <p
          className="mt-1 text-[12px] leading-[16px] text-black/40"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Within body paragraphs
        </p>
      </div>
      <div className="flex min-w-[358px] flex-1 flex-col gap-3">
        <p
          className="text-[14px] leading-[20px] text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Read more about variables on{" "}
          <Link href={brand.url} target="_blank" rel="noreferrer">
            Design docs
          </Link>
          <Link
            href={brand.url}
            target="_blank"
            rel="noreferrer"
            aria-hidden
          >
            ↗
          </Link>
          , or switch to the{" "}
          <Link href="/design">internal design index</Link>.
        </p>
      </div>
    </section>
  );
}

function PropsTableRow() {
  const props = [
    { name: "href", type: "string", default: "—", description: "Target URL (any <a> href)." },
    { name: "target", type: 'string — e.g. "_blank"', default: "—", description: "Standard anchor target." },
    { name: "rel", type: "string", default: "—", description: 'Use "noreferrer" for external URLs.' },
    { name: "children", type: "ReactNode", default: "—", description: "Visible link label." },
    { name: "className", type: "string", default: "—", description: "Merged with the base styles." },
    { name: "...rest", type: 'anchor attrs', default: "—", description: "Any other <a> attribute (onClick, aria-*)." },
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
        <div className="grid grid-cols-[minmax(0,140px)_minmax(0,1fr)_minmax(0,100px)_minmax(0,2fr)] bg-[#f9f9fa] px-4 py-2 text-[12px] leading-[16px] font-semibold text-black/60">
          <div>Name</div>
          <div>Type</div>
          <div>Default</div>
          <div>Description</div>
        </div>
        {props.map((p) => (
          <div
            key={p.name}
            className="grid grid-cols-[minmax(0,140px)_minmax(0,1fr)_minmax(0,100px)_minmax(0,2fr)] items-start gap-x-4 border-t border-black/10 px-4 py-3 text-[13px] leading-[18px] text-black"
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

export default function LinkShowcasePage() {
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
              Link
            </h1>
            <p className="text-[14px] leading-[20px] text-black/40">
              <code className="rounded-[4px] bg-black/[0.04] px-[6px] py-[2px] font-mono text-[13px] text-black/70">
                @/components/base/link
              </code>
            </p>
          </div>
          <BrandLogo priority />
        </header>

        <div className="flex flex-col px-[40px]">
          {docRows.map((row) => (
            <DocRowItem key={row.title} row={row} />
          ))}
          <StatesRow />
          <InlineRow />
          <PropsTableRow />
        </div>
      </article>
    </div>
  );
}
