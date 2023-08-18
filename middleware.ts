// middleware.ts
import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";

const I18nMiddleware = createI18nMiddleware(["en", "he"] as const, "he", {
  urlMappingStrategy: "rewrite",
});

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  // also add /images/ to the list of paths to ignore in the i18n middleware
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
