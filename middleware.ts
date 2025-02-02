import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (!req.nextauth.token) {
      const signInPage = new URL("/auth/signin", req.url);
      signInPage.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(signInPage);
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/dashboard/:path*"] };
