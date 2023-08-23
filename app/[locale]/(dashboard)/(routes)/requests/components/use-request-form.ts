import { create } from "zustand";

type hookState = {
    editingDoc: RequestsData | null;
    setEditingDoc: (doc: RequestsData | null) => void;
}

const useRequestForm = create<hookState>((set) => ({
    editingDoc: null,
    setEditingDoc: (doc: RequestsData | null) => set({ editingDoc: doc })
}))

export default useRequestForm;