import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import { Reorder } from "framer-motion";

import React, { useEffect, useRef } from "react";
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
  const scrollableContainerRef = useRef<HTMLDivElement | null>(null);

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

  const checkout = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (typeof topBun === "undefined" || typeof bottomBun === "undefined") {
      notify("????????????????????, ???????????????? ?????????????? ?? ??????????.");

      return;
    }

    if (status === EAuthStatus.ok) {
      const extractedIds = [topBun, ...ingredients, bottomBun].map(({ _id }) => _id);

      dispatch(createOrder(extractedIds));

      return;
    }

    notify("????????????????????, ??????????????????????????. ???????????? ???????????????????????????? ???????????????????????? ?????????? ?????????????????? ??????????.");
    navigate(ROUTES.login.path);
  };

  useEffect(() => {
    const scrollableContainer = scrollableContainerRef.current;

    if (!scrollableContainer) {
      return;
    }

    const drop = scrollableContainer.querySelector("div:first-child") as HTMLDivElement;

    if (!drop) {
      return;
    }

    drop.style.height = "0";

    drop.style.height = `${scrollableContainer.scrollHeight}px`;
  }, [ingredients]);

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
    <div className={styles.error}>{`???????????????? ???????????? ?????? ?????????????????? ???????????? ????????????: ${isError}`}</div>
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
          data-test-id="drop-bun"
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
          ref={scrollableContainerRef}
          data-test-id="drop-ingredient"
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
            {isLoading ? "????????????????".padEnd("???????????????? ??????????".length, ".") : "???????????????? ??????????"}
          </ResponsiveButton>
        </div>
        <div className={styles.order_spacer}></div>
      </div>
      {modalIsOpen && orderNumber && (
        <Modal onClose={closeModal} title={isSmallScreen ? <span>?????????? ????????????????</span> : null}>
          <OrderDetails number={orderNumber} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
