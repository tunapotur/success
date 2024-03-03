import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export const config = {
  matcher: [
    "/addSuccess/:path*",
    "/editUser/:path*",
    "/login/:path*",
    "/register/:path*",
  ],
};

/*export default withAuth(async function middleware(req) {
  const url = req.nextUrl.pathname;
  const user = req?.nextauth?.token?.user;

  console.log("User :", user);
});*/

export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl.pathname;
    const user = req?.nextauth?.token?.user;

    console.log("User :", user, !user);
    console.log("Url :", url);
    console.log(
      "If :",
      !user && (url.includes("/addSuccess") || url.includes("/editUser")),
    );

    if (!user && (url.includes("/addSuccess") || url.includes("/editUser")))
      return NextResponse.redirect(new URL("/login", req.url));

    if (user && (url.includes("/login") || url.includes("/register")))
      return NextResponse.redirect(new URL("/", req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
  },
);
