import { Theme } from "@mui/material";

export default function Appbar(theme: Theme) {
    return {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: theme.palette.background.default,
            boxShadow: 'none',
            color: theme.palette.black[400]
          }
        }
      }
    };
  }