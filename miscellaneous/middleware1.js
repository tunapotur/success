import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getRoutObj } from "@/data/routObjList";

export const config = {
  matcher: [
    /*
     * https://nextjs.org/docs/app/building-your-application/routing/middleware
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export default async function middleware(req) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (isAuthenticated)
    if (
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")
    )
      return NextResponse.redirect(new URL("/", req.url));

  if (!isAuthenticated)
    if (
      req.nextUrl.pathname.startsWith("/editUser") ||
      req.nextUrl.pathname.startsWith("/addSuccess")
    )
      return NextResponse.redirect(new URL("/login", req.url));
}

/*

    if (
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")
    )

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*"],
};

export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl.pathname;
    const userRole = req?.nextauth?.token?.user?.role;

    if (url?.includes("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/restricted", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
  },
);
*/

/**
 * https://stackoverflow.com/questions/76175812/prevent-authenticated-users-to-access-custom-sign-in-page-with-next-auth-middlew
 * https://medium.com/ascentic-technology/authentication-with-next-js-13-and-next-auth-9c69d55d6bfd
 * https://medium.com/@issam.ahw/simplifying-next-js-authentication-and-internationalization-with-next-auth-and-next-intl-0a01f1330e46
 * https://stackoverflow.com/questions/76463059/how-to-implement-next-auth-withauth-middleware-with-nextjs-app-server-side-fetch
 * https://stackoverflow.com/questions/70754651/next-auth-v4-with-next-js-middleware?rq=2
 * https://blog.stackademic.com/how-next-js-middlewares-work-103cae315163
 */
