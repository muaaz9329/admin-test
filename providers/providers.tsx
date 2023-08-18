"use client";

import { useLayoutConfig } from "@/hooks/use-layout-config";
import { DEFAULT_LOCALE } from "@/internationalization";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { ClientI18n } from "./client-i18n";

export function Providers({
  children,
  params,
}: React.PropsWithChildren<WithParamsLocale<{}>>) {
  const { updateLayoutConfig } = useLayoutConfig();

  useEffect(() => {
    updateLayoutConfig({
      currentLocale: params?.locale || DEFAULT_LOCALE,
    });
  }, [params?.locale]);

  return (
    <>
      <ClientI18n params={params}>
        {children}
        <Toaster />
      </ClientI18n>
    </>
  );
}
