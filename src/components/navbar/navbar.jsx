import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import { Spin as Hamburger } from "hamburger-react";

import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { useScreenTest } from "hooks";
import { selectAuth } from "services/slices/auth-slice";

import AsideMenu from "components/aside-menu/aside-menu";

import styles from "./navbar.module.scss";

const Navbar = () => {
  const { user } = useSelector(selectAuth);
  const [isOpen, setOpen] = useState(false);
  const isSmallScreen = useScreenTest();

  const buttonClass = styles.link;
  const activeClass = ({ isActive }) => (isActive ? classNames(buttonClass, styles.link_active) : buttonClass);

  const onClick = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className={classNames(styles.navbar, isOpen && styles.navbar__open)}>
      <ul className={classNames(styles.navbar__list)} onClick={onClick}>
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
            <span>{user ? user.name : "Личный кабинет"}</span>
          </NavLink>

          {isSmallScreen && <AsideMenu />}
        </li>
      </ul>
      <div className={classNames(styles.navbar__hamburger)}>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
    </div>
  );
};

export default Navbar;
