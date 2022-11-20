import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import { Reorder } from "framer-motion";

import { FC } from "react";

import { useAppDispatch } from "hooks";
import { removeIngredientInBurgerConstructor } from "services/slices/burger-constructor-slice";

import styles from "./burger-constructor-element.module.scss";

type Props = {
  data: TIngredient | TIngredientWithKey;
  type?: "top" | "bottom";
  isLocked?: boolean;
  isOrdered?: boolean;
};

const isSortedItem = (data: TIngredient | TIngredientWithKey): data is TIngredientWithKey => "key" in data;

const BurgerConstructorElement: FC<Props> = ({ type, data, isLocked = false, isOrdered = false }) => {
  const dispatch = useAppDispatch();

  const handleClose = (removedItem: TIngredientWithKey) => {
    dispatch(removeIngredientInBurgerConstructor(removedItem));
  };

  const orderDecorator = (element: React.ReactNode, isSorted: boolean): React.ReactElement => {
    if (isSorted) {
      return (
        <Reorder.Item
          as="div"
          initial={{ opacity: 1 }}
          whileDrag={{ opacity: 0.9 }}
          value={data}
          // NOTE: для ингредиентов сгенерирован уникальный key, для булок он не нужен
          id={isSortedItem(data) ? data.key : data._id}
          className={classNames(styles.item__wrapper)}
        >
          {element}
        </Reorder.Item>
      );
    }

    return <span>{element}</span>;
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
        handleClose={isSortedItem(data) ? () => handleClose(data) : undefined}
      />
    </div>,
    isOrdered
  );
};

export default BurgerConstructorElement;
