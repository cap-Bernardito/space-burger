import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import PropTypes from "prop-types";

import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";

import { moveIngredient } from "../../services/slices/burger-constructor-slice";
import { removeIngredient } from "../../services/slices/burger-constructor-slice";
import { decreaseIngredientCount } from "../../services/slices/burger-ingredients-slice";
import { INGREDIENT_PROP_TYPES } from "../../utils/constants";

import styles from "./burger-constructor-element.module.scss";

const BurgerConstructorElement = ({ type = "", data, isLocked = false, index = 0 }) => {
  const dispatch = useDispatch();

  // NOTE: Взято отсюда https://react-dnd.github.io/react-dnd/examples/sortable/simple
  const ref = useRef(null);
  const draggingItemType = "constructor_item";
  const [{ isHover }, drop] = useDrop({
    accept: draggingItemType,
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(moveIngredient({ dragIndex, hoverIndex }));

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: draggingItemType,
    item: () => {
      return { id: data._id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleClose = (removedItem) => {
    dispatch(removeIngredient(removedItem));
    dispatch(decreaseIngredientCount(removedItem));
  };

  return (
    <div
      className={classNames(styles.item, {
        [styles.locked]: isLocked,
        [styles.dragging]: isDragging,
        [styles.hover]: isHover,
      })}
      ref={isLocked ? null : ref}
    >
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
  data: PropTypes.shape(INGREDIENT_PROP_TYPES).isRequired,
  isLocked: PropTypes.bool,
  index: PropTypes.number,
};

export default BurgerConstructorElement;
