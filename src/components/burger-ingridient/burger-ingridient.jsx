import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import classNames from "classnames";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useModal } from "../../hooks";
import Modal from "../modal/modal";
import IngridientDetails from "../ingridient-details/ingridient-details";
import { addIngredient, removeIngredient } from "../../services/slices/burger-ingredient-detail-slice";
import { INGRIDIENT_PROP_TYPES } from "../../utils/constants";

import styles from "./burger-ingridient.module.scss";
import { useEffect } from "react";

const BurgerIngridient = ({ data }) => {
  const dispatch = useDispatch();
  const { ingredient } = useSelector((state) => state.ingredientDetail);
  const [{ modalIsOpen, closeModal, openModal }, setActionsFns] = useModal();
  const { name, price, image, image_large, _id, type, count } = data;

  const [{ isDrag }, dragRef] = useDrag({
    type: type === "bun" ? "bun" : "ingridient",
    item: { _id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    setActionsFns({
      closeCallback: () => dispatch(removeIngredient()),
    });
  }, [dispatch, setActionsFns]);

  const handleClick = () => {
    dispatch(addIngredient(data));
    openModal();
  };

  return (
    <>
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
      </div>
      {modalIsOpen && (
        <Modal onClose={closeModal} title="Детали ингридиента">
          <IngridientDetails data={ingredient} />
        </Modal>
      )}
    </>
  );
};

BurgerIngridient.propTypes = {
  data: PropTypes.shape(INGRIDIENT_PROP_TYPES).isRequired,
};

export default BurgerIngridient;
