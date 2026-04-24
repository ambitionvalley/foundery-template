"use client";

import {
  Bell,
  ClockCounterClockwise,
  MagnifyingGlass,
  Sidebar,
  Star,
  Sun,
} from "@phosphor-icons/react";
import Link from "next/link";
import type { ReactNode } from "react";

const TEXT_STYLE = { fontFeatureSettings: "'ss01' 1, 'cv01' 1" as const };

// Top bar for the app shell. Sticky to the viewport so it stays visible
// while the main column scrolls. AppShell drives the sidebar/right-panel
// collapse state via props. Other controls (theme, search, history,
// notifications) are template-wired — fork-owners swap for real impls.
export function AppTopbar({
  leftOpen,
  rightOpen,
  onToggleLeft,
  onToggleRight,
}: {
  leftOpen: boolean;
  rightOpen: boolean;
  onToggleLeft: () => void;
  onToggleRight: () => void;
}) {
  return (
    <header
      role="banner"
      className="sticky top-0 z-20 flex h-[68px] items-center justify-between gap-8 border-b border-black/10 bg-white px-7 py-5"
      style={TEXT_STYLE}
    >
      <div className="flex items-center gap-2">
        <IconButton
          label={leftOpen ? "Collapse sidebar" : "Expand sidebar"}
          onClick={onToggleLeft}
          pressed={!leftOpen}
        >
          <Sidebar size={16} weight="duotone" />
        </IconButton>
        <IconButton label="Add to favorites">
          <Star size={16} weight="duotone" />
        </IconButton>
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 pl-1 text-[12px] leading-[18px]"
        >
          <Link href="/app" className="text-black/40 hover:text-black">
            Dashboards
          </Link>
          <span aria-hidden className="text-[14px] leading-[20px] text-black/10">
            /
          </span>
          <span className="text-black">Default</span>
        </nav>
      </div>

      <div className="flex items-center gap-5">
        <form
          role="search"
          onSubmit={(event) => event.preventDefault()}
          className="flex h-7 w-[160px] items-center gap-2 rounded-[16px] bg-black/[0.04] px-2"
        >
          <MagnifyingGlass size={16} weight="duotone" className="shrink-0 text-black/20" />
          <input
            type="search"
            aria-label="Search"
            placeholder="Search"
            className="min-w-0 flex-1 bg-transparent text-[14px] leading-[20px] text-black placeholder:text-black/20 focus:outline-none"
          />
          <kbd
            aria-hidden
            className="shrink-0 text-[12px] leading-[18px] text-black/20"
          >
            /
          </kbd>
        </form>

        <div className="flex items-center gap-2">
          <IconButton label="Toggle theme">
            <Sun size={16} weight="duotone" />
          </IconButton>
          <IconButton label="Recent activity">
            <ClockCounterClockwise size={16} weight="duotone" />
          </IconButton>
          <IconButton label="Notifications">
            <Bell size={16} weight="duotone" />
          </IconButton>
          <IconButton
            label={rightOpen ? "Collapse right panel" : "Expand right panel"}
            onClick={onToggleRight}
            pressed={!rightOpen}
          >
            <Sidebar size={16} weight="duotone" className="scale-x-[-1]" />
          </IconButton>
        </div>
      </div>
    </header>
  );
}

function IconButton({
  label,
  children,
  onClick,
  pressed,
}: {
  label: string;
  children: ReactNode;
  onClick?: () => void;
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className="flex h-6 w-6 items-center justify-center rounded-[8px] text-black hover:bg-black/[0.04]"
    >
      {children}
    </button>
  );
}
