import type { ReactNode } from "react";

export type FrameGroupTextProps = {
  /** Stack the button group and the label vertically. */
  vertical?: boolean;
  /** Button group trails instead of leads. */
  flip?: boolean;
  /** Force the hover surface (for showcase). */
  hover?: boolean;
  /** Custom button group. Falls back to a single 24×24 borderless button with a dashed icon. */
  group?: ReactNode;
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

function DefaultGroup() {
  return (
    <div className="flex flex-wrap content-center items-center gap-[8px] rounded-[12px]">
      <span className="flex min-h-[24px] min-w-[24px] shrink-0 items-center justify-center gap-[4px] rounded-[12px] p-[4px]">
        <DefaultIcon />
      </span>
    </div>
  );
}

/**
 * FrameGroupText — button group + label composition. A common pattern for
 * row controls: a cluster of icon buttons paired with a label.
 *
 * @example
 *   <FrameGroupText group={<Group>{...buttons}</Group>}>
 *     Filters
 *   </FrameGroupText>
 */
export function FrameGroupText({
  vertical = false,
  flip = false,
  hover = false,
  group,
  children = "Text",
  className,
}: FrameGroupTextProps) {
  const outerLayout = vertical
    ? "flex-col items-start justify-center"
    : "flex-wrap content-center items-center";

  const bg = hover ? "bg-black/[0.04]" : "hover:bg-black/[0.04]";

  const label = (
    <span
      className={`flex flex-col items-start justify-center rounded-[12px] text-[14px] leading-[20px] font-normal whitespace-nowrap text-black ${
        vertical ? "w-full shrink-0" : "min-w-px flex-[1_0_0]"
      }`}
      style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
    >
      {children}
    </span>
  );

  const groupSlot = (
    <span className="inline-flex shrink-0 items-center justify-center">
      {group ?? <DefaultGroup />}
    </span>
  );

  return (
    <div
      className={`flex gap-[8px] rounded-[12px] ${outerLayout} ${bg} ${className ?? ""}`}
    >
      {flip ? (
        <>
          {label}
          {groupSlot}
        </>
      ) : (
        <>
          {groupSlot}
          {label}
        </>
      )}
    </div>
  );
}
