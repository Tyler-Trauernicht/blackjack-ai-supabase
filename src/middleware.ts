import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/pricing",
  "/terms",
  "/privacy",
  "/charts",
  "/sign-in(.*)",
  "/sign-up(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return;
  const a = await auth();
  if (!a?.userId) {
    return a?.redirectToSignIn();
  }
});

export const config = {
  matcher: ["/(.*)", "/((?!_next|.*\\..*).*)"],
}; 