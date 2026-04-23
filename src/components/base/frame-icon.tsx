import type { ReactNode } from "react";

export type FrameIconProps = {
  /** Force the hover surface (for showcase). */
  hover?: boolean;
  /** Icon content. Falls back to a 16×16 dashed placeholder. */
  icon?: ReactNode;
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
 * FrameIcon — single-icon slot with a 12px-rounded hover surface. Used where
 * a lone icon needs the same hoverable frame as the rest of the Frame family.
 *
 * @example
 *   <FrameIcon icon={<Icon size={16} />} />
 */
export function FrameIcon({ hover = false, icon, className }: FrameIconProps) {
  const bg = hover ? "bg-black/[0.04]" : "hover:bg-black/[0.04]";
  return (
    <div
      className={`flex w-4 flex-wrap content-center items-center gap-[8px] gap-y-[8px] rounded-[12px] ${bg} ${className ?? ""}`}
    >
      <span className="inline-flex shrink-0 items-center justify-center">
        {icon ?? <DefaultIcon />}
      </span>
    </div>
  );
}
