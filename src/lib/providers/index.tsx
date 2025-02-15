import ThemeRegistry from "@/theme";
import AuthProvider from "./auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";


export default function Providers({ children, isAuth }: { children: React.ReactNode; isAuth: boolean }) {
    const queryClient = new QueryClient();
    return (
        <AuthProvider isAuth={isAuth}>
            <ThemeRegistry>
                <CssBaseline />
                <Toaster position={'top-center'} />
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </ThemeRegistry>
        </AuthProvider>
    )
}