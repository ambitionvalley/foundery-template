import NextImage from "next/image";
import type { ReactNode } from "react";
import { Icon } from "@/components/base/icon";
import { IconText } from "@/components/base/icon-text";

function SnowUILogo() {
  return (
    <div className="flex items-center gap-[6px]" aria-label="SnowUI">
      <NextImage
        src="/figma/snowui-logo.svg"
        alt=""
        width={28}
        height={28}
        priority
      />
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
          IconText is a base component — a consistent pairing of an icon slot
          and a text label. Two boolean axes give you four layouts:{" "}
          <code>vertical</code> and <code>flip</code>.
        </p>
        <p>
          It&apos;s the primitive behind list items, menu rows, tabs, and any
          label-with-icon affordance. Typography is fixed at 14/20 Inter
          Regular; the gap is a design-system-standard 8px.
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
          Use <code>flip</code> when the icon trails the text — e.g. a chevron
          that opens a panel, an external-link arrow.
        </p>
        <p>
          Use <code>vertical</code> for tile-style entries (nav cards, app
          drawer items) where the icon sits above the label.
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

function VariantMatrix() {
  const sampleIcon = <Icon size={16} />;
  const variants = [
    { vertical: false, flip: false, label: 'vertical={false} flip={false}', caption: "default — icon left" },
    { vertical: false, flip: true, label: 'vertical={false} flip={true}', caption: "icon right" },
    { vertical: true, flip: false, label: 'vertical={true} flip={false}', caption: "icon top" },
    { vertical: true, flip: true, label: 'vertical={true} flip={true}', caption: "icon bottom" },
  ] as const;

  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          All variants
        </h2>
        <p
          className="mt-1 text-[12px] leading-[16px] text-black/40"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          vertical × flip matrix
        </p>
      </div>
      <div className="grid min-w-[358px] flex-1 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[20px]">
        {variants.map((v) => (
          <Labeled key={v.label} label={v.caption}>
            <IconText vertical={v.vertical} flip={v.flip} icon={sampleIcon}>
              Text
            </IconText>
            <p
              className="mt-3 font-mono text-[11px] leading-[14px] text-black/40"
              style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
            >
              {v.label}
            </p>
          </Labeled>
        ))}
      </div>
    </section>
  );
}

function IconOnlyAndTextOnlyRow() {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Fallbacks
        </h2>
        <p
          className="mt-1 text-[12px] leading-[16px] text-black/40"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          omit icon or text
        </p>
      </div>
      <div className="grid min-w-[358px] flex-1 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[20px]">
        <Labeled label="text only">
          <IconText>Text</IconText>
        </Labeled>
        <Labeled label="icon only">
          <IconText icon={<Icon size={16} />} />
        </Labeled>
        <Labeled label="multi-word label">
          <IconText icon={<Icon size={16} />}>Open external link</IconText>
        </Labeled>
      </div>
    </section>
  );
}

function RealWorldRow() {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          In context
        </h2>
        <p
          className="mt-1 text-[12px] leading-[16px] text-black/40"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          menu row · tab · tile
        </p>
      </div>
      <div className="grid min-w-[358px] flex-1 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[20px]">
        <Labeled label="menu row">
          <div className="flex flex-col gap-[4px]">
            {["Dashboard", "Analytics", "Settings", "Team members"].map((l) => (
              <div
                key={l}
                className="rounded-[8px] px-[8px] py-[6px] transition-colors duration-150 hover:bg-black/[0.04]"
              >
                <IconText icon={<Icon size={16} />}>{l}</IconText>
              </div>
            ))}
          </div>
        </Labeled>
        <Labeled label="trailing chevron (flip)">
          <div className="flex flex-col gap-[4px]">
            {["Billing", "Privacy", "Export data"].map((l) => (
              <div
                key={l}
                className="flex items-center justify-between gap-4 rounded-[8px] px-[8px] py-[6px] transition-colors duration-150 hover:bg-black/[0.04]"
              >
                <span
                  className="text-[14px] leading-[20px] text-black"
                  style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
                >
                  {l}
                </span>
                <IconText icon={<Icon size={12} />} flip />
              </div>
            ))}
          </div>
        </Labeled>
        <Labeled label="tile (vertical)">
          <div className="flex flex-wrap gap-[12px]">
            {["Invite", "Import", "Publish", "Archive"].map((l) => (
              <div
                key={l}
                className="flex h-[88px] w-[96px] flex-col items-center justify-center rounded-[12px] bg-black/[0.04] transition-colors duration-150 hover:bg-black/[0.08]"
              >
                <IconText icon={<Icon size={20} />} vertical>
                  {l}
                </IconText>
              </div>
            ))}
          </div>
        </Labeled>
      </div>
    </section>
  );
}

function PropsTableRow() {
  const props = [
    { name: "icon", type: "ReactNode", default: "—", description: "Icon slot content." },
    { name: "children", type: "ReactNode", default: "—", description: "Text label." },
    { name: "vertical", type: "boolean", default: "false", description: "Stack icon and text vertically." },
    { name: "flip", type: "boolean", default: "false", description: "Place icon after text instead of before." },
    { name: "className", type: "string", default: "—", description: "Merged with base classes." },
  ];

  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
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
            <code className="font-mono text-[13px] break-words text-black/70">{p.type}</code>
            <code className="font-mono text-[13px] text-black/70">{p.default}</code>
            <span>{p.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function IconTextShowcasePage() {
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
              Icon &amp; Text
            </h1>
            <p className="text-[14px] leading-[20px] text-black/40">
              <code className="rounded-[4px] bg-black/[0.04] px-[6px] py-[2px] font-mono text-[13px] text-black/70">
                @/components/base/icon-text
              </code>
            </p>
          </div>
          <SnowUILogo />
        </header>

        <div className="flex flex-col px-[40px]">
          {docRows.map((row) => (
            <DocRowItem key={row.title} row={row} />
          ))}
          <VariantMatrix />
          <IconOnlyAndTextOnlyRow />
          <RealWorldRow />
          <PropsTableRow />
        </div>
      </article>
    </div>
  );
}
