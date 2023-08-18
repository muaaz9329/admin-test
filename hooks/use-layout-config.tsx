import { create } from "zustand";

type LayoutConfigState = {
  wrapperTitleKey: string;
  currentLocale: "he" | "en";

  updateLayoutConfig: (newState: Partial<LayoutConfigState>) => void;
};

export const useLayoutConfig = create<LayoutConfigState>((set, get) => ({
  wrapperTitleKey: "",
  currentLocale: "he",

  updateLayoutConfig: (newState) => {
    // possible due to immer.js
    set({
      ...newState,
    });
  },
}));
