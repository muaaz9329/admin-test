import { create } from "zustand";

type HookState = {
  editingDoc: RequestsData | null;
  setEditingDoc: (doc: RequestsData | null) => void;
};

const useRequestForm = create<HookState>((set) => ({
  editingDoc: null,
  setEditingDoc: (doc: RequestsData | null) => set({ editingDoc: doc }),
}));

export default useRequestForm;
