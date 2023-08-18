"use client";

import { Toaster } from "react-hot-toast";

export function Providers({
  children,
}: //   params,
{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  return (
    <>
      {children}
      <Toaster />
      {/* <IntlProvider params={params}>{children}</IntlProvider> */}
    </>
  );
}
