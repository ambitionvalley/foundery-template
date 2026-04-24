import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { brand } from "@/config/brand";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#f9f9fa]">
      <header className="flex items-center justify-between px-7 py-4">
        <Link href="/" aria-label={brand.name}>
          <BrandLogo priority />
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1 rounded-[12px] px-3 py-1 text-[12px] leading-[16px] text-black/60 hover:bg-black/[0.04] hover:text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M7.5 2.5L4 6L7.5 9.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to site
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-8">
        {children}
      </main>

      <footer className="flex justify-center pb-12">
        <p
          className="text-[12px] leading-[16px] text-black/40"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          © 2026 {brand.name}
        </p>
      </footer>
    </div>
  );
}
