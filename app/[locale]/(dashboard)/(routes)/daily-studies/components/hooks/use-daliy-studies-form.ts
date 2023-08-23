import { create } from "zustand";

type HookState = {
  editingDoc: DailyStudyDocument | null;
  setEditingDoc: (doc: DailyStudyDocument | null) => void;
};

const useDailyStudiesForm = create<HookState>((set) => ({
  editingDoc: null,
  setEditingDoc: (doc: DailyStudyDocument | null) => set({ editingDoc: doc }),
}));

export default useDailyStudiesForm;
