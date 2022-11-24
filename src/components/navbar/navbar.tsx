import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import { Spin as Hamburger } from "hamburger-react";

import { useState } from "react";
import type { NavLinkProps } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { useAppSelector, useScreenTest } from "hooks";
import { selectAuth } from "services/slices/auth-slice";
import { EAuthStatus, ROUTES } from "utils/constants";

import AsideMenu from "components/aside-menu/aside-menu";

import styles from "./navbar.module.scss";

const Navbar: React.FC = () => {
  const { status, user } = useAppSelector(selectAuth);
  const [isOpen, setOpen] = useState(false);
  const isSmallScreen = useScreenTest();
  const isVisibilityProfileMenu = isSmallScreen && status === EAuthStatus.ok;

  const buttonClass = styles.link;

  const activeClass: NavLinkProps["className"] = ({ isActive }) =>
    isActive ? classNames(buttonClass, styles.link_active) : buttonClass;

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
          <NavLink to={ROUTES.profileOrders.path} className={activeClass}>
            <ListIcon type="secondary" />
            <span>Лента заказов</span>
          </NavLink>
        </li>
        <li className={classNames(styles.navbar__item)}>
          <NavLink to={ROUTES.profile.path} className={activeClass} end>
            <ProfileIcon type="secondary" />
            <span>{user ? user.name : "Личный кабинет"}</span>
          </NavLink>

          {isVisibilityProfileMenu && <AsideMenu />}
        </li>
      </ul>
      <div className={classNames(styles.navbar__hamburger)}>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
    </div>
  );
};

export default Navbar;
