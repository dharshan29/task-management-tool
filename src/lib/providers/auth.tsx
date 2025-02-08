import { useEffect } from "react";

export default function AuthProvider({ children, isAuth }: { children: React.ReactNode; isAuth: boolean }) {

    useEffect(() => {
      if (!isAuth) {
      
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    return children;
  }
  