import type { ReactNode } from "react";
import {
  Notifications,
  type NotificationItem,
} from "@/components/common/notifications";

export type NotificationsAnchorProps = {
  /** Show the popover anchored below the trigger. */
  open?: boolean;
  /** Heading of the attached popover. */
  title?: ReactNode;
  /** Notification rows — defaults to the Figma sample. */
  items?: NotificationItem[];
  /** The trigger element (e.g. a bell button). */
  children?: ReactNode;
  className?: string;
};

/**
 * NotificationsAnchor — pairs a trigger with a Notifications popover anchored
 * below it. Use it in product headers: the trigger is usually a bell icon
 * button; controlled <code>open</code> reveals the popover on click.
 *
 * @example
 *   <NotificationsAnchor open={isOpen}>
 *     <IconButton>...</IconButton>
 *   </NotificationsAnchor>
 */
export function NotificationsAnchor({
  open = false,
  title,
  items,
  children,
  className,
}: NotificationsAnchorProps) {
  return (
    <span className={`relative inline-flex ${className ?? ""}`}>
      {children}
      {open && (
        <span
          className="absolute top-full z-10 mt-[20px]"
          style={{ left: "50%", transform: "translateX(calc(-248px + 50%))" }}
        >
          <Notifications title={title} items={items} />
        </span>
      )}
    </span>
  );
}
