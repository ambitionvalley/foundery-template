import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type GroupProps = {
  children: ReactNode;
  /** Inner gap between items (defaults to the 8px design-system spacing). */
  gap?: number;
  /** Stack items vertically (flex-col) instead of horizontally (flex-wrap). */
  vertical?: boolean;
  /**
   * Align items to the end of the main axis — right-aligned horizontally,
   * bottom-aligned vertically.
   */
  reverse?: boolean;
  className?: string;
};

/**
 * Group — a flex container that lays out items with consistent gap.
 * Horizontal and wrapping by default; flip `vertical` to stack. `reverse`
 * aligns items to the end of the main axis.
 *
 * @example
 *   <Group>
 *     <GroupItem>...</GroupItem>
 *     <GroupItem>...</GroupItem>
 *   </Group>
 *
 *   <Group vertical>...</Group>
 *   <Group reverse>...</Group>
 */
export function Group({
  children,
  gap = 8,
  vertical = false,
  reverse = false,
  className,
}: GroupProps) {
  const layout = vertical
    ? `flex-col items-stretch ${reverse ? "justify-end" : ""}`
    : `flex-wrap content-center items-center ${reverse ? "justify-end" : ""}`;

  return (
    <div
      className={`flex rounded-[12px] ${layout} ${className ?? ""}`}
      style={{ gap }}
    >
      {children}
    </div>
  );
}

type BaseGroupItemProps = {
  children: ReactNode;
  /** Internal padding around the content (defaults to 4px for 24px min target). */
  padding?: number;
  className?: string;
};

export type GroupItemButtonProps = BaseGroupItemProps &
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className">;

export type GroupItemDivProps = BaseGroupItemProps &
  Omit<ComponentPropsWithoutRef<"div">, "children" | "className"> & {
    onClick?: undefined;
  };

export type GroupItemProps = GroupItemButtonProps | GroupItemDivProps;

function isInteractive(
  props: GroupItemProps,
): props is GroupItemButtonProps {
  return Boolean((props as GroupItemButtonProps).onClick);
}

/**
 * GroupItem — a padded slot inside a Group. Renders as a <button> when an
 * `onClick` handler is supplied, or a <div> otherwise. Guarantees a
 * minimum 24×24 touch target with 4px padding around the content.
 */
export function GroupItem(props: GroupItemProps) {
  const { children, padding = 4, className } = props;
  const base =
    "flex shrink-0 items-center justify-center gap-[4px] rounded-[12px]";
  const style = {
    minHeight: 24,
    minWidth: 24,
    padding,
  };

  if (isInteractive(props)) {
    const { onClick, ...rest } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${base} cursor-pointer transition-colors duration-150 hover:bg-black/[0.04] ${className ?? ""}`}
        style={style}
        {...stripBaseProps(rest)}
      >
        {children}
      </button>
    );
  }

  return (
    <div
      className={`${base} ${className ?? ""}`}
      style={style}
      {...stripBaseProps(props)}
    >
      {children}
    </div>
  );
}

function stripBaseProps<T extends object>(props: T): Omit<T, keyof BaseGroupItemProps> {
  const { children, padding, className, ...rest } = props as T & BaseGroupItemProps;
  void children;
  void padding;
  void className;
  return rest as Omit<T, keyof BaseGroupItemProps>;
}
