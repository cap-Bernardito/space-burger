import { useState } from 'react';
import { Spin as Hamburger } from 'hamburger-react';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './navbar.module.scss';

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const buttonClass = `${styles.link}`;

  return (
    <div className={`${styles.navbar} ${isOpen ? styles.navbar__open : ''}`}>
      <ul className={styles.navbar__list}>
        <li className={styles.navbar__item}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className={`${buttonClass} ${styles.link_active}`}>
            <BurgerIcon type="primary" />
            <span>Конструктор</span>
          </a>
        </li>
        <li className={styles.navbar__item}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className={buttonClass}>
            <ListIcon type="secondary" />
            <span>Лента заказов</span>
          </a>
        </li>
        <li className={styles.navbar__item}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className={buttonClass}>
            <ProfileIcon type="secondary" />
            <span>Личный кабинет</span>
          </a>
        </li>
      </ul>
      <div className={styles.navbar__hamburger}>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
    </div>
  );
};

export default Navbar;
