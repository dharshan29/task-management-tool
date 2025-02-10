import { Theme } from "@mui/material";

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none'
          },
          '&.MuiButton-sizeMedium': {
            height: 40
          },
          '&.MuiButton-sizeSmall': {
            height: 32
          },
          '&[aria-label]': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }
        },
        sizeLarge: {
          height: 48
        },
        containedInherit: {
          color: theme.palette.black[100],
          '&:hover': {
            backgroundColor: theme.palette.black[700]
          }
        },
        outlinedInherit: {
          border: `1px solid ${theme.palette.black[100]}`,
        },
      }
    }
  };
}
