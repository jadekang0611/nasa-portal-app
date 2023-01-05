import { makeStyles } from '@material-ui/core';

export const useNavbarStyle = makeStyles(() => ({
  link: {
    textDecoration: 'none',
    color: '#000',
  },
  appBar: {
    background: '#ffffff !important',
    color: '#000000',
    display: 'flex',
    alignItems: 'center',
    order: 0,
    zIndex: '100 !important',
  },
  section: {
    alignItems: 'center',
    display: 'flex',
    height: 54,
    maxWidth: 975,
    width: '100%',
    justifyContent: 'center',
    padding: '0px 20px',
  },
  logoContainer: {
    display: 'flex',
    flex: '1 9999 0%',
    minWidth: 40,
  },
  logoWrapper: {
    flex: '0 0 auto',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'stretch',
  },
  logo: {
    marginTop: 7,
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
  },
}));

/* Layout component: /components/shared/Layout.jsx */
export const useLayoutStyles = makeStyles((theme) => ({
  section: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: '100%',
    overflow: 'hidden',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    flexShrink: 0,
    position: 'relative',
    padding: 0,
    order: 4,
    [theme.breakpoints.down('sm')]: {
      padding: '10px !important',
    },
  },
  childrenWrapper: {
    paddingTop: 30,
    display: 'flex',
    margin: '0 auto',
    flexFlow: 'row nowrap',
    maxWidth: '935px !important',
  },
  children: {
    width: '100%',
  },
}));

export const useSearchStyle = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  search: {
    margin: theme.spacing(3, 0, 2),
  },
  results: {
    marginTop: theme.spacing(6),
  },
}));

export const useSearchFormStyle = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  label: {
    '&.Mui-focused': {
      color: '#E50914',
    },
  },
  btnWrapper: {
    padding: '8px',
  },
  textField: {
    '&.MuiFocused': {
      color: '#E50914',
    },
  },
  searchBtn: {
    backgroundColor: '#E50914',
    color: 'white !important',
    transition: 'background 0.3s, color 0.3s',
    '&:hover': {
      backgroundColor: '#f40612 !important',
    },
    maxWidth: '200px',
    marginRight: '10px !important',
  },
  inActiveBtn: {
    backgroundColor: '#E0E0E0',
    color: 'white !important',
    maxWidth: '200px',
    marginRight: '10px !important',
  },
  resetBtn: {
    backgroundColor: 'transparent',
    color: '#000',
    transition: 'background 0.3s, color 0.3s',
    '&:hover': {
      backgroundColor: '#f40612',
      color: 'white',
    },
    maxWidth: '200px',
  },
  results: {
    marginTop: theme.spacing(6),
  },
  centered: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    /* bring your own prefixes */
    transform: 'translate(-50%, -50%)',
  },
}));

export const useFeedPageStyle = makeStyles(() => ({
  mainWrapper: {
    paddingTop: '20px',
  },
}));
