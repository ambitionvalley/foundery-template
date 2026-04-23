import type { ReactNode } from "react";

export type FrameProps = {
  /** Stack icon and label vertically. */
  vertical?: boolean;
  /** Swap order — label first, icon second. */
  flip?: boolean;
  /** Force the hover surface (for showcase). */
  hover?: boolean;
  /** Leading/trailing icon slot. Falls back to a 16×16 dashed placeholder. */
  icon?: ReactNode;
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

/**
 * Frame — icon + label composition slot. Used for menu rows, list items, and
 * other places where an icon and a label need to sit in a hoverable container
 * with the design-system 8px gap and 12px hover surface.
 *
 * @example
 *   <Frame icon={<Icon size={16} />}>Starred</Frame>
 *   <Frame icon={<Icon size={16} />} flip>Open</Frame>
 *   <Frame icon={<Icon size={16} />} vertical>Save</Frame>
 */
export function Frame({
  vertical = false,
  flip = false,
  hover = false,
  icon,
  children = "Text",
  className,
}: FrameProps) {
  const layout = vertical
    ? "flex-col items-start justify-center"
    : "flex-wrap content-center items-center";

  const bg = hover
    ? "bg-black/[0.04]"
    : "hover:bg-black/[0.04]";

  const iconSlot = (
    <span className="inline-flex shrink-0 items-center justify-center">
      {icon ?? <DefaultIcon />}
    </span>
  );

  const textSlot = (
    <span
      className={`flex flex-col items-start justify-center rounded-[12px] text-[14px] leading-[20px] font-normal text-black ${
        vertical ? "w-full shrink-0" : "min-w-px flex-[1_0_0]"
      }`}
      style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
    >
      {children}
    </span>
  );

  return (
    <div
      className={`flex gap-[8px] rounded-[12px] ${layout} ${bg} ${className ?? ""}`}
    >
      {flip ? (
        <>
          {textSlot}
          {iconSlot}
        </>
      ) : (
        <>
          {iconSlot}
          {textSlot}
        </>
      )}
    </div>
  );
}
