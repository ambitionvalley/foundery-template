import type { ReactNode } from "react";
import { Activities, type ActivitiesProps } from "@/components/common/activities";
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
        Activities is a feed card — a small heading above a column of rows
        pairing a round avatar with a two-line label and timestamp. Typical
        uses: recent changes, audit trails, team activity widgets.
      </p>
    ),
  },
  {
    title: "Rules of use",
    accent: true,
    body: (
      <p>
        The surface uses translucent white (90%) with a soft
        <code>0 8 28 rgba(0,0,0,0.1)</code> shadow and a 20px backdrop blur, so
        it composes over any background. Avatars are 24px circles on a 4% black
        shell; rows share a 12px hover surface and never a divider — visual
        grouping comes from the card alone.
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

// 1:1 Figma reproduction: 4 variants (counts 5 / 3 / 1 + a custom title + items)
// laid out on a 1140×380 canvas, card width 248 + 20 gutter ⇒ pitch 268.
const VARIANTS: { x: number; label: string; props: ActivitiesProps }[] = [
  { x: 20, label: "default (5)", props: { count: 5 } },
  { x: 288, label: "count = 3", props: { count: 3 } },
  { x: 556, label: "count = 1", props: { count: 1 } },
  {
    x: 824,
    label: "custom",
    props: {
      title: "Team",
      items: [
        { avatar: "/figma/avatar-female-03.png", label: "Merged PR #482.", time: "2m" },
        { avatar: "/figma/avatar-3d-03.png", label: "Shipped onboarding v2.", time: "1h" },
        { avatar: "/figma/avatar-male-02.png", label: "Resolved 3 tickets.", time: "Today" },
      ],
    },
  },
];

function FigmaCanvasRow() {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2 className="text-[24px] leading-[32px] font-normal text-black" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
          All variants
        </h2>
        <p className="mt-1 text-[12px] leading-[16px] text-black/40" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
          default · count 3 · count 1 · custom items
        </p>
      </div>
      <div className="flex min-w-[358px] flex-1 flex-col items-start overflow-x-auto">
        <div
          className="relative rounded-[12px] border border-dashed border-black/15 bg-[#f9f9fa]"
          style={{ width: 1140, height: 400 }}
        >
          {VARIANTS.map((v) => (
            <div key={v.label} className="absolute" style={{ left: v.x, top: 20 }}>
              <Activities {...v.props} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PropsTableRow() {
  const props = [
    { name: "title", type: "ReactNode", default: '"Activities"', description: "Heading rendered above the rows." },
    { name: "items", type: "ActivityItem[]", default: "—", description: "Activity rows. Overrides the Figma-parity defaults." },
    { name: "count", type: "1 | 2 | 3 | 4 | 5", default: "5", description: "Fallback row count when items is omitted." },
    { name: "className", type: "string", default: "—", description: "Merged with the card's base classes." },
  ];

  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2 className="text-[24px] leading-[32px] font-normal text-black" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
          Props
        </h2>
        <p className="mt-1 text-[12px] leading-[16px] text-black/40" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
          <code className="rounded-[4px] bg-black/[0.06] px-[4px] py-[1px] font-mono text-[13px]">
            ActivityItem = {"{ avatar?, label, time? }"}
          </code>
        </p>
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

export default function ActivitiesShowcasePage() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-4 sm:p-8 lg:p-12">
      <article className="flex w-full max-w-[1440px] flex-col overflow-hidden rounded-[40px] bg-white p-[28px]">
        <header className="flex flex-wrap items-start justify-between gap-6 rounded-[28px] bg-[#f9f9fa] p-[40px]">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="text-[14px] leading-[20px] text-[#adadfb]" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
              Common components
            </div>
            <h1 className="text-[48px] leading-[56px] font-semibold tracking-[0] text-black" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
              Activities
            </h1>
            <p className="text-[14px] leading-[20px] text-black/40">
              <code className="rounded-[4px] bg-black/[0.04] px-[6px] py-[2px] font-mono text-[13px] text-black/70">
                @/components/common/activities
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
