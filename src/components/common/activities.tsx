import type { ReactNode } from "react";

export type ActivityItem = {
  /** Avatar — image URL, or an arbitrary node (initials bubble, SVG, …). */
  avatar?: ReactNode | string;
  /** Primary activity label. */
  label: ReactNode;
  /** Secondary timestamp label. */
  time?: ReactNode;
};

export type ActivitiesProps = {
  title?: ReactNode;
  items?: ActivityItem[];
  /** Fallback row count when <code>items</code> is omitted. 1-5. */
  count?: 1 | 2 | 3 | 4 | 5;
  variant?: "card" | "flat";
  className?: string;
};

const TEXT_STYLE = { fontFeatureSettings: "'ss01' 1, 'cv01' 1" as const };

const DEFAULT_ITEMS: ActivityItem[] = [
  { avatar: "/avatars/avatar-abstract-03.png", label: "Changed the style.", time: "Just now" },
  { avatar: "/avatars/avatar-female-03.png", label: "Released a new version.", time: "59 minutes ago" },
  { avatar: "/avatars/avatar-male-02.png", label: "Submitted a bug.", time: "12 hours ago" },
  { avatar: "/avatars/avatar-3d-03.png", label: "Modified A data in Page X.", time: "Today, 11:59 AM" },
  { avatar: "/avatars/avatar-abstract-04.png", label: "Deleted a page in Project X.", time: "Feb 2, 2026" },
];

function Avatar({ value }: { value: ActivityItem["avatar"] }) {
  const shell =
    "relative z-[1] size-6 shrink-0 overflow-hidden rounded-full bg-black/[0.04]";

  if (typeof value === "string") {
    return (
      <span className={shell}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
      </span>
    );
  }
  return <span className={shell}>{value}</span>;
}

const SHELL = {
  card: "w-[248px] rounded-[24px] bg-white/90 p-5 shadow-[0_8px_28px_0_rgba(0,0,0,0.1)] backdrop-blur-[20px]",
  flat: "w-full",
} as const;

/**
 * Activities — heading above a stack of avatar + label + timestamp rows.
 * A dashed vertical strip visually connects the avatars through the
 * column, matching the Figma's timeline treatment. `card` variant is a
 * glassy popover; `flat` variant embeds inside the dashboard right rail.
 */
export function Activities({
  title = "Activities",
  items,
  count = 5,
  variant = "card",
  className,
}: ActivitiesProps) {
  const rows = items ?? DEFAULT_ITEMS.slice(0, count);

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

      <div className="relative">
        {/* Timeline strip — 1px dashed line threaded through the avatar
            column. Positioned 20px from the left edge to hit each 24px
            avatar centered under the 8px row padding. */}
        <span
          aria-hidden
          className="absolute top-6 bottom-6 left-[20px] w-px border-l border-dashed border-black/10"
        />
        <ul className="flex flex-col gap-1">
          {rows.map((row, i) => (
            <li
              key={i}
              className="relative flex h-[52px] items-center gap-2 rounded-[12px] p-2"
            >
              <Avatar value={row.avatar} />
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <span
                  className="truncate text-[14px] leading-[20px] text-black"
                  style={TEXT_STYLE}
                >
                  {row.label}
                </span>
                {row.time != null && (
                  <span
                    className="truncate text-[12px] leading-[16px] text-black/40"
                    style={TEXT_STYLE}
                  >
                    {row.time}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
