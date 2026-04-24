import type { ReactNode } from "react";

export type NotificationItem = {
  /** 20×20 leading glyph, sitting inside a 28×28 4%-black rounded-8 tile. */
  icon?: ReactNode;
  /** Primary label. */
  title: ReactNode;
  /** Secondary timestamp — e.g. "Just now". */
  time: ReactNode;
  /** Highlight the row with the 4%-black surface. */
  active?: boolean;
};

export type NotificationsProps = {
  /** Heading text. */
  title?: ReactNode;
  /** Notification rows. Defaults to the Figma sample. */
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

function BugIcon() {
  return (
    <svg aria-hidden width="20" height="20" viewBox="0 0 20 20" fill="none">
      <ellipse cx="10" cy="10" rx="5" ry="5.5" stroke="black" strokeWidth="1.3" />
      <path d="M10 4.5 V3 M10 15.5 V17" stroke="black" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M4.5 7 L3 6 M4.5 13 L3 14 M15.5 7 L17 6 M15.5 13 L17 14" stroke="black" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M5 10 H3 M15 10 H17" stroke="black" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M10 4 C8 4 7 2.5 7 2 M10 4 C12 4 13 2.5 13 2" stroke="black" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg aria-hidden width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="7" r="3.2" stroke="black" strokeWidth="1.3" />
      <path d="M3.5 17 C4.5 13.5 7 12 10 12 C13 12 15.5 13.5 16.5 17" stroke="black" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function BroadcastIcon() {
  return (
    <svg aria-hidden width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="1.3" fill="black" />
      <path d="M7 13 A4 4 0 0 1 7 7 M13 7 A4 4 0 0 1 13 13" stroke="black" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M5 15 A7 7 0 0 1 5 5 M15 5 A7 7 0 0 1 15 15" stroke="black" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

const DEFAULT_ITEMS: NotificationItem[] = [
  { icon: <BugIcon />, title: "You fixed a bug.", time: "Just now" },
  { icon: <UserIcon />, title: "New user registeRed.", time: "59 minutes ago", active: true },
  { icon: <BugIcon />, title: "You fixed a bug.", time: "12 hours ago" },
  { icon: <BroadcastIcon />, title: "Andi Lane subscribed to you.", time: "Today, 11:59 AM" },
];

function Row({ icon, title, time, active }: NotificationItem) {
  return (
    <div
      className={`flex w-full flex-wrap items-start gap-[8px] rounded-[12px] p-[8px] ${
        active ? "bg-black/[0.04]" : ""
      }`}
    >
      <span className="inline-flex shrink-0 items-center justify-center rounded-[8px] bg-black/[0.04] p-[4px]">
        <span className="inline-flex size-[20px] items-center justify-center">
          {icon}
        </span>
      </span>
      <div className="flex min-w-px flex-1 flex-col items-start justify-center rounded-[12px]">
        <span
          className="w-full text-[14px] leading-[20px] font-normal text-black"
          style={TEXT_STYLE}
        >
          {title}
        </span>
        <span
          className="w-full text-[12px] leading-[16px] font-normal text-black/40"
          style={TEXT_STYLE}
        >
          {time}
        </span>
      </div>
    </div>
  );
}

/**
 * Notifications — glassy popover listing recent notifications. 248px wide
 * with a Semibold heading and a vertical stack of icon + title + timestamp
 * rows. One row may be highlighted to signal the current keyboard focus
 * or most-recent-read indicator.
 *
 * @example
 *   <Notifications />
 *   <Notifications title="Inbox" items={customItems} />
 */
const SHELL = {
  card: "w-[248px] rounded-[24px] bg-white/90 p-[20px] shadow-[0_8px_28px_0_rgba(0,0,0,0.1)] backdrop-blur-[40px]",
  flat: "w-full",
} as const;

export function Notifications({
  title = "Notifications",
  items = DEFAULT_ITEMS,
  variant = "card",
  className,
}: NotificationsProps) {
  return (
    <div
      className={`flex flex-col items-start gap-[4px] ${SHELL[variant]} ${className ?? ""}`}
    >
      <div className="flex w-full flex-col items-start justify-center rounded-[12px] px-[4px] py-[8px]">
        <span
          className="w-full text-[18px] leading-[28px] font-semibold text-black"
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
