import { create } from "zustand";

type HookState = {
  editingDoc: CategoryDocument | null;
  setEditingDoc: (doc: CategoryDocument | null) => void;
};

const useCategoryForm = create<HookState>((set) => ({
  editingDoc: null,
  setEditingDoc: (doc: CategoryDocument | null) => set({ editingDoc: doc }),
}));

export default useCategoryForm;
