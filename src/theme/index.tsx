import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import palette from "./palette";
import typography from "./typography";
import ComponentsOverrides from "./overrides";


export default function ThemeRegistry({ children } : {children: React.ReactNode}) {
    const customTheme = createTheme({
            palette: palette,
            typography: typography,
            // shadows:  shadows,
            // shape,
            // breakpoints,
          })
    customTheme.components = ComponentsOverrides(customTheme);
    return (
          <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <main>{children}</main>
          </ThemeProvider>
    );
}