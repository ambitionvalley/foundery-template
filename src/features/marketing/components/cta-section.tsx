import Link from "next/link";

import { Button } from "@/components/base/button";
import { brand } from "@/config/brand";

export function CtaSection() {
  return (
    <section className="flex flex-col items-center gap-4 py-16 text-center">
      <h2 className="text-[32px] leading-[40px] font-semibold text-black">
        Start with {brand.name}
      </h2>
      <Link href="/signup">
        <Button size="large" variant="filled" radius={16}>
          Create your account
        </Button>
      </Link>
    </section>
  );
}
