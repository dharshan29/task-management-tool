import { create } from "zustand";
import { persist } from "zustand/middleware";

type LayoutType = "list" | "board";

interface LayoutState {
    layout: LayoutType;
    selectedIds: string[];
    isDisabled: boolean;
    setLayout: (layout: LayoutType) => void;
    setDisabled: (isDisabled: boolean) => void;
    toggleSelectedId: (id: string) => void;
    clearSelectedIds: () => void;
}

export const useLayoutStore = create<LayoutState>()(
    persist(
        (set) => ({
            layout: "list",
            selectedIds: [],
            isDisabled: false,
            setLayout: (layout) => set({ layout }),
            setDisabled: (isDisabled) => set({ isDisabled }),
            toggleSelectedId: (id) =>
                set((state) => ({
                    selectedIds: state.selectedIds.includes(id)
                        ? state.selectedIds.filter((selectedId) => selectedId !== id)
                        : [...state.selectedIds, id],
                })),
            clearSelectedIds: () => set({ selectedIds: [] }),
        }),
        { name: "layout-store" }
    )
);