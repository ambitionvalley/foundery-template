import { Activities } from "@/components/common/activities";
import { Contacts } from "@/components/common/contacts";
import { Notifications } from "@/components/common/notifications";

// Right activity rail for the /app dashboard. Stacks the Notifications,
// Activities, and Contacts common blocks in their flat (embedded) variant
// so they inherit from the panel instead of floating as popovers.
export function AppRightPanel() {
  return (
    <aside
      aria-label="Activity panel"
      className="flex w-[280px] shrink-0 flex-col gap-6 border-l border-black/10 bg-white p-5"
    >
      <Notifications variant="flat" />
      <Activities variant="flat" />
      <Contacts variant="flat" />
    </aside>
  );
}
