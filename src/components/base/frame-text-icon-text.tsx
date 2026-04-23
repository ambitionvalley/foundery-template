import type { ReactNode } from "react";

export type FrameTextIconTextProps = {
  /** Stack the label+icon pair and the standalone text vertically. */
  vertical?: boolean;
  /** Standalone text leads instead of trails. */
  flip?: boolean;
  /** Force the hover surface (for showcase). */
  hover?: boolean;
  /** Icon that follows the primary label. Falls back to a dashed placeholder. */
  icon?: ReactNode;
  /** Primary label content. */
  children?: ReactNode;
  /** Secondary standalone text on the opposite end. */
  trailingText?: ReactNode;
  className?: string;
};

function DefaultIcon() {
  return (
    <span
      aria-hidden
      className="block size-4 shrink-0 rounded-[4px] border-[0.5px] border-dashed border-black/80 bg-black/[0.04]"
    />
  );
}

function IconSlot({ icon }: { icon?: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center">
      {icon ?? <DefaultIcon />}
    </span>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <span
      className="flex flex-col items-start justify-center rounded-[12px] text-[14px] leading-[20px] font-normal whitespace-nowrap text-black"
      style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
    >
      {children}
    </span>
  );
}

/**
 * FrameTextIconText — three-slot row where the primary label leads its paired
 * icon, and a secondary standalone text sits on the opposite end.
 *
 * @example
 *   <FrameTextIconText icon={<Icon size={16} />} trailingText="Now">Project</FrameTextIconText>
 */
export function FrameTextIconText({
  vertical = false,
  flip = false,
  hover = false,
  icon,
  children = "Text",
  trailingText = "Text",
  className,
}: FrameTextIconTextProps) {
  const outerLayout = vertical
    ? "flex-col items-start justify-center"
    : "flex-wrap content-center items-center";

  const bg = hover ? "bg-black/[0.04]" : "hover:bg-black/[0.04]";

  const pair = (
    <div
      className={`flex items-center gap-[8px] ${
        vertical ? "w-full shrink-0" : "min-w-px flex-[1_0_0]"
      }`}
    >
      <Label>{children}</Label>
      <IconSlot icon={icon} />
    </div>
  );

  const solo = <Label>{trailingText}</Label>;

  return (
    <div
      className={`flex gap-[8px] rounded-[12px] ${outerLayout} ${bg} ${className ?? ""}`}
    >
      {flip ? (
        <>
          {solo}
          {pair}
        </>
      ) : (
        <>
          {pair}
          {solo}
        </>
      )}
    </div>
  );
}
