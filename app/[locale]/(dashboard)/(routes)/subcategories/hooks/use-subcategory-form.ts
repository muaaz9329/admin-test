import { create } from "zustand";

type HookState = {
  editingDoc: SubCategoryDocument | null;
  setEditingDoc: (doc: SubCategoryDocument | null) => void;
};

const useSubCategoryForm = create<HookState>((set) => ({
  editingDoc: null,
  setEditingDoc: (doc: SubCategoryDocument | null) => set({ editingDoc: doc }),
}));

export default useSubCategoryForm;
