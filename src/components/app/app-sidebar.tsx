import { BrandLogo } from "@/components/brand-logo";
import { brand } from "@/config/brand";

// Left navigation rail. Part 2 fleshes out the Favorites/Recently tabs,
// Dashboards menu, and Pages menu. Kept as a stub for Part 1 so the shell
// renders with correct widths and the right visual weight.
export function AppSidebar() {
  return (
    <aside
      aria-label="Primary navigation"
      className="flex w-[212px] shrink-0 flex-col gap-6 border-r border-black/5 bg-white p-4"
    >
      <div className="flex items-center gap-2 px-2 pt-2">
        <BrandLogo variant="mark" size={24} priority />
        <span
          className="text-[14px] leading-[20px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          {brand.shortName}
        </span>
      </div>
      <div className="px-2 text-[12px] leading-[18px] text-black/40">
        Navigation · Part 2
      </div>
    </aside>
  );
}
