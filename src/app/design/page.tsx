import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { brand } from "@/config/brand";

type DocEntry = {
  title: string;
  description: string;
  href?: string;
};

const docs: DocEntry[] = [
  {
    title: "Variables",
    description:
      "How we use variables for color, spacing, icon size, corner radius, and more.",
    href: "/design/variables",
  },
  {
    title: "Colors",
    description: "Light and dark color modes, semantic tokens, usage rules.",
    href: "/design/colors",
  },
  {
    title: "Text Styles",
    description: "Type scale, weights, line heights, and text styles.",
    href: "/design/text-styles",
  },
  {
    title: "Effect Styles",
    description: "Shadows, glows, glass, blur, and inner-shadow effects.",
    href: "/design/effect-styles",
  },
  {
    title: "Spacing, Size, Corner Radius",
    description:
      "Unified scale for gap/padding/margin, icon and control sizes, and radius tokens — all multiples of 4.",
    href: "/design/spacing-size-radius",
  },
  {
    title: "Components",
    description:
      "Design principles for base, common, chart, mobile, and page components.",
    href: "/design/components",
  },
  {
    title: "Design Resources",
    description:
      "Charts, icons, avatars, logos, emoji, and illustrations — outside the rules of the design system.",
    href: "/design/design-resources",
  },
];

type ComponentEntry = {
  title: string;
  description: string;
  href?: string;
};

const baseComponents: ComponentEntry[] = [
  {
    title: "Icon",
    description: "Sized container with optional background card and status badge.",
    href: "/design/base/icon",
  },
  {
    title: "Text",
    description: "Typography frame with vertical/horizontal slots and hover padding.",
    href: "/design/base/text",
  },
  {
    title: "Link",
    description: "Indigo inline anchor with a dark hover transition.",
    href: "/design/base/link",
  },
  {
    title: "Image",
    description: "Rounded image card with size scale, selection affordance, and hover shadow.",
    href: "/design/base/image",
  },
  {
    title: "Group",
    description: "Flex-wrap toolbar container for icon buttons, tag strips, and step rows.",
    href: "/design/base/group",
  },
  {
    title: "Button",
    description: "Primary interaction primitive — 3 sizes × 4 variants × icon slots.",
    href: "/design/base/button",
  },
  {
    title: "Icon & Text",
    description: "Composition pairing an icon slot with a 14/20 text label — vertical / flip axes.",
    href: "/design/base/icon-text",
  },
  {
    title: "Strip",
    description: "Segmented line — step indicators and timing breakdowns. 1–7 segments × horizontal/vertical.",
    href: "/design/base/strip",
  },
  {
    title: "Line",
    description: "Thin stroked divider — stacked parallels, vertical, or arrow connector variants.",
    href: "/design/base/line",
  },
  {
    title: "Tag",
    description: "Inline pill label — leading dot, dismiss × and arrow-shaped step variants.",
    href: "/design/base/tag",
  },
  {
    title: "Badge",
    description: "Status indicator — decorative indigo dot or numeric counter pill.",
    href: "/design/base/badge",
  },
  {
    title: "Status Badge",
    description: "Semantic status chip — 7 colours × dot/pill × small/big.",
    href: "/design/base/status-badge",
  },
  {
    title: "Frame",
    description: "Composition slot — icon + label with 8px gap, 12px hover surface.",
    href: "/design/base/frame",
  },
  {
    title: "Icon + Text + Icon",
    description: "Three-slot row — icon + label + standalone icon, with flip and vertical variants.",
    href: "/design/base/frame-icon-text-icon",
  },
  {
    title: "Text + Icon + Icon",
    description: "Label-first three-slot row — label + paired icon + standalone icon.",
    href: "/design/base/frame-text-icon-icon",
  },
  {
    title: "Icon + Text + Text",
    description: "Three-slot row — icon + primary label + secondary standalone text.",
    href: "/design/base/frame-icon-text-text",
  },
  {
    title: "Text + Icon + Text",
    description: "Label-first row — label + paired icon + standalone secondary text.",
    href: "/design/base/frame-text-icon-text",
  },
  {
    title: "Group + Text",
    description: "Button cluster paired with a label — toolbar rows, inline action sets.",
    href: "/design/base/frame-group-text",
  },
  {
    title: "Icon Slot",
    description: "Single-icon slot — the simplest Frame primitive with a 12px hover surface.",
    href: "/design/base/frame-icon",
  },
  {
    title: "Text Slot",
    description: "Single-label slot — Frame family's text counterpart to Icon Slot.",
    href: "/design/base/frame-text",
  },
];

