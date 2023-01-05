import { AppBar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useNavbarStyles } from '../../styles';

const Navbar = () => {
  const classes = useNavbarStyles();
  return (
    <>
      <AppBar className={classes.appBar}>
        <section className={classes.section}>
          <Logo />
        </section>
      </AppBar>
    </>
  );
};

const Logo = () => {
  const classes = useNavbarStyles();
  return (
    <div className={classes.logoContainer}>
      <Link to='/' className={classes.link}>
        <div className={classes.logoWrapper}>NASA Portal</div>
      </Link>
    </div>
  );
};

export default Navbar;
