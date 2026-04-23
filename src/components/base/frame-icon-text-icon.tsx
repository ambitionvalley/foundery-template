import type { ReactNode } from "react";

export type FrameIconTextIconProps = {
  /** Stack the icon+label group and the standalone icon vertically. */
  vertical?: boolean;
  /** Swap the two groups — standalone icon moves before the icon+label pair. */
  flip?: boolean;
  /** Force the hover surface (for showcase). */
  hover?: boolean;
  /** Icon that accompanies the label. Falls back to a 16×16 dashed placeholder. */
  icon?: ReactNode;
  /** Standalone icon on the opposite end. Falls back to a 16×16 dashed placeholder. */
  endIcon?: ReactNode;
  children?: ReactNode;
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

/**
 * FrameIconTextIcon — three-slot composition: icon + label + standalone icon.
 * Common uses: menu rows with a trailing chevron, nav items with a badge icon.
 *
 * @example
 *   <FrameIconTextIcon icon={<Icon size={16} />} endIcon={<Icon size={16} />}>
 *     Starred
 *   </FrameIconTextIcon>
 */
export function FrameIconTextIcon({
  vertical = false,
  flip = false,
  hover = false,
  icon,
  endIcon,
  children = "Text",
  className,
}: FrameIconTextIconProps) {
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
      <IconSlot icon={icon} />
      <span
        className="flex flex-col items-start justify-center rounded-[12px] text-[14px] leading-[20px] font-normal whitespace-nowrap text-black"
        style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
      >
        {children}
      </span>
    </div>
  );

  const solo = <IconSlot icon={endIcon} />;

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
