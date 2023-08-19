"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useLayoutConfig } from "@/hooks/use-layout-config";
import { useScopedI18n } from "@/internationalization/client";
import { LayoutDashboard, LayoutList, LogOut, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const DashboardSidebar = () => {
  const scopedT = useScopedI18n("dashboard.sidebar");
  const { currentLocale } = useLayoutConfig();

  const sidebarItems = [
    {
      name: scopedT("categories"),
      href: `/${currentLocale}/categories`,
      icon: LayoutDashboard,
    },
    {
      name: scopedT("subcategories"),
      href: `/${currentLocale}/subcategories`,
      icon: LayoutList,
    },
    {
      name: scopedT("links"),
      href: `/${currentLocale}/links`,
      icon: Share2,
    },
    {
      name: scopedT("consultation"),
      href: `/${currentLocale}/consultation`,
      icon: null,
    },
    {
      name: scopedT("requests"),
      href: `/${currentLocale}/requests`,
      icon: null,
    },
    {
      name: scopedT("settings"),
      href: `/${currentLocale}/settings`,
      icon: null,
    },
    {
      name: scopedT("dailyStudies"),
      href: `/${currentLocale}/daily-studies`,
      icon: null,
    },
    {
      name: scopedT("homeSlider"),
      href: `/${currentLocale}/home-slider`,
      icon: null,
    },
    {
      name: scopedT("detailForm"),
      href: `/${currentLocale}/detail-form`,
      icon: null,
    },
    {
      name: scopedT("homeSlider"),
      href: `/${currentLocale}/home-slider`,
      icon: null,
    },
  ];

  return (
    <aside className="flex flex-col shrink-0 basis-60 grow-0 h-screen pb-2 bg-primary">
      <div className="flex gap-4 items-center px-4 pt-2 h-20">
        <Image
          width="70"
          height="70"
          src="/images/dummy-admin.png"
          alt="Admin Image"
          className="rounded-full"
        />
        <span className="text-lg font-bold">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          רשב"י
        </span>
      </div>

      <div className="mt-8">
        <ScrollArea className="h-[calc(100vh-12rem)]" dir="rtl">
          <ul className="flex flex-col gap-2">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-primary-foreground hover:text-primary"
                >
                  {item.icon && <item.icon className="w-6 h-6" />}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>

      <Separator className="bg-gray/40 mt-auto mb-3" />

      <Button
        variant="ghost"
        className=" px-4 flex items-center gap-3 self-start"
      >
        <LogOut className="w-6 h-6" />
        <span>{scopedT("logout")}</span>
      </Button>
    </aside>
  );
};
