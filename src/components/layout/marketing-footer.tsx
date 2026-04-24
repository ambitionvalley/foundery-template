import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";
import { brand } from "@/config/brand";
import { marketingNav } from "@/config/navigation";

export function MarketingFooter() {
  return (
    <footer className="flex flex-col items-center gap-6 border-t border-black/5 px-7 py-12">
      <Link href="/" aria-label={brand.name}>
        <BrandLogo />
      </Link>
      <nav className="flex flex-wrap items-center justify-center gap-6">
        {marketingNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-[14px] leading-[20px] text-black/60 hover:text-black"
            style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <p
        className="text-[12px] leading-[16px] text-black/40"
        style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
      >
        © {new Date().getFullYear()} {brand.name}
      </p>
    </footer>
  );
}
