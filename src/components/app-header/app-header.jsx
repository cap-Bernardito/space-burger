import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import Navbar from '../navbar/navbar';
import styles from './app-header.module.scss';

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={`${styles.header__container} container`}>
        <div className={`${styles.header__logo}`}>
          <Logo />
        </div>
        <nav className={`${styles.header__navbar}`}>
          <Navbar />
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
