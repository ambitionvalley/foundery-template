import type { ReactNode } from "react";
import { AppSidebar } from "@/components/app/app-sidebar";
import { AppTopbar } from "@/components/app/app-topbar";
import { AppRightPanel } from "@/components/app/app-right-panel";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white text-black">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar />
        <main className="flex-1 bg-white p-7">{children}</main>
      </div>
      <AppRightPanel />
    </div>
  );
}
