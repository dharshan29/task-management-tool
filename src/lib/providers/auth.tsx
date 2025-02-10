import { useEffect } from "react";
import { useAuthStore } from "../zustand/user";

export default function AuthProvider({ children, isAuth }: { children: React.ReactNode; isAuth: boolean }) {

    const { logout } = useAuthStore();
    useEffect(() => {
      if (!isAuth) {
        localStorage.removeItem('token');
        logout();
      }
    }, []);
  
    return children;
  }
  