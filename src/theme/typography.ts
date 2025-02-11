
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { Mulish, Urbanist } from 'next/font/google';

const mulish = Mulish({
  subsets: ['latin'],
  display: 'swap'
});

export const urbanist = Urbanist({
  subsets: ['latin'],
  display: 'swap'
});

function pxToRem(value: number) {
  return `${value / 16}rem`;
}

function responsiveFontSizes({ sm }: { sm: number }) {
  return {
    '@media (max-width:600px)': {
      fontSize: pxToRem(sm)
    },
    // '@media (min-width:900px)': {
    //   fontSize: pxToRem(md)
    // },
    // '@media (min-width:1200px)': {
    //   fontSize: pxToRem(lg)
    // }
  };
}

const typography: TypographyOptions = {
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  // font: {
  //   mulish: mulish.style.fontFamily,
  //   urbanist: urbanist.style.fontFamily,
  // },
  fontFamily: mulish.style.fontFamily,
  h1: {
    fontWeight: 700,
    fontSize: pxToRem(32),
  },
  h2: {
    fontWeight: 700,
    fontSize: pxToRem(24),
  },
  h3: {
    fontWeight: 700,
    fontSize: pxToRem(20),
  },
  h4: {
    fontWeight: 700,
    fontSize: pxToRem(18),
  },
  h5: {
    fontWeight: 700,
    fontSize: pxToRem(17),
  },
  h6: {
    fontWeight: 700,
    fontSize: pxToRem(16),
  },
  subtitle1: {
    fontWeight: 600,
    fontSize: pxToRem(15)
  },
  subtitle2: {
    fontWeight: 600,
    fontSize: pxToRem(14)
  },
  body1: {
    fontSize: pxToRem(16)
  },
  body2: {
    fontSize: pxToRem(14)
  },
  caption: {
    fontSize: pxToRem(12),
    lineHeight: 1.2
  },
  overline: {
    fontWeight: 700,
    fontSize: pxToRem(12),
    letterSpacing: 1.1,
    textTransform: 'uppercase'
  },
  button: {
    fontWeight: 700,
    fontSize: pxToRem(14),
    textTransform: 'uppercase'
  }
};

export default typography;
