"use client";

import { useI18n } from "@/internationalization/client";

export const DashboardHeader = () => {
  const t = useI18n();

  return (
    <header className="p-2 basis-20 shrink-0 grow-0 bg-primary flex justify-center items-center">
      {t("dashboard.headerTitle")}
    </header>
  );
};
