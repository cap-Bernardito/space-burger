import { useDispatch } from "react-redux";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import classNames from "classnames";
import { removeIngredient } from "../../services/slices/burger-constructor-slice";
import { decreaseIngredientCount } from "../../services/slices/burger-ingredients-slice";
import { INGRIDIENT_PROP_TYPES } from "../../utils/constants";
import styles from "./burger-constructor-element.module.scss";

const BurgerConstructorElement = ({ type = "", data, isLocked = false }) => {
  const dispatch = useDispatch();

  const handleClose = (removedItem) => {
    dispatch(removeIngredient(removedItem));
    dispatch(decreaseIngredientCount(removedItem));
  };

  return (
    <div className={classNames(styles.item, isLocked && styles.locked)}>
      <div className={classNames(styles.item__lock, "mr-2")}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        handleClose={() => handleClose(data)}
      />
    </div>
  );
};

BurgerConstructorElement.propTypes = {
  type: PropTypes.string,
  data: PropTypes.shape(INGRIDIENT_PROP_TYPES).isRequired,
  isLocked: PropTypes.bool,
};

export default BurgerConstructorElement;
