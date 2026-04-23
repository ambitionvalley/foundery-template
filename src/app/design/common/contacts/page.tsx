import NextImage from "next/image";
import type { ReactNode } from "react";
import { Contacts, type ContactItem } from "@/components/common/contacts";

function SnowUILogo() {
  return (
    <div className="flex items-center gap-[6px]" aria-label="SnowUI">
      <NextImage src="/figma/snowui-logo.svg" alt="" width={28} height={28} priority />
      <div className="relative h-[12px] w-[71px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma/snowui-wordmark-left.svg" alt="" width={53} height={12} className="absolute top-0 left-0 block" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma/snowui-wordmark-right.svg" alt="" width={15} height={12} className="absolute top-0 block" style={{ left: "56px" }} />
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
      <p>
        Contacts is a glassy sidebar card — a heading plus a stack of
        avatar + name rows. Typical uses: team presence panels, starred
        people lists, recent-collaborators widgets.
      </p>
    ),
  },
  {
    title: "Rules of use",
    accent: true,
    body: (
      <p>
        Surface is translucent white with a 40px backdrop blur and a soft
        drop shadow, so it composes cleanly over coloured or image
        backgrounds. Avatars fall back to an empty <code>black/4%</code>{" "}
        circle when no image is provided. Pass <code>items</code> to drive
        the list from your own data.
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

const SHORT_ITEMS: ContactItem[] = [
  { name: "ByeWind", avatar: "/figma/avatars/byewind.png" },
  { name: "Natali Craig", avatar: "/figma/avatars/natali-craig.png" },
];

const FALLBACK_ITEMS: ContactItem[] = [
  { name: "Unassigned" },
  { name: "Pending invite" },
  { name: "Draft user" },
];

/** 1:1 reproduction of the Figma canvas (288×396). */
function FigmaCanvasRow() {
  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2 className="text-[24px] leading-[32px] font-normal text-black" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
          All variants
        </h2>
        <p className="mt-1 text-[12px] leading-[16px] text-black/40" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
          default · custom title · avatar-less fallback
        </p>
      </div>
      <div className="flex min-w-[358px] flex-1 flex-col items-start overflow-x-auto">
        <div
          className="relative rounded-[12px] border border-dashed border-black/15 bg-[#f9f9fa]"
          style={{ width: 864, height: 396 }}
        >
          <div className="absolute" style={{ left: 20, top: 20 }}>
            <Contacts />
          </div>
          <div className="absolute" style={{ left: 308, top: 20 }}>
            <Contacts title="Starred" items={SHORT_ITEMS} />
          </div>
          <div className="absolute" style={{ left: 596, top: 20 }}>
            <Contacts title="Team" items={FALLBACK_ITEMS} />
          </div>
        </div>
      </div>
    </section>
  );
}

function PropsTableRow() {
  const props = [
    { name: "title", type: "string", default: '"Contacts"', description: "Heading shown above the list." },
    { name: "items", type: "ContactItem[]", default: "5 demo contacts", description: "Rows to render, in order." },
    { name: "className", type: "string", default: "—", description: "Merged with base classes." },
  ];

  const itemProps = [
    { name: "name", type: "string", default: "—", description: "Display name." },
    { name: "avatar", type: "string", default: "—", description: "Avatar image URL. Empty circle when omitted." },
  ];

  return (
    <section className="flex w-full flex-wrap items-start gap-x-1 gap-y-4 border-b border-b-black/10 py-[28px]">
      <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-start pt-2">
        <h2 className="text-[24px] leading-[32px] font-normal text-black" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
          Props
        </h2>
      </div>
      <div className="flex min-w-[358px] flex-1 flex-col gap-4">
        <div className="flex flex-col overflow-hidden rounded-[16px] border border-black/10">
          <div className="grid grid-cols-[minmax(0,140px)_minmax(0,1fr)_minmax(0,160px)_minmax(0,2fr)] bg-[#f9f9fa] px-4 py-2 text-[12px] leading-[16px] font-semibold text-black/60">
            <div>Name</div>
            <div>Type</div>
            <div>Default</div>
            <div>Description</div>
          </div>
          {props.map((p) => (
            <div
              key={p.name}
              className="grid grid-cols-[minmax(0,140px)_minmax(0,1fr)_minmax(0,160px)_minmax(0,2fr)] items-start gap-x-4 border-t border-black/10 px-4 py-3 text-[13px] leading-[18px] text-black"
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
            ContactItem
          </div>
          <div className="grid grid-cols-[minmax(0,140px)_minmax(0,1fr)_minmax(0,120px)_minmax(0,2fr)] border-t border-black/10 bg-[#f9f9fa] px-4 py-2 text-[12px] leading-[16px] font-semibold text-black/60">
            <div>Name</div>
            <div>Type</div>
            <div>Default</div>
            <div>Description</div>
          </div>
          {itemProps.map((p) => (
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

export default function ContactsShowcasePage() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-4 sm:p-8 lg:p-12">
      <article className="flex w-full max-w-[1440px] flex-col overflow-hidden rounded-[40px] bg-white p-[28px]">
        <header className="flex flex-wrap items-start justify-between gap-6 rounded-[28px] bg-[#f9f9fa] p-[40px]">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="text-[14px] leading-[20px] text-[#adadfb]" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
              Common components
            </div>
            <h1 className="text-[48px] leading-[56px] font-semibold tracking-[0] text-black" style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}>
              Contacts
            </h1>
            <p className="text-[14px] leading-[20px] text-black/40">
              <code className="rounded-[4px] bg-black/[0.04] px-[6px] py-[2px] font-mono text-[13px] text-black/70">
                @/components/common/contacts
              </code>
            </p>
          </div>
          <SnowUILogo />
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
