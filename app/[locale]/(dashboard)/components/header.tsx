import { getI18n } from "@/internationalization/server";

export const DashboardHeader = async () => {
  const t = await getI18n();

  return (
    <header className="p-2 basis-20 shrink-0 grow-0 bg-primary flex justify-center items-center">
      {t("dashboard.headerTitle")}
    </header>
  );
};
