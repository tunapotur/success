import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(async function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (token === null) {
        if (
          req.nextUrl.pathname.startsWith("/addSuccess") ||
          req.nextUrl.pathname.startsWith("/editUser")
        )
          return false;
      } else {
        if (
          req.nextUrl.pathname.startsWith("/login") ||
          req.nextUrl.pathname.startsWith("/register")
        )
          return false;
      }
      return true;
    },
  },
});

/**
 ** https://medium.com/ascentic-technology/authentication-with-next-js-13-and-next-auth-9c69d55d6bfd
 ** https://medium.com/@issam.ahw/simplifying-next-js-authentication-and-internationalization-with-next-auth-and-next-intl-0a01f1330e46
 ** https://stackoverflow.com/questions/76463059/how-to-implement-next-auth-withauth-middleware-with-nextjs-app-server-side-fetch
 ** https://stackoverflow.com/questions/70754651/next-auth-v4-with-next-js-middleware?rq=2
 ** https://blog.stackademic.com/how-next-js-middlewares-work-103cae315163
 */

/*
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*"],
};

export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl.pathname;
    const userRole = req?.nextauth?.token?.user?.role;

    if (url?.includes("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/login",
    },
  },
);
*/
