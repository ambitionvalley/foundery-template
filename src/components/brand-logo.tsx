import Image from "next/image";
import { brand } from "@/config/brand";

export type BrandLogoProps = {
  variant?: "mark" | "wordmark";
  priority?: boolean;
  className?: string;
};

/**
 * BrandLogo — renders the product mark or wordmark from `brand.logo`.
 * Used in design docs, marketing placeholder, auth headers, and app topbar.
 */
export function BrandLogo({
  variant = "wordmark",
  priority = false,
  className,
}: BrandLogoProps) {
  if (variant === "mark") {
    return (
      <Image
        src={brand.logo.mark}
        alt={brand.name}
        width={28}
        height={28}
        priority={priority}
        className={className}
      />
    );
  }
  return (
    <Image
      src={brand.logo.wordmark}
      alt={brand.name}
      width={120}
      height={28}
      priority={priority}
      className={className}
    />
  );
}
