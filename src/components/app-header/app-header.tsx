import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";

import { Link } from "react-router-dom";

import { useScreenTest } from "hooks";
import { ROUTES } from "utils/constants";

import Navbar from "components/navbar/navbar";

import logo_xs from "../../images/logo_xs.svg";

import styles from "./app-header.module.scss";

const AppHeader: React.FC = () => {
  const isSmallScreen = useScreenTest();

  return (
    <header className={classNames(styles.header)}>
      <div className={classNames(styles.header__container, "container")}>
        <div className={classNames(styles.header__logo)}>
          <Link to={ROUTES.home.path} title={ROUTES.home.title}>
            {isSmallScreen ? <img src={logo_xs} width="50" height="50" /> : <Logo />}
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
