import Link from "next/link";

import { buildSettingsNav } from "@/config/navigation";

export const metadata = { title: "Settings" };

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ workspace: string }>;
}) {
  const { workspace } = await params;
  const nav = buildSettingsNav(workspace);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[16px] leading-[24px] font-semibold text-black">
        Settings
      </h1>
      <nav className="flex flex-col gap-2">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-[12px] px-3 py-2 text-[14px] leading-[20px] text-black hover:bg-black/[0.04]"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
