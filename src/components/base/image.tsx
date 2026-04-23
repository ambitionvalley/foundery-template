"use client";

import NextImage from "next/image";
import type { CSSProperties, MouseEvent, ReactNode } from "react";

export type ImageSize =
  | 12
  | 16
  | 20
  | 24
  | 28
  | 32
  | 40
  | 48
  | 56
  | 64
  | 72
  | 80
  | "free";

export type ImageProps = {
  size?: ImageSize;
  src?: string;
  alt?: string;
  /** Mark as selectable — adds hover shadow + empty selection circle on hover. */
  selectable?: boolean;
  /** Currently selected — adds persistent hover shadow + filled selection circle. */
  selected?: boolean;
  /** Show a dashed icon placeholder centered in the card (for loading/empty). */
  placeholder?: boolean;
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  children?: ReactNode;
};

const RADIUS: Record<Exclude<ImageSize, "free">, number> = {
  12: 4,
  16: 4,
  20: 4,
  24: 8,
  28: 8,
  32: 8,
  40: 12,
  48: 12,
  56: 16,
  64: 20,
  72: 20,
  80: 20,
};

const CIRCLE_SIZE: Record<Exclude<ImageSize, "free">, number> = {
  12: 12,
  16: 12,
  20: 16,
  24: 16,
  28: 16,
  32: 16,
  40: 16,
  48: 16,
  56: 20,
  64: 20,
  72: 24,
  80: 24,
};

const PLACEHOLDER_ICON_SIZE: Record<Exclude<ImageSize, "free">, number> = {
  12: 12,
  16: 12,
  20: 16,
  24: 16,
  28: 16,
  32: 16,
  40: 20,
  48: 24,
  56: 28,
  64: 32,
  72: 40,
  80: 48,
};

const PLACEHOLDER_ICON_RADIUS: Record<Exclude<ImageSize, "free">, number> = {
  12: 4,
  16: 4,
  20: 4,
  24: 4,
  28: 4,
  32: 4,
  40: 8,
  48: 8,
  56: 8,
  64: 8,
  72: 12,
  80: 12,
};

const HOVER_SHADOW =
  "inset 0 -20px 20px 0 rgba(255,255,255,0.2), inset 0 20px 20px 0 #000000";

function resolveSizePx(size: ImageSize): number {
  return size === "free" ? 80 : size;
}

function resolveRadius(size: ImageSize): number {
  return size === "free" ? 20 : RADIUS[size];
}

function resolveCircleSize(size: ImageSize): number {
  return size === "free" ? 24 : CIRCLE_SIZE[size];
}

function resolveCirclePlacement(size: ImageSize): {
  mode: "corner" | "center";
  inset: number;
} {
  const px = resolveSizePx(size);
  if (px < 32) return { mode: "center", inset: 0 };
  if (px < 64) return { mode: "corner", inset: 4 };
  return { mode: "corner", inset: 8 };
}

function SelectionCircle({
  size,
  filled,
}: {
  size: ImageSize;
  filled: boolean;
}) {
  const diameter = resolveCircleSize(size);
  const placement = resolveCirclePlacement(size);

  const positionStyle: CSSProperties =
    placement.mode === "center"
      ? {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }
      : {
          top: placement.inset,
          right: placement.inset,
        };

  const wrapperStyle: CSSProperties = {
    width: diameter,
    height: diameter,
    ...positionStyle,
  };

  return (
    <span
      className="pointer-events-none absolute flex items-center justify-center rounded-full"
      style={wrapperStyle}
      aria-hidden
    >
      {filled ? (
        <span
          className="block rounded-full bg-white"
          style={{
            width: diameter,
            height: diameter,
            boxShadow:
              "inset 0 0 0 2px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)",
          }}
        >
          <span
            className="block rounded-full bg-[#adadfb]"
            style={{
              width: diameter * 0.5,
              height: diameter * 0.5,
              margin: diameter * 0.25,
            }}
          />
        </span>
      ) : (
        <span
          className="block rounded-full"
          style={{
            width: diameter,
            height: diameter,
            boxShadow:
              "inset 0 0 0 1.5px rgba(255,255,255,0.9), 0 0 0 1px rgba(0,0,0,0.1)",
          }}
        />
      )}
    </span>
  );
}

function PlaceholderIcon({ size }: { size: ImageSize }) {
  if (size === "free") return null;
  const iconSize = PLACEHOLDER_ICON_SIZE[size];
  const iconRadius = PLACEHOLDER_ICON_RADIUS[size];
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[0.5px] border-dashed border-black/80"
      style={{
        width: iconSize,
        height: iconSize,
        background: "rgba(0,0,0,0.04)",
        borderRadius: iconRadius,
      }}
    />
  );
}

/**
 * Image — a rounded image card with optional selection affordance and
 * hover treatment. Radius, corner radius of placeholder, and selection
 * circle size/position all scale with `size`.
 *
 * @example
 *   <Image src="/avatars/jane.jpg" alt="Jane" size={48} />
 *   <Image size={64} selectable selected={true} />
 *   <Image size={32} placeholder />
 */
export function Image({
  size = 64,
  src,
  alt = "",
  selectable = false,
  selected = false,
  placeholder = false,
  className,
  onClick,
  children,
}: ImageProps) {
  const sizePx = resolveSizePx(size);
  const radius = resolveRadius(size);
  const isSelectable = selectable || selected;
  const Wrapper = (isSelectable ? "button" : "div") as "button" | "div";

  const wrapperStyle: CSSProperties = {
    width: sizePx,
    height: sizePx,
    borderRadius: radius,
  };

  const persistentShadow = selected
    ? ({ boxShadow: HOVER_SHADOW } as CSSProperties)
    : undefined;

  return (
    <Wrapper
      type={Wrapper === "button" ? "button" : undefined}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center overflow-hidden bg-black/[0.04] ${
        isSelectable ? "cursor-pointer" : ""
      } ${className ?? ""}`}
      style={{ ...wrapperStyle, ...persistentShadow }}
      aria-pressed={isSelectable ? selected : undefined}
    >
      {src ? (
        <NextImage
          src={src}
          alt={alt}
          fill
          sizes={`${sizePx}px`}
          className="object-cover"
          style={{ borderRadius: radius }}
        />
      ) : null}

      {placeholder && <PlaceholderIcon size={size} />}

      {/* Hover overlay — applied on :hover when selectable, always when selected */}
      {isSelectable && !selected && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          style={{ borderRadius: radius, boxShadow: HOVER_SHADOW }}
        />
      )}

      {/* Selection circle — shown on hover for selectable, always for selected */}
      {isSelectable && (
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 ${
            selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          } transition-opacity duration-150`}
        >
          <SelectionCircle size={size} filled={selected} />
        </span>
      )}

      {children}
    </Wrapper>
  );
}
