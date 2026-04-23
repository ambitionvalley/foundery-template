export type ContactItem = {
  /** Display name shown next to the avatar. */
  name: string;
  /** Avatar image source. Falls back to an empty circle when omitted. */
  avatar?: string;
};

export type ContactsProps = {
  /** Card heading — 18/28 Semibold. */
  title?: string;
  /** Contact rows — rendered in order. */
  items?: ContactItem[];
  className?: string;
};

const TEXT_STYLE = { fontFeatureSettings: "'ss01' 1, 'cv01' 1" as const };

const DEFAULT_ITEMS: ContactItem[] = [
  { name: "ByeWind", avatar: "/figma/avatars/byewind.png" },
  { name: "Natali Craig", avatar: "/figma/avatars/natali-craig.png" },
  { name: "Drew Cano", avatar: "/figma/avatars/drew-cano.png" },
  { name: "Orlando Diggs", avatar: "/figma/avatars/orlando-diggs.png" },
  { name: "Andi Lane", avatar: "/figma/avatars/andi-lane.png" },
];

/**
 * Contacts — glassy contact-list card. A heading stacked above avatar +
 * name rows on a translucent white surface with a 40px backdrop blur,
 * 24px radius, and a soft drop shadow. Ships with 5 demo contacts so it
 * renders cleanly out of the box — pass `items` to drive it from data.
 *
 * @example
 *   <Contacts items={team} />
 *   <Contacts title="Starred" items={starred} />
 */
export function Contacts({
  title = "Contacts",
  items = DEFAULT_ITEMS,
  className,
}: ContactsProps) {
  return (
    <div
      className={`flex w-[248px] flex-col items-start gap-[4px] rounded-[24px] bg-white/90 p-[20px] shadow-[0px_8px_28px_0px_rgba(0,0,0,0.1)] backdrop-blur-[40px] ${className ?? ""}`}
    >
      <div className="flex w-full flex-col items-start justify-center rounded-[12px] px-[4px] py-[8px]">
        <p
          className="w-full text-[18px] leading-[28px] font-semibold text-black"
          style={TEXT_STYLE}
        >
          {title}
        </p>
      </div>
      {items.map((item, idx) => (
        <div
          key={`${item.name}-${idx}`}
          className="flex w-full flex-wrap content-center items-center gap-[8px] rounded-[12px] p-[8px]"
        >
          <span className="flex shrink-0 items-center justify-center">
            <span className="relative block size-[28px] shrink-0 overflow-hidden rounded-full bg-black/[0.04]">
              {item.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.avatar}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                />
              ) : null}
            </span>
          </span>
          <p
            className="min-w-px flex-[1_0_0] text-[14px] leading-[20px] font-normal text-black"
            style={TEXT_STYLE}
          >
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
}
