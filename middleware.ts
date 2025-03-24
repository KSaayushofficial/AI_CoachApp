import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/resume(.*)",
  "/interviews(.*)",
  "/settings(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // First check auth state
    const authObj = await auth();

    if (!authObj.userId) {
      // Redirect to sign-in using the existing auth object
      return authObj.redirectToSignIn({ returnBackUrl: req.url });
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|static|favicon.ico|.*\\..*).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
