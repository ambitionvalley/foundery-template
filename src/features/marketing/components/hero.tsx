import Link from "next/link";

import { Button } from "@/components/base/button";
import { hero } from "@/features/marketing/content";

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-6 py-16 text-center">
      <h1 className="text-[48px] leading-[56px] font-semibold text-black">
        {hero.title}
      </h1>
      <p className="max-w-xl text-[16px] leading-[24px] text-black/60">
        {hero.subtitle}
      </p>
      <Link href={hero.ctaHref}>
        <Button size="large" variant="filled" radius={16}>
          {hero.ctaLabel}
        </Button>
      </Link>
    </section>
  );
}
