"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { brand } from "@/config/brand";

type NavKey =
  | "overview"
  | "eCommerce"
  | "projects"
  | "userProfile"
  | "account"
  | "corporate"
  | "blog"
  | "social";

export function AppSidebar({ open }: { open: boolean }) {
  // Template state — in a real app the active route drives this.
  const [activeTab, setActiveTab] = useState<"favorites" | "recently">(
    "favorites",
  );
  const [expanded, setExpanded] = useState<Record<NavKey, boolean>>({
    overview: false,
    eCommerce: false,
    projects: false,
    userProfile: true,
    account: false,
    corporate: false,
    blog: false,
    social: false,
  });

  function toggle(key: NavKey) {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div
      className="sticky top-0 z-10 h-screen shrink-0 overflow-hidden transition-[width] duration-200 ease-out"
      style={{ width: open ? 212 : 0 }}
      inert={!open}
    >
      <aside
        aria-label="Primary navigation"
        className="flex h-full w-[212px] flex-col gap-4 overflow-y-auto border-r border-black/10 bg-white p-4"
        style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
      >
        <div className="flex items-center gap-2 px-2 pt-1">
        <BrandLogo variant="mark" size={24} priority />
        <span className="text-[14px] leading-[20px] font-normal text-black">
          {brand.shortName}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3 px-2">
          <button
            type="button"
            onClick={() => setActiveTab("favorites")}
            className={`text-[14px] leading-[20px] ${
              activeTab === "favorites" ? "text-black/40" : "text-black/20"
            } hover:text-black/60`}
          >
            Favorites
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("recently")}
            className={`text-[14px] leading-[20px] ${
              activeTab === "recently" ? "text-black/40" : "text-black/20"
            } hover:text-black/60`}
          >
            Recently
          </button>
        </div>
        <ul className="flex flex-col">
          <BookmarkRow label="Overview" />
          <BookmarkRow label="Projects" />
        </ul>
      </div>

      <NavSection label="Dashboards">
        <NavItem
          icon={<PieChartIcon />}
          label="Overview"
          href="/app"
          active
          expandable={false}
        />
        <NavItem
          icon={<BagIcon />}
          label="eCommerce"
          expanded={expanded.eCommerce}
          onToggle={() => toggle("eCommerce")}
        />
        <NavItem
          icon={<FolderIcon />}
          label="Projects"
          expanded={expanded.projects}
          onToggle={() => toggle("projects")}
        />
        <NavItem
          icon={<BookIcon />}
          label="Online Courses"
          expandable={false}
        />
      </NavSection>

      <NavSection label="Pages">
        <NavItem
          icon={<IdCardIcon />}
          label="User Profile"
          expanded={expanded.userProfile}
          onToggle={() => toggle("userProfile")}
        >
          <SubItem label="Overview" />
          <SubItem label="Projects" />
          <SubItem label="Campaigns" />
          <SubItem label="Documents" />
          <SubItem label="Followers" />
        </NavItem>
        <NavItem
          icon={<UserIcon />}
          label="Account"
          expanded={expanded.account}
          onToggle={() => toggle("account")}
        />
        <NavItem
          icon={<BuildingIcon />}
          label="Corporate"
          expanded={expanded.corporate}
          onToggle={() => toggle("corporate")}
        />
        <NavItem
          icon={<NotebookIcon />}
          label="Blog"
          expanded={expanded.blog}
          onToggle={() => toggle("blog")}
        />
        <NavItem
          icon={<ChatIcon />}
          label="Social"
          expanded={expanded.social}
          onToggle={() => toggle("social")}
        />
      </NavSection>

        <div className="mt-auto flex items-center gap-2 px-2 pb-1 text-[12px] leading-[18px] text-black/40">
          <BrandLogo variant="mark" size={16} />
          <span>by {brand.shortName}</span>
        </div>
      </aside>
    </div>
  );
}

function NavSection({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="px-2 py-1 text-[12px] leading-[18px] text-black/40">
        {label}
      </div>
      <ul className="flex flex-col">{children}</ul>
    </div>
  );
}

