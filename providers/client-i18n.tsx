import { I18nProviderClient } from "@/internationalization/client";
import { Loader } from "@/components/ui/loader";

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
    <I18nProviderClient locale={params?.locale || "he"} fallback={<Loader />}>
      {children}
    </I18nProviderClient>
  );
};
