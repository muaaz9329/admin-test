"use client";

import { ClientI18n } from "@/providers/client-i18n";

// The component is gonna be a React component that has props of type WithParamsLocale<T>

export function withClientI18n(
  Component: React.ComponentType<WithParamsLocale<unknown>>
) {
  return function WithClientI18n(props: any) {
    return (
      <ClientI18n>
        <Component {...props} />
      </ClientI18n>
    );
  };
}
