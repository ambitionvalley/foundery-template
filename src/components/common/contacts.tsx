export type ContactItem = {
  /** Display name shown next to the avatar. */
  name: string;
  /** Avatar image source. Falls back to an empty circle when omitted. */
  avatar?: string;
};

export type ContactsProps = {
  title?: string;
  items?: ContactItem[];
  variant?: "card" | "flat";
  className?: string;
};

const TEXT_STYLE = { fontFeatureSettings: "'ss01' 1, 'cv01' 1" as const };

const DEFAULT_ITEMS: ContactItem[] = [
  { name: "Natali Craig", avatar: "/figma/avatars/natali-craig.png" },
  { name: "Drew Cano", avatar: "/figma/avatars/drew-cano.png" },
  { name: "Andi Lane", avatar: "/figma/avatars/andi-lane.png" },
  { name: "Koray Okumus" },
  { name: "Kate Morrison" },
  { name: "Melody Macy" },
];

const SHELL = {
  card: "w-[248px] rounded-[24px] bg-white/90 p-5 shadow-[0px_8px_28px_0px_rgba(0,0,0,0.1)] backdrop-blur-[40px]",
  flat: "w-full",
} as const;

/**
 * Contacts — heading + vertical stack of avatar + name rows. Sticks to
 * the Figma Right Bar spec: 40px rows, 8px radius, 14/20 Regular title.
 */
export function Contacts({
  title = "Contacts",
  items = DEFAULT_ITEMS,
  variant = "card",
  className,
}: ContactsProps) {
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
      {items.map((item, idx) => (
        <div
          key={`${item.name}-${idx}`}
          className="flex h-10 items-center gap-2 rounded-[8px] p-2"
        >
          <span className="relative block size-6 shrink-0 overflow-hidden rounded-full bg-black/[0.04]">
            {item.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.avatar}
                alt=""
                className="absolute inset-0 size-full object-cover"
              />
            ) : null}
          </span>
          <p
            className="min-w-0 flex-1 truncate text-[14px] leading-[20px] text-black"
            style={TEXT_STYLE}
          >
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
}
