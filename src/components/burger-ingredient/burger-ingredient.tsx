import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";

import { DragPreviewImage, useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

import { useAppDispatch } from "hooks";
import { addBunInBurgerConstructor, addIngredientInBurgerConstructor } from "services/slices/burger-constructor-slice";

import styles from "./burger-ingredient.module.scss";

type Props = {
  data: TIngredient;
  count?: number;
};

const BurgerIngredient: React.FC<Props> = ({ data, count }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { name, price, image, image_large, _id, type } = data;

  const addIngridientToConstructor = (ingredientType: TIngredientType, ingridientData: TIngredient) => {
    if (ingredientType === "bun") {
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

  const handleOrder = (event: React.MouseEvent, item: TIngredient) => {
    event.preventDefault();
    event.stopPropagation();

    addIngridientToConstructor(item.type, data);
  };

  const CounterElement =
    typeof count === "undefined" ? null : count === 0 ? null : <Counter count={count} size="default" />;

  return (
    <>
      <DragPreviewImage connect={preview} src={image} />
      <div className={classNames(styles.box, { [styles.onDrag]: isDrag }, "pb-4")} ref={dragRef}>
        {CounterElement}
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
            title="Добавить в корзину"
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

export default BurgerIngredient;
