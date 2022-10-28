import classNames from "classnames";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { logout, logoutError } from "../../services/slices/user-logout-slice";
import { notify } from "../../utils/utils";

import Spinner from "../spinner/spinner";

import styles from "./aside-menu.module.scss";

const AsideMenu = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.userLogout);

  useEffect(() => {
    if (error) {
      notify(error, {
        onClose: () => dispatch(logoutError(false)),
      });
    }
  }, [dispatch, error]);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logout());
  };

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
        <a href="#" title="Выход" className={classNames({ [styles.loading]: loading })} onClick={handleLogout}>
          <span>Выход</span>
          <Spinner loading={loading} />
        </a>
      </li>
    </ul>
  );
};

export default AsideMenu;
