import { create } from "zustand";

type HookState = {
  editingDoc: SubcategoryContentDocument | null;
  setEditingDoc: (doc: SubcategoryContentDocument | null) => void;
};

const useSubcategoryContentForm = create<HookState>((set) => ({
  editingDoc: null,
  setEditingDoc: (doc: SubcategoryContentDocument | null) =>
    set({ editingDoc: doc }),
}));

export default useSubcategoryContentForm;
