import { NavLink } from "react-router-dom";

import styles from "./aside-menu.module.scss";

const AsideMenu = () => {
  return (
    <ul className={styles.root}>
      <li>
        <NavLink to="/profile">Профиль</NavLink>
      </li>
      <li>
        <a href="#" title="История заказов">
          История заказов
        </a>
      </li>
      <li>
        <a href="#" title="Выход">
          Выход
        </a>
      </li>
    </ul>
  );
};

export default AsideMenu;
