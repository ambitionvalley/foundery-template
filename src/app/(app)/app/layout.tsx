import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { Image } from "@/components/base/image";
import { brand } from "@/config/brand";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f9f9fa]">
      <aside className="flex w-[256px] shrink-0 flex-col gap-6 border-r border-black/5 bg-white p-4">
        <div className="flex items-center gap-2 px-2 pt-2">
          <BrandLogo variant="mark" priority />
          <span className="text-[14px] leading-[20px] font-semibold text-black">
            {brand.shortName}
          </span>
        </div>
        <nav className="flex flex-col gap-1">
          <Link
            href="/app"
            className="rounded-[12px] px-3 py-2 text-[14px] leading-[20px] text-black hover:bg-black/[0.04]"
          >
            Dashboard
          </Link>
          <Link
            href="/app"
            className="rounded-[12px] px-3 py-2 text-[14px] leading-[20px] text-black/60 hover:bg-black/[0.04]"
          >
            Settings
          </Link>
        </nav>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[64px] items-center justify-between border-b border-black/5 bg-white px-6">
          <h1 className="text-[16px] leading-[24px] font-semibold text-black">
            Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <input
              type="search"
              placeholder="Search"
              className="w-[200px] rounded-[12px] border-[0.5px] border-black/20 bg-white/80 px-3 py-2 text-[14px] leading-[20px] outline-none focus:border-black/40"
            />
            <button
              type="button"
              aria-label="Notifications"
              className="flex h-9 w-9 items-center justify-center rounded-[12px] hover:bg-black/[0.04]"
            >
              <span aria-hidden>🔔</span>
            </button>
            <Image size={32} src="/figma/avatar-3d-03.png" alt="" />
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
