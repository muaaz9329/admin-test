import { create } from "zustand";
import { ILink } from "../types";

type HookState = {
  editingLink: ILink | null;
  setEditingLink: (doc: ILink | null) => void;
};

const useLinkData = create<HookState>((set) => ({
  editingLink: null,
  setEditingLink: (doc: ILink | null) => set({ editingLink: doc }),
}));

export default useLinkData;
