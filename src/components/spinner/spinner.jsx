import classNames from "classnames";

import styles from "./spinner.module.scss";

const Spinner = ({ loading = false }) => (
  <span className={classNames(styles.spinner, { ["loading"]: loading })} data-spinner></span>
);

export default Spinner;
