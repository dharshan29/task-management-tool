import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: {
    userName: string;
    email: string;
    photoUrl: string | null;
    userId: string;
  } | null;
  isAuthenticated: boolean;
  setUser: (user: AuthState["user"]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: () => {
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem('zustand/user'); // Remove user from local storage on logout
      },
    }),
    {
      name: 'user-storage', // name of the item in local storage
    }
  )
);