import { NextResponse, type NextRequest } from "next/server";

import { RESERVED_SLUGS } from "@/lib/validation/reserved-slugs";
import { getSessionFromRequest } from "@/server/auth/proxy-helpers";

const AUTH_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify",
];

// Top-level paths that do NOT require authentication. Anything not in this
// list AND not a reserved slug is treated as a workspace route under /[slug].
const PUBLIC_TOP_LEVEL = new Set<string>([
  "",
  "pricing",
  "about",
  "contact",
  "login",
  "signup",
  "forgot-password",
  "reset-password",
  "verify",
]);

function firstSegment(pathname: string): string {
  const stripped = pathname.replace(/^\/+/, "");
  const slash = stripped.indexOf("/");
  return slash === -1 ? stripped : stripped.slice(0, slash);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const top = firstSegment(pathname);
  const session = await getSessionFromRequest(request);

  const isPublic = PUBLIC_TOP_LEVEL.has(top);
  const isReservedNonPublic = RESERVED_SLUGS.has(top) && !isPublic;
  const isWorkspaceRoute = top !== "" && !isPublic && !isReservedNonPublic;
  const isOnboarding = top === "onboarding";

  if ((isWorkspaceRoute || isOnboarding) && !session) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (AUTH_ROUTES.includes(pathname) && session) {
    const url = request.nextUrl.clone();
    url.pathname = "/onboarding";
    url.searchParams.delete("next");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|brand/|avatars/|icons/|social/|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
