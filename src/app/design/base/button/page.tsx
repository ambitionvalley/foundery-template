"use client";

import type { ReactNode } from "react";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/base/button";
import { BrandLogo } from "@/components/brand/brand-logo";
import { brand } from "@/config/brand";

const SIZES: ButtonSize[] = ["small", "medium", "large"];
const VARIANTS: ButtonVariant[] = ["borderless", "gray", "outline", "filled"];

type ContentCombo = {
  id: string;
  label: string;
  left: boolean;
  text: boolean;
  right: boolean;
};

const CONTENT_COMBOS: ContentCombo[] = [
  { id: "L+T+R", label: "left + text + right", left: true, text: true, right: true },
  { id: "L+T", label: "left + text", left: true, text: true, right: false },
  { id: "T+R", label: "text + right", left: false, text: true, right: true },
  { id: "T", label: "text only", left: false, text: true, right: false },
  { id: "L+R", label: "left + right (no text)", left: true, text: false, right: true },
  { id: "L", label: "icon only", left: true, text: false, right: false },
];

// A placeholder icon that mirrors the dashed DefaultIcon from Figma.
function Glyph({ invert = false, size = 16 }: { invert?: boolean; size?: number }) {
  const radius = size <= 12 ? 4 : size <= 20 ? 4 : 8;
  return (
    <span
      aria-hidden
      className="block border-[0.5px] border-dashed"
      style={{
        width: size,
        height: size,
        borderColor: invert ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
        background: invert ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.04)",
        borderRadius: radius,
      }}
    />
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
          Button is the primary interaction primitive. It scales across three
          sizes and four visual weights so any action — from a destructive CTA
          to a nested inline action — has a clear pairing.
        </p>
        <p>
          The API mirrors native <code>&lt;button&gt;</code>: pass any
          attribute (<code>onClick</code>, <code>disabled</code>,{" "}
          <code>type</code>, <code>aria-*</code>) and slot icons via{" "}
          <code>leftIcon</code> and <code>rightIcon</code>.
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
          Use <code>filled</code> for the single primary action per view.{" "}
          <code>outline</code> and <code>gray</code> for secondary actions,{" "}
          <code>borderless</code> for tertiary / destructive links and inline
          actions.
        </p>
        <p>
          When <code>children</code> is omitted, supply an <code>aria-label</code>
          {" "}so icon-only buttons remain accessible.
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

function variantIconSize(size: ButtonSize): number {
  return size === "small" ? 12 : size === "medium" ? 16 : 20;
}

function renderButton({
  size,
  variant,
  combo,
  disabled,
}: {
  size: ButtonSize;
  variant: ButtonVariant;
  combo: ContentCombo;
  disabled: boolean;
}) {
  const iconSize = variantIconSize(size);
  const invert = variant === "filled" && !disabled;
  const icon = <Glyph invert={invert} size={iconSize} />;
  return (
    <Button
      size={size}
      variant={variant}
      leftIcon={combo.left ? icon : undefined}
      rightIcon={combo.right ? icon : undefined}
      aria-label={!combo.text ? "Action" : undefined}
      disabled={disabled}
    >
      {combo.text ? "Button" : undefined}
    </Button>
  );
}

type SectionProps = {
  size: ButtonSize;
  state: "default" | "disabled";
};

function FullMatrixSection({ size, state }: SectionProps) {
  const title = `${capitalize(size)} · ${capitalize(state)}`;
  const disabled = state === "disabled";
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          {title}
        </h2>
        <p
          className="mt-1 text-[12px] leading-[16px] text-black/40"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          4 variants × 6 content combos
        </p>
      </div>
      <div className="min-w-[358px] flex-1">
        <div className="overflow-hidden rounded-[16px] border border-black/10">
          {/* header row: variant labels */}
          <div
            className="grid gap-[1px] bg-black/5"
            style={{
              gridTemplateColumns: `minmax(0,120px) repeat(${VARIANTS.length}, minmax(0,1fr))`,
            }}
          >
            <div className="bg-[#f9f9fa] px-3 py-2 text-[12px] font-semibold text-black/60">
              Content
            </div>
            {VARIANTS.map((variant) => (
              <div
                key={variant}
                className="bg-[#f9f9fa] px-3 py-2 text-[12px] font-semibold text-black/60"
              >
                {variant}
              </div>
            ))}
          </div>
          {/* data rows: one per content combo */}
          {CONTENT_COMBOS.map((combo) => (
            <div
              key={combo.id}
              className="grid gap-[1px] bg-black/5"
              style={{
                gridTemplateColumns: `minmax(0,120px) repeat(${VARIANTS.length}, minmax(0,1fr))`,
              }}
            >
              <div className="flex items-center bg-white px-3 py-3">
                <code className="font-mono text-[12px] text-black/60">
                  {combo.id}
                </code>
              </div>
              {VARIANTS.map((variant) => (
                <div
                  key={variant}
                  className="flex items-center bg-white px-3 py-3"
                >
                  {renderButton({ size, variant, combo, disabled })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HoverPreviewRow() {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2
          className="text-[24px] leading-[32px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Hover state
        </h2>
        <p
          className="mt-1 text-[12px] leading-[16px] text-black/40"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          live — hover any button
        </p>
      </div>
      <div className="flex min-w-[358px] flex-1 flex-col gap-[20px]">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span
              className="text-[12px] leading-[16px] text-black/40"
              style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
            >
              {size}
            </span>
            <div className="flex flex-wrap items-center gap-[12px] rounded-[12px] border border-dashed border-black/15 p-[16px]">
              {VARIANTS.map((variant) => (
                <Button
                  key={variant}
                  size={size}
                  variant={variant}
                  leftIcon={<Glyph invert={variant === "filled"} size={variantIconSize(size)} />}
                  rightIcon={<Glyph invert={variant === "filled"} size={variantIconSize(size)} />}
                >
                  Button
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PropsTableRow() {
  const props = [
    { name: "size", type: '"small" | "medium" | "large"', default: '"medium"', description: "Height 24 / 36 / 48 px." },
    { name: "variant", type: '"filled" | "outline" | "gray" | "borderless"', default: '"filled"', description: "Visual weight." },
    { name: "leftIcon", type: "ReactNode", default: "—", description: "Leading icon slot." },
    { name: "rightIcon", type: "ReactNode", default: "—", description: "Trailing icon slot." },
    { name: "children", type: "ReactNode", default: "—", description: "Text label. Omit for icon-only." },
    { name: "disabled", type: "boolean", default: "false", description: "Native disabled + faded content." },
    { name: "...rest", type: "button attrs", default: "—", description: "onClick, type, aria-*, form, etc." },
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

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function ButtonShowcasePage() {
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
              Button
            </h1>
            <p className="text-[14px] leading-[20px] text-black/40">
              <code className="rounded-[4px] bg-black/[0.04] px-[6px] py-[2px] font-mono text-[13px] text-black/70">
                @/components/base/button
              </code>
            </p>
          </div>
          <BrandLogo priority />
        </header>

        <div className="flex flex-col px-[40px]">
          {docRows.map((row) => (
            <DocRowItem key={row.title} row={row} />
          ))}
          <FullMatrixSection size="small" state="default" />
          <FullMatrixSection size="medium" state="default" />
          <FullMatrixSection size="large" state="default" />
          <HoverPreviewRow />
          <FullMatrixSection size="small" state="disabled" />
          <FullMatrixSection size="medium" state="disabled" />
          <FullMatrixSection size="large" state="disabled" />
          <PropsTableRow />
        </div>
      </article>
    </div>
  );
}
