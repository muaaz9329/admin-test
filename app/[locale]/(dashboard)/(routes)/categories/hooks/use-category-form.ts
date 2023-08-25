import { create } from "zustand";

type HookState = {
  categories: CategoryDocument[];
  editingDoc: CategoryDocument | null;
  setEditingDoc: (doc: CategoryDocument | null) => void;
  setCategories: (categories: CategoryDocument[]) => void;
};

const useCategoryForm = create<HookState>((set) => ({
  categories: [],
  editingDoc: null,
  setEditingDoc: (doc: CategoryDocument | null) => set({ editingDoc: doc }),
  setCategories: (categories: CategoryDocument[]) => set({ categories }),
}));

export default useCategoryForm;
