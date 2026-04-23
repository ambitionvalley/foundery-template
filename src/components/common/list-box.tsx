import type { MouseEvent, ReactNode } from "react";

export type ListBoxProps = {
  /** Fixed width of the popover in pixels. Figma spec is 120. */
  width?: number;
  children?: ReactNode;
  className?: string;
};

export type ListBoxItemProps = {
  /** Highlights the item (hover / selected surface). */
  active?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  className?: string;
};

/**
 * ListBox — popover menu container. Used for dropdown menus, command lists,
 * and context popovers. Renders on a glassy white surface with a soft 28px
 * drop shadow and 40px backdrop blur so it floats over any background.
 *
 * @example
 *   <ListBox>
 *     <ListBoxItem active>Duplicate</ListBoxItem>
 *     <ListBoxItem>Archive</ListBoxItem>
 *     <ListBoxItem>Delete</ListBoxItem>
 *   </ListBox>
 */
export function ListBox({ width = 120, children, className }: ListBoxProps) {
  return (
    <div
      role="listbox"
      className={`flex flex-col items-start rounded-[16px] bg-white/90 p-[8px] shadow-[0_8px_28px_0_rgba(0,0,0,0.1)] backdrop-blur-[40px] ${className ?? ""}`}
      style={{ width }}
    >
      {children}
    </div>
  );
}

/**
 * ListBoxItem — a single row inside a ListBox. Pass <code>active</code> to
 * show the 4% black surface for hover / keyboard focus / current selection.
 */
export function ListBoxItem({
  active = false,
  onClick,
  children,
  className,
}: ListBoxItemProps) {
  const surface = active ? "bg-black/[0.04]" : "hover:bg-black/[0.04]";
  return (
    <button
      type="button"
      role="option"
      aria-selected={active || undefined}
      onClick={onClick}
      className={`flex w-full flex-col items-start justify-center rounded-[12px] p-[8px] text-left text-[14px] leading-[20px] font-normal text-black transition-colors ${surface} ${className ?? ""}`}
      style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
    >
      {children}
    </button>
  );
}
