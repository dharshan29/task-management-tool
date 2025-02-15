import { Theme } from '@mui/material/styles'; 

const useStyles = (theme: Theme) => ({
    container: { 
        maxWidth: {
            md: '366px', 
            xs: '296px',
            margin: 'auto', 
            marginRight: '83px', 
            marginLeft: '66px', 
            gap: '31.5px',
        },
        alignItems: {xs: 'center', sm: 'flex-start'}
    },
    mobileContainer: {

    }
});
    
  
export default useStyles;