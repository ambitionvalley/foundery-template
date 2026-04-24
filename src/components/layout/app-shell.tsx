"use client";

import { useState, type ReactNode } from "react";
import { AppRightPanel } from "@/components/layout/app-right-panel";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppTopbar } from "@/components/layout/app-topbar";

// Shell for the /app dashboard. Owns the collapse state for both side
// panels so the top-bar toggle buttons can drive them. The shell is
// locked to the viewport; only <main> scrolls, so sidebar, right panel,
// and top bar stay fixed without needing `sticky`.
export function AppShell({ children }: { children: ReactNode }) {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-white text-black">
      <AppSidebar open={leftOpen} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <AppTopbar
          leftOpen={leftOpen}
          rightOpen={rightOpen}
          onToggleLeft={() => setLeftOpen((v) => !v)}
          onToggleRight={() => setRightOpen((v) => !v)}
        />
        <main className="min-h-0 flex-1 overflow-y-auto bg-white p-7">{children}</main>
      </div>
      <AppRightPanel open={rightOpen} />
    </div>
  );
}
