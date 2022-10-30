import classNames from "classnames";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { logout, selectAuth, setError } from "services/slices/auth-slice";
import { ROUTES } from "utils/constants";
import { isErrorVisibility, notify } from "utils/utils";

import Spinner from "components/spinner/spinner";

import styles from "./aside-menu.module.scss";

const AsideMenu = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(selectAuth);

  useEffect(() => {
    if (isErrorVisibility(error)) {
      notify(error, {
        onClose: () => dispatch(setError(false)),
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
        <NavLink to={ROUTES.profile} end>
          Профиль
        </NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.profileOrders}>История заказов</NavLink>
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
