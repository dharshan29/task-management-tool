import { Theme } from "@mui/material";

export default function Input(theme: Theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        input: {
          padding: '6.5px 12px !important',
          '& .placeholder': {
            padding: '12px !important',
            color: theme.palette.black[100_82],
            // color: 'red'
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          minHeight: 30,
          borderRadius: 30,
          borderColor: theme.palette.black[100],
          '& fieldset': {
            borderColor: theme.palette.black[100_42],
          },
          '&.Mui-focused fieldset': {
            borderColor: `${theme.palette.black[900]} !important`,
          },
          '&.Mui-focused': {
            borderColor: theme.palette.black[200],
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          minHeight: 30,
          borderRadius: 30,
          color: theme.palette.black[200],
          '&.Mui-focused': {
            color: theme.palette.black[100],
          },
        },
      },
    },
    // MuiIconButton: {
    //     styleOverrides: {
    //       root: {
    //         color: theme.palette.black[100],
    //         '&:hover': {
    //           color: theme.palette.black[100],
    //         },
    //       },
    //     },
    // }
  };
}
