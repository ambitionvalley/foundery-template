import Image from "next/image";
import { brand } from "@/config/brand";

export type BrandLogoProps = {
  variant?: "mark" | "wordmark";
  /** Rendered height in pixels. Width for mark follows 1:1; wordmark scales at the 120:28 aspect ratio. */
  size?: number;
  priority?: boolean;
  className?: string;
};

const MARK_BASE = 28;
const WORDMARK_W = 120;
const WORDMARK_H = 28;

/**
 * BrandLogo — renders the product mark or wordmark from `brand.logo`.
 * Used in design docs, marketing placeholder, auth headers, and app topbar.
 */
export function BrandLogo({
  variant = "wordmark",
  size,
  priority = false,
  className,
}: BrandLogoProps) {
  if (variant === "mark") {
    const px = size ?? MARK_BASE;
    return (
      <Image
        src={brand.logo.mark}
        alt={brand.name}
        width={px}
        height={px}
        priority={priority}
        className={className}
      />
    );
  }
  const h = size ?? WORDMARK_H;
  const w = Math.round((WORDMARK_W * h) / WORDMARK_H);
  return (
    <Image
      src={brand.logo.wordmark}
      alt={brand.name}
      width={w}
      height={h}
      priority={priority}
      className={className}
    />
  );
}
