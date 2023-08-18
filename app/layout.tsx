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
    <html lang="en" dir="rtl">
      <body
        className={
          appFont.className + " bg-gradient-body text-primary-foreground"
        }
      >
        <div className="absolute bottom-0 z-[0] left-0">
          <img src="images/wave-primary.png" className="w-[100vw] h-[50vh]" />
        </div>
        <div className="z-10">{children}</div>
      </body>
    </html>
  );
}
