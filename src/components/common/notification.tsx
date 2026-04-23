import type { ReactNode } from "react";

export type NotificationState = "successful" | "failure";

export type NotificationProps = {
  /** Semantic state — drives the icon and the default message. */
  state?: NotificationState;
  /** Larger variant — 24px icon, 14/20 text. Small uses 16px icon, 12/16 text. */
  big?: boolean;
  /** Override the default message ("Done" / "Something Wrong"). */
  children?: ReactNode;
  className?: string;
};

function CheckCircle({ size }: { size: number }) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="10.5" fill="#71dd8c" />
      <path
        d="M7.5 12.25 L10.5 15.25 L16.5 9.25"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Warning({ size }: { size: number }) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M10.72 3.86 L1.94 18.2 A1.5 1.5 0 0 0 3.22 20.5 H20.78 A1.5 1.5 0 0 0 22.06 18.2 L13.28 3.86 A1.5 1.5 0 0 0 10.72 3.86 Z"
        fill="#ffcc00"
      />
      <path
        d="M12 9 V13.5"
        stroke="black"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.75" r="0.9" fill="black" />
    </svg>
  );
}

/**
 * Notification — toast-style banner with a success or failure icon and a
 * short label. Renders on a translucent dark surface with a 20px backdrop
 * blur, so it composes cleanly over both light and image backgrounds.
 *
 * @example
 *   <Notification state="successful">Saved</Notification>
 *   <Notification state="failure" big>Upload failed</Notification>
 */
export function Notification({
  state = "successful",
  big = true,
  children,
  className,
}: NotificationProps) {
  const iconSize = big ? 24 : 16;
  const text = big ? "text-[14px] leading-[20px]" : "text-[12px] leading-[16px]";
  const pad = big ? "px-[12px] py-[8px]" : "px-[8px] py-[4px]";
  const gap = big ? "gap-[8px]" : "gap-[4px]";
  const radius = big ? "rounded-[16px]" : "rounded-[12px]";

  const defaultMessage = state === "successful" ? "Done" : "Something Wrong";

  return (
    <div
      role="status"
      className={`inline-flex items-center ${gap} ${pad} ${radius} font-normal text-white whitespace-nowrap backdrop-blur-[20px] ${className ?? ""}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%), linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 100%)",
      }}
    >
      {state === "successful" ? <CheckCircle size={iconSize} /> : <Warning size={iconSize} />}
      <span
        className={text}
        style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
      >
        {children ?? defaultMessage}
      </span>
    </div>
  );
}
