import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import { Spin as Hamburger } from "hamburger-react";
import { useState } from "react";
// eslint-disable-next-line sort-imports
import styles from "./navbar.module.scss";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const buttonClass = `${styles.link}`;

  return (
    <div className={classNames(styles.navbar, isOpen && styles.navbar__open)}>
      <ul className={classNames(styles.navbar__list)}>
        <li className={classNames(styles.navbar__item)}>
          <a href="#" className={classNames(buttonClass, styles.link_active)}>
            <BurgerIcon type="primary" />
            <span>Конструктор</span>
          </a>
        </li>
        <li className={classNames(styles.navbar__item)}>
          <a href="#" className={classNames(buttonClass)}>
            <ListIcon type="secondary" />
            <span>Лента заказов</span>
          </a>
        </li>
        <li className={classNames(styles.navbar__item)}>
          <a href="#" className={classNames(buttonClass)}>
            <ProfileIcon type="secondary" />
            <span>Личный кабинет</span>
          </a>
        </li>
      </ul>
      <div className={classNames(styles.navbar__hamburger)}>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
    </div>
  );
};

export default Navbar;
