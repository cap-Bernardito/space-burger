import { Outlet } from "react-router-dom";

import styles from "./small-centered.module.scss";

const SmallCentered = () => {
  return (
    <main>
      <div className="container">
        <div className={styles.body_wrapper}>
          <div className={styles.body}>
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SmallCentered;
