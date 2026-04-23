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
  /** Heading text; defaults to "Activities". */
  title?: ReactNode;
  /** Activity rows. When omitted, renders <code>count</code> Figma-parity rows. */
  items?: ActivityItem[];
  /** Fallback row count when <code>items</code> is omitted. 1–5. */
  count?: 1 | 2 | 3 | 4 | 5;
  className?: string;
};

const TEXT_STYLE = { fontFeatureSettings: "'ss01' 1, 'cv01' 1" as const };

const DEFAULT_ITEMS: ActivityItem[] = [
  { avatar: "/figma/avatar-abstract-03.png", label: "Changed the style.", time: "Just now" },
  { avatar: "/figma/avatar-female-03.png", label: "Released a new version.", time: "59 minutes ago" },
  { avatar: "/figma/avatar-male-02.png", label: "Submitted a bug.", time: "12 hours ago" },
  { avatar: "/figma/avatar-3d-03.png", label: "Modified A data in Page X.", time: "Today, 11:59 AM" },
  { avatar: "/figma/avatar-abstract-04.png", label: "Deleted a page in Project X.", time: "Feb 2, 2026" },
];

function Avatar({ value }: { value: ActivityItem["avatar"] }) {
  const shell =
    "relative size-[24px] shrink-0 overflow-hidden rounded-full bg-black/[0.04]";

  if (typeof value === "string") {
    return (
      <span className={shell}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      </span>
    );
  }
  return <span className={shell}>{value}</span>;
}

/**
 * Activities — feed card that stacks a heading above a short column of
 * avatar + label + timestamp rows. 248px wide with a translucent white
 * surface, 24px radius and a soft drop-shadow so it composes cleanly over
 * any background.
 *
 * @example
 *   <Activities />
 *   <Activities title="Team" items={[{ avatar: url, label: "Shipped", time: "2m" }]} />
 */
export function Activities({
  title = "Activities",
  items,
  count = 5,
  className,
}: ActivitiesProps) {
  const rows = items ?? DEFAULT_ITEMS.slice(0, count);

  return (
    <div
      className={`flex w-[248px] flex-col items-start gap-[4px] rounded-[24px] bg-white/90 p-[20px] shadow-[0_8px_28px_0_rgba(0,0,0,0.1)] backdrop-blur-[20px] ${className ?? ""}`}
    >
      <div className="flex w-full shrink-0 flex-col items-start justify-center rounded-[12px] px-[4px] py-[8px]">
        <p
          className="w-full text-[18px] leading-[28px] font-semibold text-black"
          style={TEXT_STYLE}
        >
          {title}
        </p>
      </div>

      {rows.map((row, i) => (
        <div
          key={i}
          className="flex w-full shrink-0 flex-wrap items-start gap-[8px] rounded-[12px] p-[8px]"
        >
          <span className="flex items-center justify-center">
            <Avatar value={row.avatar} />
          </span>
          <span className="flex min-w-px flex-[1_0_0] flex-col items-start justify-center rounded-[12px]">
            <span
              className="w-full truncate text-[14px] leading-[20px] font-normal text-black"
              style={TEXT_STYLE}
            >
              {row.label}
            </span>
            {row.time != null && (
              <span
                className="w-full text-[12px] leading-[16px] font-normal text-black/40"
                style={TEXT_STYLE}
              >
                {row.time}
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
