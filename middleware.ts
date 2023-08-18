// middleware.ts
import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "./internationalization";

const I18nMiddleware = createI18nMiddleware(LOCALES, DEFAULT_LOCALE, {
  urlMappingStrategy: "rewrite",
});

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  // also add /images/ to the list of paths to ignore in the i18n middleware
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
