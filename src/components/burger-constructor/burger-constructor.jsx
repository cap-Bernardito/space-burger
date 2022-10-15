import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import classNames from "classnames";
import { ADD_BUN_EMPTY_TEXT, ADD_INGREDIENTS_EMPTY_TEXT } from "../../utils/constants";
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useModal } from "../../hooks";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { createOrder, removeOrderDetails } from "../../services/slices/order-details-slice";
import styles from "./burger-constructor.module.scss";
import { useEffect } from "react";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const [{ modalIsOpen, closeModal, openModal }, setActionsFns] = useModal();
  const { buns, ingredients, total } = useSelector((state) => state.burgerConstructor);
  const { number: orderNumber, loading: isLoading, error: isError } = useSelector((state) => state.orderDetails);
  const [topBun, bottomBun] = buns;

  const initialDropState = {
    accept: "bun",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  };
  const [{ isHover: isTopBunHover, canDrop: isTopBunCanDrop }, dropTopBunTarget] = useDrop({ ...initialDropState });
  const [{ isHover: isBottomBunHover, canDrop: isBottomBunCanDrop }, dropBottomBunTarget] = useDrop({
    ...initialDropState,
  });
  const [{ isHover: isIngredientHover, canDrop: isIngredientCanDrop }, dropIngredientTarget] = useDrop({
    ...initialDropState,
    accept: "ingredient",
  });
  const isBunHover = isBottomBunHover || isTopBunHover;
  const isBunCanDrop = isTopBunCanDrop || isBottomBunCanDrop;

  useEffect(() => {
    setActionsFns({
      closeCallback: () => dispatch(removeOrderDetails()),
    });
  }, [dispatch, setActionsFns]);

  useEffect(() => {
    if (orderNumber) {
      openModal();
    }
  }, [orderNumber, openModal]);

  const checkout = (e) => {
    e.preventDefault();

    const extractedIds = [topBun, ...ingredients, bottomBun].map(({ _id }) => _id);

    dispatch(createOrder(extractedIds));
  };

  const topBunElement = topBun ? (
    <BurgerConstructorElement isLocked={true} type="top" data={topBun} />
  ) : (
    <span className="text text_type_main-medium">{ADD_BUN_EMPTY_TEXT}</span>
  );

  const bottomBunElement = bottomBun ? (
    <BurgerConstructorElement isLocked={true} type="bottom" data={bottomBun} />
  ) : (
    <span className="text text_type_main-medium">{ADD_BUN_EMPTY_TEXT}</span>
  );

  const ingredientsListElement =
    ingredients.length > 0 ? (
      ingredients.map((ingredient, index) => (
        <BurgerConstructorElement key={ingredient.key} data={ingredient} index={index} />
      ))
    ) : (
      <span className="text text_type_main-medium">{ADD_INGREDIENTS_EMPTY_TEXT}</span>
    );

  const errorMessage = isError && (
    <div className={styles.error}>{`Возникла ошибка при получении данных заказа: ${isError}`}</div>
  );

  return (
    <>
      <div className={classNames(styles.container)}>
        <div
          className={classNames(
            styles.bun,
            styles.top,
            styles.drop,
            { [styles.empty]: buns.length === 0, [styles.onHover]: isBunHover, [styles.canDrop]: isBunCanDrop },
            "custom-scroll"
          )}
          ref={dropTopBunTarget}
        >
          {topBunElement}
        </div>

        <div
          className={classNames(
            styles.list,
            styles.drop,
            {
              [styles.empty]: ingredients.length === 0,
              [styles.onHover]: isIngredientHover,
              [styles.canDrop]: isIngredientCanDrop,
            },
            "custom-scroll"
          )}
          ref={dropIngredientTarget}
        >
          {ingredientsListElement}
        </div>

        <div
          className={classNames(
            styles.bun,
            styles.bottom,
            styles.drop,
            { [styles.empty]: buns.length === 0, [styles.onHover]: isBunHover, [styles.canDrop]: isBunCanDrop },
            "custom-scroll"
          )}
          ref={dropBottomBunTarget}
        >
          {bottomBunElement}
        </div>

        <div className={classNames(styles.order)}>
          {errorMessage}
          <div className={classNames(styles.order__sum, "text text_type_digits-medium")}>
            {total}&nbsp;
            <CurrencyIcon type="primary" />
          </div>
          <Button
            type="primary"
            size="large"
            htmlType="button"
            onClick={checkout}
            disabled={isLoading || buns.length === 0}
          >
            {isLoading ? "Загрузка ..." : "Оформить заказ"}
          </Button>
        </div>
      </div>
      {modalIsOpen && orderNumber && (
        <Modal onClose={closeModal}>
          <OrderDetails number={orderNumber} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
