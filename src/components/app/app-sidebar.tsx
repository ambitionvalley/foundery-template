"use client";

import {
  CaretRight,
  ChartPieSlice,
  ChatsTeardrop,
  Circle,
  Folder,
  IdentificationBadge,
  IdentificationCard,
  Notebook,
  ShoppingBagOpen,
  UsersThree,
  type Icon,
} from "@phosphor-icons/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { brand } from "@/config/brand";

type NavKey =
  | "eCommerce"
  | "projects"
  | "userProfile"
  | "account"
  | "corporate"
  | "blog"
  | "social";

export function AppSidebar({ open }: { open: boolean }) {
  const [activeTab, setActiveTab] = useState<"favorites" | "recently">(
    "favorites",
  );
  const [expanded, setExpanded] = useState<Record<NavKey, boolean>>({
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
            icon={ChartPieSlice}
            label="Overview"
            href="/app"
            active
            expandable={false}
          />
          <NavItem
            icon={ShoppingBagOpen}
            label="eCommerce"
            expanded={expanded.eCommerce}
            onToggle={() => toggle("eCommerce")}
          />
          <NavItem
            icon={Folder}
            label="Projects"
            expanded={expanded.projects}
            onToggle={() => toggle("projects")}
          />
        </NavSection>

        <NavSection label="Pages">
          <NavItem
            icon={IdentificationBadge}
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
            icon={IdentificationCard}
            label="Account"
            expanded={expanded.account}
            onToggle={() => toggle("account")}
          />
          <NavItem
            icon={UsersThree}
            label="Corporate"
            expanded={expanded.corporate}
            onToggle={() => toggle("corporate")}
          />
          <NavItem
            icon={Notebook}
            label="Blog"
            expanded={expanded.blog}
            onToggle={() => toggle("blog")}
          />
          <NavItem
            icon={ChatsTeardrop}
            label="Social"
            expanded={expanded.social}
            onToggle={() => toggle("social")}
          />
        </NavSection>
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
  icon: IconCmp,
  label,
  href = "#",
  active = false,
  expandable = true,
  expanded = false,
  onToggle,
  children,
}: {
  icon: Icon;
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
            className="flex h-5 w-4 items-center justify-center text-black/20 hover:text-black/60"
          >
            <CaretRight
              size={12}
              weight="bold"
              style={{
                transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 120ms ease",
              }}
            />
          </button>
        ) : (
          <span className="h-5 w-4" aria-hidden />
        )}
        <Link
          href={href}
          className="flex min-w-0 flex-1 items-center gap-2 text-[14px] leading-[20px] text-black"
        >
          <IconCmp size={20} weight="duotone" className="shrink-0" />
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
        <Circle size={8} weight="fill" className="shrink-0 text-black/20" />
        {label}
      </Link>
    </li>
  );
}
