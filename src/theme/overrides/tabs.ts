// ----------------------------------------------------------------------

import { Theme } from "@mui/material";

export default function Tabs(theme: Theme) {
    return {
      MuiTabs: {
          styleOverrides: {
            root: {
              minHeight: '26px',
            '& .MuiTabs-indicator': {
              borderRadius: '2',
              minHeight: '2px'
            }
          }
        }
      },
      MuiTab: {
        styleOverrides: {
          root: {
            padding: '0',
            minWidth: 48,
            minHeight: '24px',
            fontWeight: theme.typography.fontWeightMedium,
            '&:not(:last-of-type)': {
              marginRight: 24
            }
          },
          labelIcon: {
              marginBottom: 0,
            '& > *:first-of-type': {
              marginBottom: 0,
            }
          },
          wrapper: {
            flexDirection: 'row',
            whiteSpace: 'nowrap'
          },
          textColorInherit: {
            opacity: 1,
            color: theme.palette.primary.main
          }
        }
      },
      MuiTabPanel: {
        styleOverrides: {
          root: {
            padding: 0
          }
        }
      },
    };
  }
  