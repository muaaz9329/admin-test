"use client";

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useLayoutConfig } from "@/hooks/use-layout-config";
import { DEFAULT_LOCALE } from "@/internationalization";

import { ClientI18n } from "./client-i18n";
import { AuthContextProvider } from "@/contexts/auth-context";

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
        <AuthContextProvider>{children}</AuthContextProvider>
        <Toaster />
      </ClientI18n>
    </>
  );
}
