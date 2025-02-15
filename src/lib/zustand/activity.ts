import { create } from "zustand";

interface ActivityState {
    activities: any[];
    setActivities: (activities: any[]) => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
    activities: [],
    setActivities: (activities) => set({ activities }),
}));



