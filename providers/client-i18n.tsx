import { I18nProviderClient } from "@/internationalization/client";

export const ClientI18n = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: {
    locale: string;
  };
}) => {
  console.log("ClientI18n", params);

  return (
    <I18nProviderClient locale={params?.locale || "he"}>
      {children}
    </I18nProviderClient>
  );
};
