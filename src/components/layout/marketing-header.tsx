import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/base/button";
import { brand } from "@/config/brand";
import { marketingNav } from "@/config/navigation";

export function MarketingHeader() {
  return (
    <header className="flex items-center justify-between px-7 py-4">
      <Link href="/" aria-label={brand.name} className="flex items-center">
        <BrandLogo priority />
      </Link>
      <nav className="flex items-center gap-6">
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
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button size="small" variant="outline" radius={12}>
            Sign in
          </Button>
        </Link>
        <Link href="/signup">
          <Button size="small" variant="filled" radius={12}>
            Sign up
          </Button>
        </Link>
      </div>
    </header>
  );
}
