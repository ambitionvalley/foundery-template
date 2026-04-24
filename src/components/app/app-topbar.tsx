// Top bar for the app shell. Part 3 fleshes out the collapse/star icons,
// Dashboards/Default breadcrumb, centered search with ⌘/ hint, and the
// theme/history/bell/layout icon cluster on the right.
export function AppTopbar() {
  return (
    <header
      role="banner"
      className="flex h-[60px] items-center justify-between border-b border-black/5 bg-white px-7"
    >
      <div className="text-[14px] leading-[20px] text-black/40">
        Dashboards / <span className="text-black">Default</span>
      </div>
      <div className="text-[12px] leading-[18px] text-black/40">
        Top bar · Part 3
      </div>
    </header>
  );
}
