import classNames from "classnames";
import image from "../../images/done.png";
import image_large from "../../images/done.png";
import image_mobile from "../../images/done.png";
import PropTypes from "prop-types";
// eslint-disable-next-line sort-imports
import styles from "./order-details.module.scss";

const OrderDetails = ({ number }) => (
  <div className={classNames(styles.root)}>
    <div className={classNames("text text_type_digits-large mb-8")}>{number}</div>
    <div className={classNames("text text_type_main-medium mb-15")}>идентификатор заказа</div>
    <img
      className={classNames("mb-15")}
      src={image}
      srcSet={`${image_mobile} 120w, ${image} 240w, ${image_large} 360w`}
      sizes="120px"
      alt="Отметка готовности заказа"
      width="120"
      height="120"
    />
    <div className={classNames("mb-2")}>Ваш заказ начали готовить</div>
    <div className={classNames("text_color_inactive")}>Дождитесь готовности на орбитальной станции</div>
  </div>
);

OrderDetails.propTypes = {
  number: PropTypes.number.isRequired,
};

export default OrderDetails;
