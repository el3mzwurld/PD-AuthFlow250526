import "@mui/material/styles";

declare module "@mui/material/styles" {
  // Augment the background interface used by components
  interface TypeBackground {
    authSide: string;
  }

  // Augment the typography interface
  interface Typography {
    altFont: string;
  }

  interface TypographyVariants {
    altFont: string;
  }

  // Augment the palette interface
  interface Palette {
    light: string;
  }
}
