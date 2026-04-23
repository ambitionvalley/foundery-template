import type { CSSProperties, ReactNode } from "react";

export type IconSize = 12 | 16 | 20 | 24 | 28 | 32 | 40 | 48 | 80;

export type IconProps = {
  /** Visual size in px. Determines outer box, inner placeholder radius, and badge placement. */
  size?: IconSize;
  /** Wrap the icon in a subtle card (black/4% bg, rounded corners, padding). */
  background?: boolean;
  /** Show an indigo status dot in the top-right corner. */
  badge?: boolean;
  /** The icon content. If omitted, a dashed placeholder is rendered. */
  children?: ReactNode;
  className?: string;
};

// Inner placeholder corner radius per size — depends on whether the icon is wrapped.
const PLACEHOLDER_RADIUS: Record<IconSize, { bare: number; wrapped: number }> = {
  12: { bare: 4, wrapped: 4 },
  16: { bare: 4, wrapped: 4 },
  20: { bare: 8, wrapped: 8 },
  24: { bare: 8, wrapped: 8 },
  28: { bare: 8, wrapped: 8 },
  32: { bare: 8, wrapped: 8 },
  40: { bare: 12, wrapped: 12 },
  48: { bare: 12, wrapped: 16 },
  80: { bare: 16, wrapped: 20 },
};

// Background wrapper padding (px) per size.
const BG_PADDING: Record<IconSize, number> = {
  12: 4,
  16: 4,
  20: 4,
  24: 4,
  28: 4,
  32: 4,
  40: 8,
  48: 8,
  80: 12,
};

// Background wrapper radius (px) per size.
const BG_RADIUS: Record<IconSize, number> = {
  12: 8,
  16: 8,
  20: 8,
  24: 12,
  28: 12,
  32: 12,
  40: 16,
  48: 20,
  80: 28,
};

// Badge size (px) per icon size.
const BADGE_SIZE: Record<IconSize, number> = {
  12: 16,
  16: 16,
  20: 16,
  24: 16,
  28: 16,
  32: 16,
  40: 16,
  48: 20,
  80: 24,
};

// Badge top/right offset (px) per size + whether icon is wrapped.
const BADGE_OFFSET: Record<IconSize, { bare: number; wrapped: number }> = {
  12: { bare: -8, wrapped: -4 },
  16: { bare: -8, wrapped: -4 },
  20: { bare: -7, wrapped: -3 },
  24: { bare: -6, wrapped: -2 },
  28: { bare: -5, wrapped: -1 },
  32: { bare: -4, wrapped: 0 },
  40: { bare: -3, wrapped: 5 },
  48: { bare: -2, wrapped: 6 },
  80: { bare: 2, wrapped: 14 },
};

export function Icon({
  size = 24,
  background = false,
  badge = false,
  children,
  className,
}: IconProps) {
  const placeholderRadius = background
    ? PLACEHOLDER_RADIUS[size].wrapped
    : PLACEHOLDER_RADIUS[size].bare;

  const wrapperStyle: CSSProperties | undefined = background
    ? {
        padding: BG_PADDING[size],
        borderRadius: BG_RADIUS[size],
        background: "rgba(0,0,0,0.04)",
      }
    : undefined;

  const placeholder = (
    <div
      aria-hidden
      className="shrink-0 border-[0.5px] border-dashed border-black/80"
      style={{
        width: size,
        height: size,
        background: "rgba(0,0,0,0.04)",
        borderRadius: placeholderRadius,
      }}
    />
  );

  const badgeSize = BADGE_SIZE[size];
  const offset = background ? BADGE_OFFSET[size].wrapped : BADGE_OFFSET[size].bare;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className ?? ""}`}
      style={wrapperStyle}
    >
      {children ?? placeholder}
      {badge && (
        <span
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-[#adadfb]"
          style={{
            width: badgeSize,
            height: badgeSize,
            right: offset,
            top: offset,
          }}
        />
      )}
    </div>
  );
}
