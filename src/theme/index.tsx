import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import palette from "./palette";
import typography from "./typography";


export default function ThemeRegistry({ children } : {children: React.ReactNode}) {
    const customTheme = createTheme({
            palette: palette,
            typography: typography,
            // shadows:  shadows,
            // shape,
            // breakpoints,
          })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    return (
          <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <main>{children}</main>
          </ThemeProvider>
    );
}