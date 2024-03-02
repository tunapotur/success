import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export const config = {
  matcher: [
    "/login/:path*",
    "/register/:path*",
    "/editUser/:path*",
    "/addSuccess/:path*",
  ],
};

export default withAuth(
  async function middleware(request) {
    const url = request.nextUrl.pathname;
    const user = request?.nextauth?.token?.user;

    // unauthenticated user
    if (!user)
      if (url.includes("editUser") || url.includes("addSuccess"))
        return NextResponse.redirect(new URL("/login", request.url));

    // authenticated user
    if (user)
      if (url.includes("login") || url.includes("register"))
        return NextResponse.redirect(new URL("/", request.url));
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

/**
 ** https://medium.com/ascentic-technology/authentication-with-next-js-13-and-next-auth-9c69d55d6bfd
 ** https://medium.com/@issam.ahw/simplifying-next-js-authentication-and-internationalization-with-next-auth-and-next-intl-0a01f1330e46
 ** https://stackoverflow.com/questions/76463059/how-to-implement-next-auth-withauth-middleware-with-nextjs-app-server-side-fetch
 ** https://stackoverflow.com/questions/70754651/next-auth-v4-with-next-js-middleware?rq=2
 ** https://blog.stackademic.com/how-next-js-middlewares-work-103cae315163
 */
