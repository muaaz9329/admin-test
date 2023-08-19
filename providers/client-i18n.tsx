import FallbackLoader from "@/components/ui/fallback-loader";
import { I18nProviderClient } from "@/internationalization/client";

function Fallback() {

}

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
      fallback={
        
        <FallbackLoader/>
      }
    >
      {children}
    </I18nProviderClient>
  );
};
