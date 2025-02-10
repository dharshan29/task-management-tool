import { create } from "zustand";

type LayoutType = "list" | "board";

interface LayoutState {
    layout: LayoutType;
    setLayout: (layout: LayoutType) => void;
  }

export const useLayoutStore = create<LayoutState>((set) => ({
    layout: "list", 
    setLayout: (layout) => set({ layout }),
}))
    