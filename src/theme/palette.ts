import { alpha } from "@mui/material";

const BLACK = {
    100: '#000000',
    200: '#1E212A',
    300: '#1A1C20',
    400: '#2F2F2F',
    500: '#292929',
    100_20: alpha('#000000', 0.2),
    100_40: alpha('#000000', 0.4), 
    100_42: alpha('#000000', 0.42), 
    100_60: alpha('#000000', 0.6),
    100_80: alpha('#000000', 0.8),
    100_82: alpha('#000000', 0.82),
};

const GREY = {
    100: '#595751',
    100_07: alpha('#595751', 0.07),
    100_28: alpha('#595751', 0.28),
}

const PRIMARY = {
    light: '#FAC3FF',
    main: '#7B1984'
}

const ERROR = {
    dark: '#E13838',
    main: '#DA2F2F'
}

// #F9F9F9
// #DDDADD
// #FFFAEA


const palette = {
    primary: {
        ...PRIMARY
    },
    error: {
        ...ERROR
    },
    black: {
        ...BLACK
    },
    background: { default: '#FFFFFF', paper: '#F1F1F1', soft: '#FFF9F9' }
};
  
export default palette;