import { Activities } from "@/components/common/activities";
import { Contacts } from "@/components/common/contacts";
import { Notifications } from "@/components/common/notifications";

// Right activity rail for the /app dashboard. Fills the shell's fixed
// height; collapsible via the top-bar right-panel toggle (AppShell drives
// the `open` prop).
export function AppRightPanel({ open }: { open: boolean }) {
  return (
    <div
      className="h-full shrink-0 overflow-hidden transition-[width] duration-200 ease-out"
      style={{ width: open ? 280 : 0 }}
      inert={!open}
    >
      <aside
        aria-label="Activity panel"
        className="flex h-full w-[280px] flex-col gap-4 overflow-y-auto border-l border-black/10 bg-white p-4"
      >
        <Notifications variant="flat" />
        <Activities variant="flat" />
        <Contacts variant="flat" />
      </aside>
    </div>
  );
}
