import { Theme } from '@mui/material/styles'; 

const useStyles = (theme: Theme) => ({
    container: { 
        maxWidth: {
            md: '366px', 
            xs: '296px',
            margin: 'auto', 
            gap: '31.5px',
        },
        marginRight: {sx: 'auto', sm: '83px'}, 
        marginLeft: {sx: 'auto', sm: '66px'}, 
        alignItems: {xs: 'center', sm: 'flex-start'},
        zIndex: 2,
    },
    mobileContainer: {

    }
});
    
  
export default useStyles;