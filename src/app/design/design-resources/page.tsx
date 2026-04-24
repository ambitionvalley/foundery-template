import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { brand } from "@/config/brand";

type DocRow = {
  title: string;
  body: ReactNode;
  accent?: boolean;
  divider?: "hairline" | "emphasis" | "none";
  padding?: "default" | "spacer-top" | "spacer-top-bottom";
};

const docRows: DocRow[] = [
  {
    title: "Introduction",
    accent: true,
    body: (
      <>
        <p>
          Design resources include Charts, Icons, Avatars, Logos, Emoji,
          Illustrations, etc., but not limited to these.
        </p>
        <p>Design resources are not constrained by design system rules.</p>
      </>
    ),
  },
  {
    title: "Rules of use",
    accent: true,
    body: (
      <>
        <p>
          The design resources in this component library are designed to
          integrate with the overall design system; use them according to your
          design needs.
        </p>
        <p>&nbsp;</p>
        <p>
          You can add other design resources, but please make sure that their
          design styles fit the system.
        </p>
      </>
    ),
  },
  {
    title: "How to use",
    accent: true,
    divider: "emphasis",
    body: (
      <>
        <p>
          All design resources are published as component libraries.
        </p>
        <p>
          You can use the component library locally, or as an online component
          library (default).
        </p>
        <p>
          When used as an online component library, you will receive update
          notifications. Usually these updates will not affect your design, but
          there will inevitably be exceptions. Using it as a local component
          library is the safer option.
        </p>
        <p>&nbsp;</p>
        <p>
          <a
            href="https://www.youtube.com/watch?v=GQ2jztKpxLk&ab_channel=Figma"
            target="_blank"
            rel="noreferrer"
            className="text-[#95a4fc] hover:underline"
          >
            How to switch component libraries
          </a>
          <span className="text-[#95a4fc]"> ↗</span>
        </p>
      </>
    ),
  },
  {
    title: "Charts",
    padding: "spacer-top",
    body: (
      <p>
        I found that the data graphics of charts are difficult to create rich
        chart styles with a few simple components, so I put the data graphics
        into design resources.
      </p>
    ),
  },
  {
    title: "Icons",
    body: <p>We use Phosphor Icons by default; swap in another library if you prefer.</p>,
  },
  {
    title: "Avatars",
    body: <p>Avatars are from Figma community and Unsplash.</p>,
  },
  {
    title: "Logos",
    body: <p>Logos are from Figma community.</p>,
  },
  {
    title: "Emoji",
    body: (
      <p>
        Emoji are from Fluent emoji, you can find the full version in Figma
        community.
      </p>
    ),
  },
  {
    title: "Illustrations",
    divider: "none",
    padding: "spacer-top-bottom",
    body: <p>Illustrations are free resources from Figma community.</p>,
  },
];

function DocRowItem({ row }: { row: DocRow }) {
  const padding =
    row.padding === "spacer-top"
      ? "pt-[48px] pb-[28px]"
      : row.padding === "spacer-top-bottom"
        ? "pt-[28px] pb-[48px]"
        : row.divider === "emphasis"
          ? "pt-[28px] pb-[48px]"
          : "py-[28px]";

  const border =
    row.divider === "none"
      ? ""
      : row.divider === "emphasis"
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
          className="flex flex-col text-[14px] leading-[20px] text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          {row.body}
        </div>
      </div>
    </section>
  );
}

export default function DesignResourcesPage() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-4 sm:p-8 lg:p-12">
      <article className="flex w-full max-w-[1440px] flex-col overflow-hidden rounded-[40px] bg-white p-[28px]">
        <header className="flex flex-wrap items-start justify-between gap-6 rounded-[28px] bg-[#f9f9fa] p-[40px]">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <h1
              className="text-[48px] font-semibold leading-[56px] tracking-[0] text-black"
              style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
            >
              Design Resources
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] leading-[20px] text-black/40">
              <a
                className="cursor-pointer hover:underline"
                href={brand.url}
                target="_blank"
                rel="noreferrer"
              >
                Design docs
                <span className="ml-0.5">↗</span>
              </a>
              <a
                className="cursor-pointer hover:underline"
                href="https://www.figma.com/file/bwa7U96g5J1yyQVakRTmDo"
                target="_blank"
                rel="noreferrer"
              >
                Design resources
                <span className="ml-0.5">↗</span>
              </a>
            </div>
          </div>
          <BrandLogo priority />
        </header>

        <div className="flex flex-col px-[40px]">
          {docRows.map((row) => (
            <DocRowItem key={row.title} row={row} />
          ))}
        </div>
      </article>
    </div>
  );
}
