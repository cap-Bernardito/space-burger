import classNames from "classnames";

import { useScreenTest } from "hooks";

import styles from "./page-title.module.scss";

type Props = {
  titleMobile?: React.ReactNode;
  titleDesktop?: React.ReactNode;
};

const PageTitle: React.FC<Props> = ({ titleMobile, titleDesktop }) => {
  const isSmallScreen = useScreenTest();
  const commonClass = classNames(styles.root, "text_type_main-medium text-center");

  if (!titleMobile && !titleDesktop) {
    return null;
  }

  if (isSmallScreen) {
    return titleMobile ? <h1 className={classNames(commonClass, "mb-8")}>{titleMobile}</h1> : null;
  }

  return titleDesktop ? <h1 className={classNames(commonClass, "mb-5")}>{titleDesktop}</h1> : null;
};

export default PageTitle;
