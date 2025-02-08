import ThemeRegistry from "@/theme";
import AuthProvider from "./auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";


export default function Providers({ children, isAuth }: { children: React.ReactNode; isAuth: boolean }) {
    const queryClient = new QueryClient();
    return (
        <AuthProvider isAuth={isAuth}>
            <ThemeRegistry>
                <CssBaseline />
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </ThemeRegistry>
        </AuthProvider>
    )
}