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
export const useLayoutStyles = makeStyles(() => ({
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
