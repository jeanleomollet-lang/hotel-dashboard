import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Redirect authenticated users away from auth pages
    if (pathname.startsWith("/auth/") && token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Protected hotel routes - check membership
    const hotelRoutes = [
      "/dashboard",
      "/financier",
      "/operationnel",
      "/revenue",
      "/guests",
      "/saisie",
      "/integrations",
      "/parametres",
    ];

    if (hotelRoutes.some((route) => pathname.startsWith(route))) {
      if (!token) {
        return NextResponse.redirect(
          new URL(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`, req.url)
        );
      }

      // Check plan-based access
      const moduleMap: Record<string, string> = {
        "/financier": "financier",
        "/operationnel": "operationnel",
        "/revenue": "revenue",
        "/guests": "guests",
        "/saisie": "saisie",
        "/integrations": "integrations",
      };

      const module = Object.entries(moduleMap).find(([route]) =>
        pathname.startsWith(route)
      );

      if (module) {
        // Plan checking would be more granular with hotel context
        // For now, pass through - the API routes handle the actual access control
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public routes
        const publicPaths = [
          "/landing",
          "/pricing",
          "/auth/",
          "/api/auth/",
          "/api/stripe/webhook",
          "/dashboard", // Allow demo mode
        ];

        if (publicPaths.some((p) => pathname.startsWith(p))) {
          return true;
        }

        // Root redirect
        if (pathname === "/") return true;

        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/stripe/webhook).*)",
  ],
};
