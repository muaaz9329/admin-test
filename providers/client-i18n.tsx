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
    <I18nProviderClient
      locale={params?.locale || "he"}
      // TODO: add a good loading fallback
      fallback={<p>loading ...</p>}
    >
      {children}
    </I18nProviderClient>
  );
};
