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
  logout: (router: any) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: (router) => {
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem('token'); 
        router.push("/login"); 
      },
    }),
    {
      name: 'user-storage', // name of the item in local storage
    }
  )
);