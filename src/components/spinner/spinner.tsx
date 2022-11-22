import classNames from "classnames";

import styles from "./spinner.module.scss";

type Props = {
  loading?: boolean;
};

const Spinner: React.FC<Props> = ({ loading = false }) => (
  <span className={classNames(styles.spinner, { ["loading"]: loading })} data-spinner></span>
);

export default Spinner;
