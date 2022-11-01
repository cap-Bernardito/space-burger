import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";

import { Link } from "react-router-dom";

import { ROUTES } from "utils/constants";

import Navbar from "components/navbar/navbar";

import styles from "./app-header.module.scss";

const AppHeader = () => {
  return (
    <header className={classNames(styles.header, "pt-4 pb-4")}>
      <div className={classNames(styles.header__container, "container")}>
        <div className={classNames(styles.header__logo)}>
          <Link to={ROUTES.home.path} title={ROUTES.home.title}>
            <Logo />
          </Link>
        </div>
        <nav className={classNames(styles.header__navbar)}>
          <Navbar />
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
