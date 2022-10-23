import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import PropTypes from "prop-types";

import { useEffect } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../hooks";
import { addBun, addIngredient } from "../../services/slices/burger-constructor-slice";
import {
  addIngredient as addIngredientDetails,
  removeIngredient as removeIngredientDetails,
} from "../../services/slices/burger-ingredient-details-slice";
import { increaseBunCount, increaseIngredientCount } from "../../services/slices/burger-ingredients-slice";
import { INGREDIENT_PROP_TYPES } from "../../utils/constants";

import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

import styles from "./burger-ingredient.module.scss";

const BurgerIngredient = ({ data }) => {
  const dispatch = useDispatch();
  const { ingredient } = useSelector((state) => state.ingredientDetails);
  const [{ modalIsOpen, closeModal, openModal }, setActionsFns] = useModal();
  const { name, price, image, image_large, _id, type, count } = data;

  const addIngridientToConstructor = (type, ingridientData) => {
    if (type === "bun") {
      dispatch(addBun(ingridientData));
      dispatch(increaseBunCount(ingridientData));
    } else {
      dispatch(addIngredient(ingridientData));
      dispatch(increaseIngredientCount(ingridientData));
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

  useEffect(() => {
    setActionsFns({
      closeCallback: () => dispatch(removeIngredientDetails()),
    });
  }, [dispatch, setActionsFns]);

  const handleClick = () => {
    dispatch(addIngredientDetails(data));
    openModal();
  };

  const handleOrder = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    addIngridientToConstructor(item.type, data);
  };

  return (
    <>
      <DragPreviewImage connect={preview} src={image} />
      <div className={classNames(styles.box, { [styles.onDrag]: isDrag }, "pb-4")} onClick={handleClick} ref={dragRef}>
        {count > 0 && <Counter count={count} size="default" />}
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
        <a
          href="#"
          alt="Добавить в корзину"
          className={classNames(styles.cart_button)}
          onClick={(event) => handleOrder(event, data)}
        >
          Добавить
        </a>
      </div>
      {modalIsOpen && (
        <Modal onClose={closeModal} title="Детали ингридиента">
          <IngredientDetails data={ingredient} />
        </Modal>
      )}
    </>
  );
};

BurgerIngredient.propTypes = {
  data: PropTypes.shape(INGREDIENT_PROP_TYPES).isRequired,
};

export default BurgerIngredient;
