import Link from "next/link";

import { Button } from "@/components/base/button";
import { brand } from "@/config/brand";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-white p-8">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <p
          className="text-[14px] leading-[20px] font-semibold text-black/40"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          404
        </p>
        <h1 className="text-[32px] leading-[40px] font-semibold text-black">
          Page not found
        </h1>
        <p className="text-[14px] leading-[20px] text-black/60">
          The page you were looking for doesn&apos;t exist on {brand.name}.
        </p>
        <Link href="/">
          <Button size="large" variant="filled" radius={16}>
            Back to home
          </Button>
        </Link>
      </div>
    </main>
  );
}
