import { createTheme } from '@mui/material/styles'

const rose = '#F46B5D'
const fish = '#FB8F67'
const red = '#F1562A'
const grey = '#444444'
const green = '#1D878C'

const theme = {
  spacing: 5,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1024,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: rose,
      light: fish,
      dark: red,
    },
    secondary: {
      main: green,
    },
    text: {
      primary: grey,
    },
  },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
    h1: {
      fontSize: 32,
      lineHeight: 1.25, // 40px
      fontWeight: 600,
      color: rose,
    },
    h2: {
      fontSize: 24,
      lineHeight: 1.3, // 31.2px
      fontWeight: 500,
      color: rose,
    },
    h3: {
      fontSize: 20,
      lineHeight: 1.3, // 26px
      fontWeight: 600,
      color: rose,
    },
    body2: {
      fontSize: 14,
      lineHeight: 1.57, // 22px
      fontWeight: 400,
    },
  },
  customPalette: {
    colorPlaceholderText: '#AFB1B6', // Better to add it to 'palette'? but it causes errors
    colorNavIcon: '#AFB1B6', // Better to add it to 'palette'? but it causes errors
    colorInputGrey: '#c5c5c5',
    colorActiveGrey: '#262626',
    authBtnBg: '#FFF1EC',
    authBtnBgHover: '#FECAB7',
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(13, 13, 13, 0.72)',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: green,
          lineHeight: '13px',
          textAlign: 'center',
          marginTop: 15,
        },
      },
    },
  },
} as const

type CustomTheme = {
  [Key in keyof typeof theme]: (typeof theme)[Key]
}

declare module '@mui/material/styles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme extends CustomTheme {}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ThemeOptions extends CustomTheme {}
}
export default createTheme(theme)
