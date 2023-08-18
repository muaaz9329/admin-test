import "../globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "@/providers";

const appFont = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Hebrew Admin",
  description: "Admin Panel to manage",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: false,
  },
};

/**
 * Global Layout for the whole app
 */

export default function RootLayout({
  children,
  params,
}: React.PropsWithChildren<WithParamsLocale<{}>>) {
  return (
    <html lang={params.locale} dir="rtl">
      <body
        className={
          appFont.className + " bg-gradient-body text-primary-foreground"
        }
      >
        <Providers params={params}>{children}</Providers>
      </body>
    </html>
  );
}
