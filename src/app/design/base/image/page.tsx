"use client";

import NextImage from "next/image";
import { useState, type ReactNode } from "react";
import { Image, type ImageSize } from "@/components/base/image";
import { BrandLogo } from "@/components/brand/brand-logo";
import { brand } from "@/config/brand";

const SAMPLE_SRC = "/avatars/byewind.png";

const SIZES: ImageSize[] = [12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 72, 80];
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
          Image is a base component — a rounded image card with a size scale
          that mirrors Icon, plus optional selection affordance and a built-in
          hover shadow.
        </p>
        <p>
          The corner radius scales with the size: 4 → 8 → 12 → 16 → 20 as the
          card grows. Selection circles automatically reposition between the
          center (small sizes) and the top-right corner (32+).
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
          Pass <code>selectable</code> when the tile can be toggled — the card
          becomes a button and the selection circle appears on hover.
        </p>
        <p>
          Pass <code>selected</code> for the currently selected tile. Pass{" "}
          <code>placeholder</code> when no source is available yet to render a
          dashed icon frame at an appropriate sub-size.
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

type VariantRow = {
  label: string;
  caption: string;
  render: (size: ImageSize) => ReactNode;
};

function SizeGridRow({ variant }: { variant: VariantRow }) {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
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
          {variant.caption}
        </p>
      </div>
      <div className="flex min-w-[358px] flex-1 flex-wrap items-end gap-x-[20px] gap-y-[24px]">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <div className="flex min-h-[88px] items-center justify-center">
              {variant.render(size)}
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

function SelectableRow() {
  const [selected, setSelected] = useState<ImageSize | null>(48);
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Live — click to select
        </h2>
        <p
          className="mt-1 text-[12px] leading-[16px] text-black/40"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          selectable · one-at-a-time
        </p>
      </div>
      <div className="flex min-w-[358px] flex-1 flex-wrap items-end gap-x-[20px] gap-y-[24px]">
        {([24, 32, 48, 64, 80] as ImageSize[]).map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <div className="flex min-h-[96px] items-center justify-center">
              <Image
                size={size}
                src={SAMPLE_SRC}
                alt=""
                selectable
                selected={selected === size}
                onClick={() => setSelected(selected === size ? null : size)}
              />
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
    { name: "size", type: "12 | 16 | 20 | 24 | 28 | 32 | 40 | 48 | 56 | 64 | 72 | 80 | 'free'", default: "64", description: "Square dimension in px." },
    { name: "src", type: "string", default: "—", description: "Image source URL (passed to next/image)." },
    { name: "alt", type: "string", default: '""', description: "Alt text." },
    { name: "selectable", type: "boolean", default: "false", description: "Renders as button; shows select circle on hover." },
    { name: "selected", type: "boolean", default: "false", description: "Persistent hover shadow + filled circle." },
    { name: "placeholder", type: "boolean", default: "false", description: "Dashed icon placeholder when no src." },
    { name: "onClick", type: "(e) => void", default: "—", description: "Forwarded to wrapper button." },
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

const variantRows: VariantRow[] = [
  {
    label: "Default",
    caption: "with image",
    render: (size) => <Image size={size} src={SAMPLE_SRC} alt="" />,
  },
  {
    label: "Placeholder",
    caption: "no src — dashed icon",
    render: (size) => <Image size={size} placeholder />,
  },
  {
    label: "Selected",
    caption: "persistent shadow + filled circle",
    render: (size) => (
      <Image size={size} src={SAMPLE_SRC} alt="" selectable selected />
    ),
  },
];

export default function ImageShowcasePage() {
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
              Image
            </h1>
            <p className="text-[14px] leading-[20px] text-black/40">
              <code className="rounded-[4px] bg-black/[0.04] px-[6px] py-[2px] font-mono text-[13px] text-black/70">
                @/components/base/image
              </code>
            </p>
          </div>
          <BrandLogo priority />
        </header>

        <div className="flex flex-col px-[40px]">
          {docRows.map((row) => (
            <DocRowItem key={row.title} row={row} />
          ))}
          {variantRows.map((variant) => (
            <SizeGridRow key={variant.label} variant={variant} />
          ))}
          <SelectableRow />
          <PropsTableRow />
        </div>
      </article>
    </div>
  );
}
