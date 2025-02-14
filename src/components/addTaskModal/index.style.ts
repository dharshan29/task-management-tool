import { Theme } from '@mui/material/styles'; 

const useStyles = (theme: Theme) => ({
    header: {
        height: '78px', 
        pl: "21px", 
        pr: "28px", 
        justifyContent: "space-between", 
        alignItems: "center"
    },
    divider: {
        bgcolor: theme.palette.black[100_10]
    },
    label: {
        color: theme.palette.black[100_60], 
        fontWeight: 600,
        mb: '10px'
    },
    option: {
        width: "79px",
        height: '30px !important',
        fontWeight: 700,
        fontSize: '10px',
        borderRadius: '41px',
        textTransform: 'none',
        border: `1px solid ${theme.palette.black[100_19]}`
    },
    select:{
        height: '32px',
        width: '100%',
        border: '1px solid #00000021',
        borderRadius: '8px',
        padding: '0 8px',
        fontSize: '14px',
        background: "#F1F1F15C"
    },
    footer: {
        height: '72px',  
        pr: "35px", 
        justifyContent: "flex-end", 
        alignItems: "center", 
        bgcolor: 'background.paper',
        borderRadius: "0 0 20px 20px"
    },
    button: {
        width: "105px",
        fontWeight: 700,
        fontSize: '14px',
        borderRadius: '41px',
        border: `1px solid ${theme.palette.black[100_19]}`,
    },
    buttonFilled: {
        bgcolor: 'secondary.main',
        color: '#fff',
        border: `1px solid ${theme.palette.secondary.main}`,
        '&:disabled': {
            border: `1px solid ${theme.palette.secondary.light}`,
            bgcolor: 'secondary.light',
            color: '#fff',
        }
    }
  });
    
  
  export default useStyles;