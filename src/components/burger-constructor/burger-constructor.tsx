import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import { Reorder } from "framer-motion";

import { useEffect } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector, useModal, useScreenTest } from "hooks";
import { selectAuth } from "services/slices/auth-slice";
import {
  selectBuns,
  selectIngredients,
  selectTotalPrice,
  setIngredientsInBurgerConstructor,
} from "services/slices/burger-constructor-slice";
import { createOrder, removeOrderDetails } from "services/slices/order-details-slice";
import { ADD_BUN_EMPTY_TEXT, ADD_INGREDIENTS_EMPTY_TEXT, EAuthStatus, ROUTES } from "utils/constants";
import { notify } from "utils/utils";

import BurgerConstructorElement from "components/burger-constructor-element/burger-constructor-element";
import Modal from "components/modal/modal";
import OrderDetails from "components/order-details/order-details";
import ResponsiveButton from "components/responsive-button/responsive-button";

import styles from "./burger-constructor.module.scss";

const BurgerConstructor: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSmallScreen = useScreenTest();
  const { status } = useAppSelector(selectAuth);
  const buns = useAppSelector(selectBuns);
  const ingredients = useAppSelector(selectIngredients);
  const total = useAppSelector(selectTotalPrice);
  const [{ modalIsOpen, closeModal, openModal }, setActionsFns] = useModal();
  const { number: orderNumber, loading: isLoading, error: isError } = useAppSelector((state) => state.orderDetails);
  const [topBun, bottomBun] = buns;

  const initialDropState = {
    accept: "bun",
    collect: (monitor: DropTargetMonitor) => ({
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

  const checkout = (event: React.MouseEvent) => {
    event.preventDefault();

    if (typeof topBun === "undefined" || typeof bottomBun === "undefined") {
      notify("Пожалуйста, добавьте булочку в заказ.");

      return;
    }

    if (status === EAuthStatus.ok) {
      const extractedIds = [topBun, ...ingredients, bottomBun].map(({ _id }) => _id);

      dispatch(createOrder(extractedIds));

      return;
    }

    notify("Пожалуйста, авторизуйтесь. Только авторизованные пользователи могут оставлять заказ.");
    navigate(ROUTES.login.path);
  };

  const topBunElement = topBun ? (
    <BurgerConstructorElement isLocked={true} type="top" data={topBun} />
  ) : (
    <span className={classNames(styles.drop_text, "text text_type_main-medium")}>{ADD_BUN_EMPTY_TEXT}</span>
  );

  const bottomBunElement = bottomBun ? (
    <BurgerConstructorElement isLocked={true} type="bottom" data={bottomBun} />
  ) : (
    <span className={classNames(styles.drop_text, "text text_type_main-medium")}>{ADD_BUN_EMPTY_TEXT}</span>
  );

  const ingredientsListElement =
    ingredients.length > 0 ? (
      ingredients.map((ingredient) => (
        <BurgerConstructorElement key={ingredient.key} isOrdered={true} data={ingredient} />
      ))
    ) : (
      <span className={classNames(styles.drop_text, "text text_type_main-medium")}>{ADD_INGREDIENTS_EMPTY_TEXT}</span>
    );

  const errorMessage = Boolean(isError) && (
    <div className={styles.error}>{`Возникла ошибка при получении данных заказа: ${isError}`}</div>
  );

  const reorderIngredients = (items: TIngredientWithKey[]) => {
    dispatch(setIngredientsInBurgerConstructor(items));
  };

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

        <Reorder.Group
          as="div"
          axis="y"
          layoutScroll
          onReorder={reorderIngredients}
          values={ingredients}
          className={classNames(styles.list, { [styles.empty]: ingredients.length === 0 }, "custom-scroll")}
        >
          <div
            className={classNames(styles.list__inner, styles.drop, {
              [styles.empty]: ingredients.length === 0,
              [styles.onHover]: isIngredientHover,
              [styles.canDrop]: isIngredientCanDrop,
            })}
            ref={dropIngredientTarget}
          ></div>
          {ingredientsListElement}
        </Reorder.Group>

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
          <ResponsiveButton
            type="primary"
            size="large"
            htmlType="button"
            onClick={checkout}
            disabled={isLoading || buns.length === 0}
          >
            {isLoading ? "Загрузка".padEnd("Оформить заказ".length, ".") : "Оформить заказ"}
          </ResponsiveButton>
        </div>
        <div className={styles.order_spacer}></div>
      </div>
      {modalIsOpen && orderNumber && (
        <Modal onClose={closeModal} title={isSmallScreen ? <span>Заказ оформлен</span> : null}>
          <OrderDetails number={orderNumber} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
