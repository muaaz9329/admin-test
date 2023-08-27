"use client";

import { useCurrentLocale } from "@/internationalization/client";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const locale = useCurrentLocale();
  const router = useRouter();

  React.useEffect(() => {
    router.push(`/${locale}/categories`);
  }, [router, locale]);

  return <div></div>;
}
