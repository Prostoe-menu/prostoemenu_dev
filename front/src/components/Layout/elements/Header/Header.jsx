import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from 'components/Navbar';
import { reset } from 'store/slices/search/searchSlice';
import Logo from 'ui/Logo';
import navigation from 'utils/navigation';
import styles from './Header.module.scss';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  const mainContentRef = useRef(null);

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      if (mainContentRef.current) {
        mainContentRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      dispatch(reset());
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      const resetAndScroll = () => {
        dispatch(reset());

        if (mainContentRef.current) {
          mainContentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      };
      const timeoutId = setTimeout(resetAndScroll, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname, dispatch]);

  return (
    <>
      <header className={styles.header} ref={headerRef}>
        <Link className={styles.logo_link} to="/" onClick={handleLogoClick}>
          <Logo />
        </Link>
        <Navbar navigation={navigation} />
      </header>
      <main className={styles.main} ref={mainContentRef}>
        <Outlet />
      </main>
    </>
  );
};

export default Header;
