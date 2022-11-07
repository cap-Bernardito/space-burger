import { Outlet } from "react-router-dom";

import { useScreenTest } from "hooks";

import AsideMenu from "components/aside-menu/aside-menu";

import styles from "./with-sidebar.module.scss";

const WithSidebar = () => {
  const isSmallScreen = useScreenTest();

  const description = (
    <div className="text text_type_main-default text_color_inactive pl-1 mb-5 text-left">
      В этом разделе вы можете <br />
      изменить свои персональные данные
    </div>
  );

  return (
    <div className="container">
      <div className={styles.layout}>
        {!isSmallScreen && (
          <aside className={styles.sidebar}>
            <AsideMenu />
            {description}
          </aside>
        )}

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default WithSidebar;
