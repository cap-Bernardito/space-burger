import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import { Spin as Hamburger } from "hamburger-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
// eslint-disable-next-line sort-imports
import styles from "./navbar.module.scss";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  const buttonClass = styles.link;
  const activeClass = ({ isActive }) => (isActive ? classNames(buttonClass, styles.link_active) : buttonClass);

  return (
    <div className={classNames(styles.navbar, isOpen && styles.navbar__open)}>
      <ul className={classNames(styles.navbar__list)}>
        <li className={classNames(styles.navbar__item)}>
          <NavLink to="/" end className={activeClass}>
            <BurgerIcon type="primary" />
            <span>Конструктор</span>
          </NavLink>
        </li>
        <li className={classNames(styles.navbar__item)}>
          <NavLink to="/orders" className={activeClass}>
            <ListIcon type="secondary" />
            <span>Лента заказов</span>
          </NavLink>
        </li>
        <li className={classNames(styles.navbar__item)}>
          <NavLink to="/profile" className={activeClass}>
            <ProfileIcon type="secondary" />
            <span>Личный кабинет</span>
          </NavLink>
        </li>
      </ul>
      <div className={classNames(styles.navbar__hamburger)}>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
    </div>
  );
};

export default Navbar;
