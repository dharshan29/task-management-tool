import { create } from "zustand";

type LayoutType = "list" | "board";

interface LayoutState {
    layout: LayoutType;
    isDisabled: boolean;
    setLayout: (layout: LayoutType) => void;
    setDisabled: (isDisabled: boolean) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
    layout: "list",
    isDisabled: true,
    setLayout: (layout) => set({ layout }),
    setDisabled: (isDisabled) => set({ isDisabled })
}))