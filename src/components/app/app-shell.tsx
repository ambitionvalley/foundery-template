"use client";

import { useState, type ReactNode } from "react";
import { AppRightPanel } from "@/components/app/app-right-panel";
import { AppSidebar } from "@/components/app/app-sidebar";
import { AppTopbar } from "@/components/app/app-topbar";

// Shell for the /app dashboard. Owns the collapse state for both side
// panels so the top-bar toggle buttons can drive them. Each panel sticks
// to the viewport independently and the top bar sticks inside the middle
// column, so scrolling only moves the main content.
export function AppShell({ children }: { children: ReactNode }) {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-white text-black">
      <AppSidebar open={leftOpen} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar
          leftOpen={leftOpen}
          rightOpen={rightOpen}
          onToggleLeft={() => setLeftOpen((v) => !v)}
          onToggleRight={() => setRightOpen((v) => !v)}
        />
        <main className="flex-1 bg-white p-7">{children}</main>
      </div>
      <AppRightPanel open={rightOpen} />
    </div>
  );
}
