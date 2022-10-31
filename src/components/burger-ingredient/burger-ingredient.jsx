import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import PropTypes from "prop-types";

import { DragPreviewImage, useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { addBunInBurgerConstructor, addIngredientInBurgerConstructor } from "services/slices/burger-constructor-slice";
import { INGREDIENT_PROP_TYPES } from "utils/constants";

import styles from "./burger-ingredient.module.scss";

const BurgerIngredient = ({ data, count }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { name, price, image, image_large, _id, type } = data;

  const addIngridientToConstructor = (type, ingridientData) => {
    if (type === "bun") {
      dispatch(addBunInBurgerConstructor(ingridientData));
    } else {
      dispatch(addIngredientInBurgerConstructor(ingridientData));
    }
  };

  const [{ isDrag }, dragRef, preview] = useDrag({
    type: type === "bun" ? "bun" : "ingredient",
    item: { _id, type },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        return;
      }

      addIngridientToConstructor(item.type, data);
    },
  });

  const handleOrder = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    addIngridientToConstructor(item.type, data);
  };

  return (
    <>
      <DragPreviewImage connect={preview} src={image} />
      <div className={classNames(styles.box, { [styles.onDrag]: isDrag }, "pb-4")} ref={dragRef}>
        {count > 0 && <Counter count={count} size="default" />}
        <Link to={`/ingredients/${_id}`} state={{ background: location }}>
          <div className={classNames(styles.image, "mb-1 pr-1 pl-1")}>
            <img
              src={image}
              alt={name}
              srcSet={`${image} 240w, ${image_large} 480w`}
              sizes="240px"
              width="240"
              height="120"
            />
          </div>
          <div className={classNames(styles.price, "mb-1 text text_type_digits-default")}>
            <span className={classNames(styles.price__num)}>{price}</span>
            <CurrencyIcon type="primary" />
          </div>
          <div className={classNames(styles.title)}>{name}</div>
          <button
            href="#"
            alt="Добавить в корзину"
            className={classNames(styles.cart_button)}
            onClick={(event) => handleOrder(event, data)}
          >
            Добавить
          </button>
        </Link>
      </div>
    </>
  );
};

BurgerIngredient.propTypes = {
  data: PropTypes.shape(INGREDIENT_PROP_TYPES).isRequired,
  count: PropTypes.number,
};

export default BurgerIngredient;
