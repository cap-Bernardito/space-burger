import classNames from 'classnames';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import Navbar from '../navbar/navbar';
import styles from './app-header.module.scss';

const AppHeader = () => {
  return (
    <header className={classNames(styles.header, 'pt-4 pb-4')}>
      <div className={classNames(styles.header__container, 'container')}>
        <div className={classNames(styles.header__logo)}>
          <Logo />
        </div>
        <nav className={classNames(styles.header__navbar)}>
          <Navbar />
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
