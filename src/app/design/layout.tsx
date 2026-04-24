import { notFound } from "next/navigation";

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const enabled =
    process.env.NODE_ENV === "development" ||
    process.env.DESIGN_PREVIEW_ENABLED === "true";

  if (!enabled) {
    notFound();
  }
  return <>{children}</>;
}
