"use client";

import Link from "next/link";
import type { ReactNode } from "react";

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
      className="sticky top-0 z-20 flex h-[60px] items-center justify-between border-b border-black/10 bg-white px-7"
      style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
    >
      <div className="flex items-center gap-3">
        <IconButton
          label={leftOpen ? "Collapse sidebar" : "Expand sidebar"}
          onClick={onToggleLeft}
          pressed={!leftOpen}
        >
          <PanelLeftIcon />
        </IconButton>
        <IconButton label="Add to favorites">
          <StarIcon />
        </IconButton>
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 pl-1 text-[14px] leading-[20px]"
        >
          <Link href="/app" className="text-black/40 hover:text-black">
            Dashboards
          </Link>
          <span aria-hidden className="text-black/20">
            /
          </span>
          <span className="text-black">Default</span>
        </nav>
      </div>

      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className="relative flex h-9 w-[200px] items-center rounded-[8px] bg-black/[0.03]"
      >
        <span className="pointer-events-none flex h-9 w-9 items-center justify-center text-black/30">
          <SearchIcon />
        </span>
        <input
          type="search"
          aria-label="Search"
          placeholder="Search"
          className="min-w-0 flex-1 bg-transparent text-[14px] leading-[20px] text-black placeholder:text-black/30 focus:outline-none"
        />
        <kbd
          aria-hidden
          className="mr-2 flex h-5 items-center rounded-[4px] px-1.5 text-[12px] leading-[18px] text-black/30"
        >
          ⌘/
        </kbd>
      </form>

      <div className="flex items-center gap-2">
        <IconButton label="Toggle theme">
          <SunIcon />
        </IconButton>
        <IconButton label="Recent activity">
          <ClockIcon />
        </IconButton>
        <IconButton label="Notifications">
          <BellIcon />
        </IconButton>
        <IconButton
          label={rightOpen ? "Collapse right panel" : "Expand right panel"}
          onClick={onToggleRight}
          pressed={!rightOpen}
        >
          <PanelRightIcon />
        </IconButton>
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
  /** When defined, button is treated as a toggle and announces its state. */
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-[8px] text-black hover:bg-black/[0.04]"
    >
      {children}
    </button>
  );
}

function PanelLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H88V200H40Zm176,144H104V56H216V200Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" aria-hidden>
      <path
        d="M135.16,36.25l20.39,47.12,51,4.41a8,8,0,0,1,4.55,14L172.6,135.33l11.6,49.92a8,8,0,0,1-11.91,8.66L128,167.65,83.71,193.91a8,8,0,0,1-11.91-8.66l11.6-49.92L44.93,101.78a8,8,0,0,1,4.55-14l51-4.41,20.39-47.12A8,8,0,0,1,135.16,36.25Z"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66a8,8,0,0,0,11.32-11.32l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM40,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H32A8,8,0,0,0,40,128Zm88,88a8,8,0,0,0-8,8v16a8,8,0,0,0,16,0V224A8,8,0,0,0,128,216Zm112-96H224a8,8,0,0,0,0,16h16a8,8,0,0,0,0-16Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A96.14,96.14,0,0,0,39.77,90.92l-11.43-11.44a8,8,0,0,0-13.65,5.66V136a8,8,0,0,0,8,8H73.14a8,8,0,0,0,5.66-13.66L66.58,118.11A80,80,0,1,1,63.7,197a8,8,0,1,0-10.4,12.14A96,96,0,1,0,128,32Z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
    </svg>
  );
}

function PanelRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H152V200H40Zm176,144H168V56h48V200Z" />
    </svg>
  );
}
