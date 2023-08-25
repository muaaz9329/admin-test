import { create } from "zustand";


type HookState = {
  editingForm: ConsultationDoc | null;
  setForm: (doc: ConsultationDoc | null) => void;
};

const useConsulForm = create<HookState>((set) => ({
  editingForm: null,
  setForm: (doc: ConsultationDoc | null) => set({ editingForm: doc }),
}));

export default useConsulForm;