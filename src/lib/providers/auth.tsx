import { useEffect } from "react";
import { useAuthStore } from "../zustand/user";
import { useRouter } from "next/navigation";

export default function AuthProvider({ children, isAuth }: { children: React.ReactNode; isAuth: boolean }) {

    const router = useRouter();
    const { logout } = useAuthStore();
    useEffect(() => {
      if (!isAuth) {
        localStorage.removeItem('token');
        logout(router);
      }
    }, []);
  
    return children;
  }
  