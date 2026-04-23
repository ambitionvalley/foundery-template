import Image from "next/image";
import type { ReactNode } from "react";
import { Icon, type IconSize } from "@/components/base/icon";

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
          Icon is a base component — a consistent container around any icon
          glyph. It handles sizing, an optional subtle background card, and an
          optional status badge.
        </p>
        <p>
          Since the component only provides the frame, you pass the actual
          glyph as children. Without content, a dashed placeholder renders so
          the size is always visible during design.
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
          Use sizes from the shared scale only: 12, 16, 20, 24, 28, 32, 40, 48,
          80. The scale aligns with the Spacing & Size tokens.
        </p>
        <p>
          Enable <code>background</code> when the icon sits directly on a page
          surface and needs a contained hit area. Keep <code>badge</code> for
          status-like affordances (unread, new, changed).
        </p>
      </>
    ),
    divider: "emphasis",
  },
];

const SIZES: IconSize[] = [12, 16, 20, 24, 28, 32, 40, 48, 80];

type VariantRow = {
  label: string;
  background: boolean;
  badge: boolean;
};

const variantRows: VariantRow[] = [
  { label: "Default", background: false, badge: false },
  { label: "With background", background: true, badge: false },
  { label: "With badge", background: false, badge: true },
  { label: "With background + badge", background: true, badge: true },
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

function VariantShowcaseRow({ variant }: { variant: VariantRow }) {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 py-[28px] border-b border-b-black/10">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          {variant.label}
        </h2>
        <p
          className="mt-1 text-[12px] leading-[16px] text-black/40"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          {variant.background ? "background=true" : "background=false"}
          {" · "}
          {variant.badge ? "badge=true" : "badge=false"}
        </p>
      </div>
      <div className="flex min-w-[358px] flex-1 flex-wrap items-end gap-x-[24px] gap-y-[28px]">
        {SIZES.map((size) => (
          <div
            key={size}
            className="flex flex-col items-center gap-2"
            style={{ minWidth: Math.max(size + 16, 40) }}
          >
            <div className="flex min-h-[80px] items-center justify-center">
              <Icon size={size} background={variant.background} badge={variant.badge} />
            </div>
            <span
              className="text-[12px] leading-[16px] text-black/40"
              style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
            >
              {size}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function PropsTableRow() {
  const props = [
    { name: "size", type: "12 | 16 | 20 | 24 | 28 | 32 | 40 | 48 | 80", default: "24", description: "Icon box in px." },
    { name: "background", type: "boolean", default: "false", description: "Wrap in a subtle card." },
    { name: "badge", type: "boolean", default: "false", description: "Indigo status dot, top-right." },
    { name: "children", type: "ReactNode", default: "—", description: "Glyph content. Omit for dashed placeholder." },
    { name: "className", type: "string", default: "—", description: "Passed through to the outer wrapper." },
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

export default function IconShowcasePage() {
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
              Icon
            </h1>
            <p className="text-[14px] leading-[20px] text-black/40">
              <code className="rounded-[4px] bg-black/[0.04] px-[6px] py-[2px] font-mono text-[13px] text-black/70">
                @/components/base/icon
              </code>
            </p>
          </div>
          <SnowUILogo />
        </header>

        <div className="flex flex-col px-[40px]">
          {docRows.map((row) => (
            <DocRowItem key={row.title} row={row} />
          ))}
          {variantRows.map((variant) => (
            <VariantShowcaseRow key={variant.label} variant={variant} />
          ))}
          <PropsTableRow />
        </div>
      </article>
    </div>
  );
}