function NavItem({
  icon,
  label,
  href = "#",
  active = false,
  expandable = true,
  expanded = false,
  onToggle,
  children,
}: {
  icon: ReactNode;
  label: string;
  href?: string;
  active?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
  children?: ReactNode;
}) {
  return (
    <li className="flex flex-col">
      <div
        className={`group relative flex items-center gap-1 rounded-[8px] px-2 py-1 ${
          active ? "bg-black/[0.04]" : "hover:bg-black/[0.04]"
        }`}
      >
        {active && (
          <span
            aria-hidden
            className="absolute top-1 bottom-1 left-0 w-[3px] rounded-[2px] bg-black"
          />
        )}
        {expandable ? (
          <button
            type="button"
            aria-label={expanded ? `Collapse ${label}` : `Expand ${label}`}
            onClick={onToggle}
            className="flex h-5 w-4 items-center justify-center text-black/40 hover:text-black"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
              style={{
                transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 120ms ease",
              }}
            >
              <path
                d="M4.5 3l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <span className="h-5 w-4" aria-hidden />
        )}
        <Link
          href={href}
          className="flex min-w-0 flex-1 items-center gap-2 text-[14px] leading-[20px] text-black"
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center text-black">
            {icon}
          </span>
          <span className="truncate">{label}</span>
        </Link>
      </div>
      {expandable && expanded && children && (
        <ul className="flex flex-col pl-8">{children}</ul>
      )}
    </li>
  );
}

function SubItem({ label }: { label: string }) {
  return (
    <li>
      <Link
        href="#"
        className="flex items-center rounded-[8px] px-2 py-1 text-[14px] leading-[20px] text-black/60 hover:bg-black/[0.04] hover:text-black"
      >
        {label}
      </Link>
    </li>
  );
}

function BookmarkRow({ label }: { label: string }) {
  return (
    <li>
      <Link
        href="#"
        className="flex items-center gap-2 rounded-[8px] px-2 py-1 text-[14px] leading-[20px] text-black hover:bg-black/[0.04]"
      >
        <span
          aria-hidden
          className="h-1 w-1 shrink-0 rounded-full bg-black/20"
        />
        {label}
      </Link>
    </li>
  );
}

function PieChartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M128,24a104,104,0,1,0,104,104A104.12,104.12,0,0,0,128,24Zm88,104H136V48A88.11,88.11,0,0,1,216,128ZM40,128a88.12,88.12,0,0,1,80-87.6V128a8,8,0,0,0,2.34,5.66l62,62A88,88,0,0,1,40,128Zm144.63,56.31L136,135.68V136h87.6A88.54,88.54,0,0,1,184.63,184.31Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm88,168H40V80H80V96a8,8,0,0,0,16,0V80h64V96a8,8,0,0,0,16,0V80h40Z" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M216,72H131.31L104,44.69A15.86,15.86,0,0,0,92.69,40H40A16,16,0,0,0,24,56V200.62A15.4,15.4,0,0,0,39.38,216H216.89A15.13,15.13,0,0,0,232,200.89V88A16,16,0,0,0,216,72ZM40,56H92.69l16,16H40ZM216,200H40V88H216Z" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24ZM72,40H200V184H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40Z" />
    </svg>
  );
}

function IdCardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M200,40H56A16,16,0,0,0,40,56V208a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40ZM56,56H200V208H56ZM160,96a32,32,0,1,1-32-32A32,32,0,0,1,160,96Zm23.8,75.9a8,8,0,0,1-6.87,12.1H79.07a8,8,0,0,1-6.87-12.1C82.06,155.34,103.54,144,128,144S173.94,155.34,183.8,171.9Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M240,208H224V96a16,16,0,0,0-16-16H144V32a16,16,0,0,0-24.88-13.32L39.12,72A16,16,0,0,0,32,85.34V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM208,96V208H144V96ZM48,85.34,128,32V208H48ZM112,112v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm-32,0v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm0,56v16a8,8,0,0,1-16,0V168a8,8,0,1,1,16,0Zm32,0v16a8,8,0,0,1-16,0V168a8,8,0,1,1,16,0Z" />
    </svg>
  );
}

function NotebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M184,24H72A16,16,0,0,0,56,40V56H40a8,8,0,0,0,0,16H56v40H40a8,8,0,0,0,0,16H56v40H40a8,8,0,0,0,0,16H56v16a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V40A16,16,0,0,0,184,24Zm0,192H72V40H184V216Z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm40-12a12,12,0,1,0,12,12A12,12,0,0,0,180,116ZM76,116a12,12,0,1,0,12,12A12,12,0,0,0,76,116Zm156,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z" />
    </svg>
  );
}
