import classNames from "classnames";
import PropTypes from "prop-types";

import styles from "./spinner.module.scss";

const Spinner = ({ loading = false }) => (
  <span className={classNames(styles.spinner, { ["loading"]: loading })} data-spinner></span>
);

Spinner.propTypes = {
  loading: PropTypes.bool,
};

export default Spinner;
