// Right activity rail. Part 4 wires in the existing
// src/components/common/{notifications,activities,contacts}.tsx blocks.
export function AppRightPanel() {
  return (
    <aside
      aria-label="Activity panel"
      className="flex w-[280px] shrink-0 flex-col gap-6 border-l border-black/5 bg-white p-5"
    >
      <div className="text-[12px] leading-[18px] text-black/40">
        Notifications · Activities · Contacts · Part 4
      </div>
    </aside>
  );
}