const commonComponents: ComponentEntry[] = [
  {
    title: "Activities",
    description: "Feed card — heading over a column of avatar + label + timestamp rows on a translucent surface.",
    href: "/design/common/activities",
  },
  {
    title: "Slider",
    description: "Progress bar with draggable handle, inline label, and trailing percentage.",
    href: "/design/common/slider",
  },
  {
    title: "Notification",
    description: "Toast-style banner — success/failure icon + label on a translucent dark surface.",
    href: "/design/common/notification",
  },
  {
    title: "Tap",
    description: "Tab-style label with an active-state underline for switching peer views.",
    href: "/design/common/tap",
  },
  {
    title: "Tooltip",
    description: "Hover label with optional shortcut — dark gradient or light pill variants.",
    href: "/design/common/tooltip",
  },
  {
    title: "Tooltip / Anchor",
    description: "Tooltip anchored to a trigger on one of five sides (top / bottom / left / right / center).",
    href: "/design/common/tooltip-anchor",
  },
  {
    title: "Scroll Bar",
    description: "Decorative scroll thumb — 4px at rest, 8px on hover, with a subtle inner border.",
    href: "/design/common/scroll-bar",
  },
  {
    title: "Mask",
    description: "Soft pastel gradient block — placeholder / decorative surface.",
    href: "/design/common/mask",
  },
  {
    title: "Slider Bar",
    description: "Dual-handle range slider with flanking labels.",
    href: "/design/common/slider-bar",
  },
  {
    title: "Input",
    description: "Text field — 4 layouts × 4 states, with textarea and focus halo.",
    href: "/design/common/input",
  },
  {
    title: "Two Inputs",
    description: "Two joined input fields — horizontal or vertical, optional hover action.",
    href: "/design/common/input-two",
  },
  {
    title: "Three Inputs",
    description: "Three joined input fields — horizontal or vertical, optional hover action.",
    href: "/design/common/input-three",
  },
  {
    title: "Input Card",
    description: "Three joined fields tuned for a credit-card row — number + icon, expiry MM/YY, CVC.",
    href: "/design/common/input-card",
  },
  {
    title: "Address Input",
    description: "Stacked address form — country / street / state / city · ZIP.",
    href: "/design/common/input-address",
  },
  {
    title: "List Box",
    description: "Popover menu — glassy white surface with highlighted items.",
    href: "/design/common/list-box",
  },
  {
    title: "Card",
    description: "Selectable content card — 4 states × 1–4 lines × horizontal/vertical.",
    href: "/design/common/card",
  },
  {
    title: "Date Picker",
    description: "Calendar popover — date, date + time, range, range + time.",
    href: "/design/common/date-picker",
  },
  {
    title: "Search",
    description: "Search input — gray / outline surfaces × default / hover / focus, with a clear-button typing state.",
    href: "/design/common/search",
  },
  {
    title: "Search Popup",
    description: "Command-palette overlay — large search input with grouped results (recent, visited, contacts).",
    href: "/design/common/search-popup",
  },
  {
    title: "Notifications",
    description: "Glassy popover — Semibold heading + icon/title/time notification rows.",
    href: "/design/common/notifications",
  },
  {
    title: "Notifications / Anchor",
    description: "Trigger-anchored Notifications popover for the product header bell button.",
    href: "/design/common/notifications-anchor",
  },
  {
    title: "Contacts",
    description: "Glassy sidebar card — a heading plus a stack of avatar + name rows on a translucent surface.",
    href: "/design/common/contacts",
  },
  {
    title: "Quick Action",
    description: "Floating 120px menu card — up to 8 tap-target rows on a translucent white surface.",
    href: "/design/common/quick-action",
  },
];


function EntrySection({
  label,
  entries,
}: {
  label: string;
  entries: DocEntry[];
}) {
  return (
    <>
      <div className="border-t-[1.5px] border-b border-t-black/80 border-b-black/10 bg-white py-[20px]">
        <p
          className="text-[12px] leading-[16px] font-semibold tracking-[0.06em] text-black/50 uppercase"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          {label}
        </p>
      </div>
      {entries.map((entry, idx) => {
        const isLast = idx === entries.length - 1;
        const row = (
          <div
            className={`flex w-full flex-wrap items-start gap-x-1 gap-y-4 py-[28px] ${
              isLast ? "" : "border-b border-b-black/10"
            }`}
          >
            <div className="flex min-h-[40px] min-w-[200px] max-w-[320px] flex-1 flex-col justify-center">
              <h2
                className={`text-[24px] leading-[32px] font-normal ${
                  entry.href ? "text-[#adadfb]" : "text-black/40"
                }`}
                style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
              >
                {entry.title}
                {!entry.href && (
                  <span className="ml-2 align-middle text-[12px] tracking-wide text-black/30 uppercase">
                    Soon
                  </span>
                )}
              </h2>
            </div>
            <div className="flex min-w-[358px] flex-1 flex-col justify-center">
              <p
                className="text-[14px] leading-[20px] text-black"
                style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
              >
                {entry.description}
              </p>
            </div>
          </div>
        );

        return entry.href ? (
          <Link
            key={entry.title}
            href={entry.href}
            className="group transition-colors hover:bg-black/[0.02]"
          >
            {row}
          </Link>
        ) : (
          <div key={entry.title}>{row}</div>
        );
      })}
    </>
  );
}

export default function DesignIndexPage() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-4 sm:p-8 lg:p-12">
      <article className="flex w-full max-w-[1440px] flex-col overflow-hidden rounded-[40px] bg-white p-[28px]">
        <header className="flex flex-wrap items-start justify-between gap-6 rounded-[28px] bg-[#f9f9fa] p-[40px]">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <h1
              className="text-[48px] font-semibold leading-[56px] tracking-[0] text-black"
              style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
            >
              Design System
            </h1>
            <p className="text-[14px] leading-[20px] text-black/40">
              Documentation for the {brand.name} design system.
            </p>
          </div>
          <BrandLogo priority />
        </header>

        <nav className="flex flex-col px-[40px]">
          <EntrySection label="Foundations" entries={docs} />
          <EntrySection label="Base components" entries={baseComponents} />
          <EntrySection label="Common components" entries={commonComponents} />
        </nav>
      </article>
    </div>
  );
}
