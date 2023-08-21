type WithParamsLocale<T> = T & { params: { locale: "he" | "en" } };

type RequestState = "idle" | "loading" | "error" | "success";
