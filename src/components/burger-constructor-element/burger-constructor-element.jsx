import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import { Reorder } from "framer-motion";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

import { removeIngredientInBurgerConstructor } from "services/slices/burger-constructor-slice";
import { INGREDIENT_PROP_TYPES } from "utils/constants";

import styles from "./burger-constructor-element.module.scss";

const BurgerConstructorElement = ({ type = "", data, isLocked = false, isOrdered = false }) => {
  const dispatch = useDispatch();

  const handleClose = (removedItem) => {
    dispatch(removeIngredientInBurgerConstructor(removedItem));
  };

  const orderDecorator = (element, isOrdered) => {
    if (isOrdered) {
      return (
        <Reorder.Item
          as="div"
          initial={{ opacity: 1 }}
          whileDrag={{ opacity: 0.9 }}
          value={data}
          id={data.key}
          className={classNames(styles.item__wrapper)}
        >
          {element}
        </Reorder.Item>
      );
    }

    return element;
  };

  return orderDecorator(
    <div className={classNames(styles.item, { [styles.locked]: isLocked })}>
      <div className={classNames(styles.item__lock, "mr-2")}>
        {isOrdered && (
          <div className={classNames(styles.item__lock, "mr-2")}>
            <DragIcon type="primary" />
          </div>
        )}
      </div>

      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        handleClose={() => handleClose(data)}
      />
    </div>,
    isOrdered
  );
};

BurgerConstructorElement.propTypes = {
  type: PropTypes.string,
  data: PropTypes.shape(INGREDIENT_PROP_TYPES).isRequired,
  isLocked: PropTypes.bool,
  isOrdered: PropTypes.bool,
  index: PropTypes.number,
};

export default BurgerConstructorElement;
