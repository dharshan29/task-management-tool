import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    soft: string;
  }

  interface Palette {
    black: Record<string, string>;
    border: Record<string, string>;
  }

  interface PaletteOptions {
    black?: Record<string, string>;
    border?: Record<string, string>;
    background?: Partial<TypeBackground>;  // Ensure background includes 'soft'
  }
}
