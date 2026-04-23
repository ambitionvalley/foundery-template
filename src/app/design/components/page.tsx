import Image from "next/image";
import { Fragment, type ReactNode } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { brand } from "@/config/brand";

type DocRow = {
  title: ReactNode;
  body: ReactNode;
  accent?: boolean;
  divider?: "hairline" | "emphasis" | "none";
  padding?: "default" | "spacer-top" | "spacer-top-bottom";
};

type MiniButtonProps = {
  leading: ReactNode;
  iconSize?: number;
  buttonSize?: "compact" | "regular";
};

function MiniButton({ leading, buttonSize = "compact" }: MiniButtonProps) {
  const padding = buttonSize === "compact" ? "px-[12px] py-[4px]" : "px-[12px] py-[4px]";
  return (
    <div
      className={`flex min-h-[24px] min-w-[24px] items-center justify-center gap-[4px] rounded-[12px] bg-black ${padding}`}
    >
      <div className="flex shrink-0 items-center justify-center">{leading}</div>
      <div className="flex flex-col items-center justify-center">
        <p
          className="text-center text-[12px] leading-[16px] font-normal text-white"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Button
        </p>
      </div>
    </div>
  );
}

function DefaultIconPlaceholder() {
  return (
    <div
      className="size-[12px] shrink-0 rounded-[4px] border-[0.5px] border-dashed"
      style={{
        background: "rgba(255,255,255,0.1)",
        borderColor: "rgba(255,255,255,0.8)",
      }}
    />
  );
}

function AvatarSmall({ size = 12 }: { size?: number }) {
  return (
    <div
      className="shrink-0 overflow-clip"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: "rgba(255,255,255,0.1)",
        borderRadius: size === 12 ? "4px" : "80px",
      }}
    >
      <Image
        src="/figma/byewind-avatar.png"
        alt=""
        width={size}
        height={size}
        className="block size-full object-cover"
      />
    </div>
  );
}

type UsageExample = {
  button: ReactNode;
  description: string;
};

const usageExamples: UsageExample[] = [
  {
    button: <MiniButton leading={<DefaultIconPlaceholder />} />,
    description: "Button component",
  },
  {
    button: <MiniButton leading={<AvatarSmall size={12} />} />,
    description:
      "Replace Icon with avatar. Double-click to select the Icon, and replace the property with an avatar.",
  },
  {
    button: <MiniButton leading={<AvatarSmall size={24} />} />,
    description:
      "Change the size of the avatar. Double-click to select the Icon, and change the value of Size.",
  },
];

function ExamplesCard() {
  return (
    <div className="flex w-full flex-col gap-[4px] rounded-[20px] bg-[#f9f9fa] p-[20px]">
      <div className="w-full pb-[12px]">
        <p
          className="text-[14px] leading-[20px] font-semibold text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Examples of component usage
        </p>
      </div>
      {usageExamples.map((ex, i) => (
        <Fragment key={i}>
          <div className="flex w-full flex-wrap items-center gap-x-[20px] gap-y-[8px] px-[4px]">
            {ex.button}
            <div className="flex min-w-0 flex-[1_0_0] items-center">
              <p
                className="text-[14px] leading-[20px] text-black"
                style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
              >
                {ex.description}
              </p>
            </div>
          </div>
          {i < usageExamples.length - 1 && (
            <div className="w-[88px]">
              <p
                className="text-center text-[14px] leading-[20px] text-black"
                style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
              >
                ↓
              </p>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}

const docRows: DocRow[] = [
  {
    title: "Introduction",
    accent: true,
    body: (
      <div className="flex flex-col gap-[28px]">
        <div className="flex flex-col">
          <p>Components are a key part of a design system.</p>
          <p>&nbsp;</p>
          <p>
            To define Components, we have the following principles: 1. Widely
            used in the design. 2. The number of Components should be as small
            as possible.
          </p>
          <p>
            The design logic of {brand.name} components is to make the most
            frequently used combinations into base components, and then make
            other components and page elements from the base components.
          </p>
          <p>&nbsp;</p>
          <p>The benefits of doing this are:</p>
          <ul className="ms-[21px] list-disc">
            <li className="mb-[10px]">
              The extensibility of components is better. For example, you can
              replace the Icon in the button component with the avatar, and
              you don&apos;t need to add new components for this design.
            </li>
            <li className="mb-[10px]">
              The maintenance cost of components is less. For example, you
              only need to change the Icon component to change the size of all
              Icons.
            </li>
            <li>
              Maintaining the existing structure of components during design
              and development can give you more space to deal with uncertain
              product requirements in the future.
            </li>
          </ul>
        </div>
        <ExamplesCard />
      </div>
    ),
  },
  {
    title: "Rules of use",
    accent: true,
    body: (
      <>
        <p>
          Please minimize the number of Components to Reduce maintenance costs.
        </p>
        <p>
          90% principle: If Components used in a single product accounts for
          less than 10%, please do not include it in the design system.
        </p>
      </>
    ),
  },
  {
    title: "How to use",
    accent: true,
    divider: "emphasis",
    body: (
      <p>
        Components can be added, modified and deleted. Modifying them will
        affect all components and pages, please proceed with caution.
      </p>
    ),
  },
  {
    title: "Base Components",
    padding: "spacer-top",
    body: (
      <>
        <p>
          The base components of {brand.name}, they are the most frequently used
          components, and most of the page elements are made of them.
        </p>
        <p>
          In most cases you don&apos;t need to modify them, each base component
          has multiple variants, you can add more variants to meet your design
          needs.
        </p>
      </>
    ),
  },
  {
    title: "Common Components",
    body: <p>Common components other than base components.</p>,
  },
  {
    title: "Chart Components",
    body: <p>Components for making charts.</p>,
  },
  {
    title: "Mobile Components",
    body: (
      <p>
        Mobile components. Since the mobile design will use the{" "}
        <a
          href="https://www.figma.com/community/file/1248375255495415511"
          target="_blank"
          rel="noreferrer"
          className="text-[#adadfb] hover:underline"
        >
          Apple Design Resources – iOS 17 and iPadOS 17
        </a>
        <span className="text-[#adadfb]">↗</span> library, this part of the
        components is only a supplement.
      </p>
    ),
  },
  {
    title: "Page Components",
    divider: "none",
    padding: "spacer-top-bottom",
    body: (
      <p>
        Page-specific components. These components are usually only used on
        certain pages, they do not belong to the design system, but their
        design conforms to the design system rules.
      </p>
    ),
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

export default function ComponentsPage() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-4 sm:p-8 lg:p-12">
      <article className="flex w-full max-w-[1440px] flex-col overflow-hidden rounded-[40px] bg-white p-[28px]">
        <header className="flex flex-wrap items-start justify-between gap-6 rounded-[28px] bg-[#f9f9fa] p-[40px]">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <h1
              className="text-[48px] font-semibold leading-[56px] tracking-[0] text-black"
              style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
            >
              Components
            </h1>
            <p className="text-[14px] leading-[20px] text-black/40">
              <a
                className="cursor-pointer hover:underline"
                href={brand.url}
                target="_blank"
                rel="noreferrer"
              >
                Design docs
              </a>
              <span className="ml-0.5">↗</span>
            </p>
          </div>
          <BrandLogo priority />
        </header>

        <div className="flex flex-col px-[40px]">
          {docRows.map((row, i) => (
            <DocRowItem key={i} row={row} />
          ))}
        </div>
      </article>
    </div>
  );
}
