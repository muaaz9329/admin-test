import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const appFont = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Hebrew Admin",
  description: "Admin Panel to manage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={appFont.className + " bg-primary text-primary-foreground"}
      >
        {children}
      </body>
    </html>
  );
}
