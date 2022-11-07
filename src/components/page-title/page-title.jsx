import classNames from "classnames";

import { useScreenTest } from "hooks";

import styles from "./page-title.module.scss";

const PageTitle = ({ titleMobile, titleDesktop }) => {
  const isSmallScreen = useScreenTest();
  const commonClass = classNames(styles.root, "text_type_main-medium text-center");

  return isSmallScreen
    ? titleMobile && <h1 className={classNames(commonClass, "mb-8")}>{titleMobile}</h1>
    : titleDesktop && <h1 className={classNames(commonClass, "mb-5")}>{titleDesktop}</h1>;
};

export default PageTitle;
