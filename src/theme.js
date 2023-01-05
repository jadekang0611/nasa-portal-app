import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", Helvetica, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#E50914',
    },
    secondary: {
      main: '#385185',
    },
    error: {
      main: '#ed4956',
    },
    background: {
      default: '#fafafa',
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        '&$focused': {
          color: '#999',
        },
      },
    },
    MuiFilledInput: {
      root: {
        backgroundColor: '#fafafa',
        border: '1px solid #efefef',
        '&:hover': {
          backgroundColor: '#fafafa',
        },
        '&$focused': {
          backgroundColor: '#fafafa',
        },
      },
      underline: {
        '&:after': { borderBottom: '1px solid #efefef' },
        '&:before': { borderBottom: '1px solid #efefef' },
        '&:hover:before': { borderBottom: '1px solid #efefef' },
        '&:hover': { borderBottom: '1px solid #efefef' },
      },
    },
    MuiButton: {
      root: {
        '&.MuiButton-containedPrimary:hover': {
          backgroundColor: '#E50914',
          boxShadow: 'none',
        },
        textTransform: 'unset',
      },
      contained: {
        boxShadow: 'unset',
      },
    },
    MuiCard: {
      root: {
        boxShadow: 'none',
        border: '1px solid #e6e6e6',
      },
    },
    MuiPaper: {
      root: {
        boxShadow: 'none',
        border: '1px solid #e6e6e6',
      },
      elevation1: {
        boxShadow: 'unset',
      },
    },
    MuiAppBar: {
      root: {
        boxShadow: 'none',
        borderBottom: '1px solid #e6e6e6',
      },
    },
    MuiInputAdornment: {
      root: {
        '&$filled&$positionStart': {
          margin: 0,
        },
      },
    },
  },
});

export default theme;
