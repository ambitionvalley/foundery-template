import {
  Broadcast,
  BugBeetle,
  User,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";

export type NotificationItem = {
  /** 20x20 leading glyph drawn inside a 32x32 4%-black rounded-8 tile. */
  icon?: ReactNode;
  /** Primary label. */
  title: ReactNode;
  /** Secondary timestamp — e.g. "Just now". */
  time: ReactNode;
  /** Highlight the row with the 4%-black surface. */
  active?: boolean;
};

export type NotificationsProps = {
  title?: ReactNode;
  items?: NotificationItem[];
  /**
   * `card` — the default glassy popover (248px, shadow, backdrop blur).
   * `flat` — transparent, full-width; for embedding inside the dashboard
   * right rail or similar section.
   */
  variant?: "card" | "flat";
  className?: string;
};

const TEXT_STYLE = { fontFeatureSettings: "'ss01' 1, 'cv01' 1" as const };

function IconTile({ glyph: Glyph }: { glyph: PhosphorIcon }) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-black/[0.04]">
      <Glyph size={20} weight="duotone" />
    </span>
  );
}

const DEFAULT_ITEMS: NotificationItem[] = [
  { icon: <IconTile glyph={BugBeetle} />, title: "You fixed a bug.", time: "Just now" },
  { icon: <IconTile glyph={User} />, title: "New user registeRed.", time: "59 minutes ago" },
  { icon: <IconTile glyph={BugBeetle} />, title: "You fixed a bug.", time: "12 hours ago" },
  { icon: <IconTile glyph={Broadcast} />, title: "Andi Lane subscribed to you.", time: "Today, 11:59 AM" },
];

function Row({ icon, title, time, active }: NotificationItem) {
  return (
    <div
      className={`flex h-[52px] w-full items-center gap-2 rounded-[12px] p-2 ${
        active ? "bg-black/[0.04]" : ""
      }`}
    >
      {icon}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <span
          className="truncate text-[14px] leading-[20px] text-black"
          style={TEXT_STYLE}
        >
          {title}
        </span>
        <span
          className="truncate text-[12px] leading-[16px] text-black/40"
          style={TEXT_STYLE}
        >
          {time}
        </span>
      </div>
    </div>
  );
}

const SHELL = {
  card: "w-[248px] rounded-[24px] bg-white/90 p-5 shadow-[0_8px_28px_0_rgba(0,0,0,0.1)] backdrop-blur-[40px]",
  flat: "w-full",
} as const;

/**
 * Notifications — heading + vertical stack of icon + title + timestamp
 * rows. `card` variant is a glassy popover; `flat` variant embeds inside
 * the dashboard right rail.
 */
export function Notifications({
  title = "Notifications",
  items = DEFAULT_ITEMS,
  variant = "card",
  className,
}: NotificationsProps) {
  return (
    <div
      className={`flex flex-col gap-1 ${SHELL[variant]} ${className ?? ""}`}
    >
      <div className="flex h-9 items-center rounded-[12px] px-1 py-2">
        <span
          className="text-[14px] leading-[20px] text-black"
          style={TEXT_STYLE}
        >
          {title}
        </span>
      </div>
      {items.map((item, i) => (
        <Row key={i} {...item} />
      ))}
    </div>
  );
}
