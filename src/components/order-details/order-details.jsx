import classNames from "classnames";
import PropTypes from "prop-types";

import image from "images/done.svg";

import styles from "./order-details.module.scss";

const OrderDetails = ({ number }) => (
  <div className={classNames(styles.root)}>
    <div className={classNames(styles.number, "text text_type_digits-large mb-8")}>{number}</div>
    <div className={classNames(styles.order_id, "text text_type_main-medium mb-15")}>идентификатор заказа</div>
    <img className={classNames("mb-15")} src={image} alt="Отметка готовности заказа" width="120" height="120" />
    <div className={classNames("mb-2")}>Ваш заказ начали готовить</div>
    <div className={classNames("text_color_inactive")}>Дождитесь готовности на орбитальной станции</div>
  </div>
);

OrderDetails.propTypes = {
  number: PropTypes.number.isRequired,
};

export default OrderDetails;
