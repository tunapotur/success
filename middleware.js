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
