import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { RESERVED_SLUGS } from "@/lib/validation/reserved-slugs";

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ workspace: string }>;
}) {
  const { workspace } = await params;

  if (RESERVED_SLUGS.has(workspace)) {
    notFound();
  }

  return <AppShell>{children}</AppShell>;
}
