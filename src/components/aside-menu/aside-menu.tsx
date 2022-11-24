import classNames from "classnames";

import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "hooks";
import { logout, selectAuth, setError } from "services/slices/auth-slice";
import { ROUTES } from "utils/constants";
import { isErrorVisibility, notify } from "utils/utils";

import Spinner from "components/spinner/spinner";

import styles from "./aside-menu.module.scss";

const AsideMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(selectAuth);

  useEffect(() => {
    if (isErrorVisibility(error)) {
      notify(error, {
        onClose: () => dispatch(setError(false)),
      });
    }
  }, [dispatch, error]);

  const handleLogout = (event: React.MouseEvent) => {
    event.preventDefault();

    dispatch(logout());
  };

  return (
    <ul className={styles.root}>
      <li>
        <NavLink to={ROUTES.profile.path} end>
          Профиль
        </NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.profileOrders.path}>История заказов</NavLink>
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
