import { useContext } from "react";
import { useDrop } from "react-dnd";
import classNames from "classnames";
import apiService from "../../services/api-service";
import { BurgerConstructorContext } from "../../services/burgerConstructorContext";
import { ADD_BUN_EMPTY_TEXT, ADD_INGRIDIENTS_EMPTY_TEXT } from "../../utils/constants";
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useModal, useFetch } from "../../hooks";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.scss";

const BurgerConstructor = ({ onDropHandler }) => {
  const { modalIsOpen, closeModal, showModal } = useModal();
  const [{ data: orderNumber, isLoading, isError }, setFetchFns] = useFetch([]);
  const { burgerConstructorState } = useContext(BurgerConstructorContext);

  const initialDropState = {
    accept: "bun",
    drop(itemId) {
      onDropHandler(itemId);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  };
  const [{ isHover: isTopBunHover }, dropTopBunTarget] = useDrop({ ...initialDropState });
  const [{ isHover: isBottomBunHover }, dropBottomBunTarget] = useDrop({ ...initialDropState });
  const [{ isHover: isIngridientHover }, dropIngridientTarget] = useDrop({ ...initialDropState, accept: "ingridient" });
  const isBunHover = isBottomBunHover || isTopBunHover;

  const checkout = () => {
    const extractedIds = [burgerConstructorState.buns[0], ...burgerConstructorState.ingridients].map(({ _id }) => _id);

    setFetchFns({
      getDataFn: async () => apiService.createOrder(extractedIds),
      doneFn: showModal,
    });
  };

  const { buns, ingridients, total } = burgerConstructorState;

  const topBun = buns[0] ? (
    <BurgerConstructorElement isLocked={true} type="top" data={buns[0]} />
  ) : (
    <span className="text text_type_main-medium">{ADD_BUN_EMPTY_TEXT}</span>
  );

  const bottomBun = buns[1] ? (
    <BurgerConstructorElement isLocked={true} type="bottom" data={buns[1]} />
  ) : (
    <span className="text text_type_main-medium">{ADD_BUN_EMPTY_TEXT}</span>
  );

  const ingridientsList =
    ingridients.length > 0 ? (
      ingridients.map((ingridient) => <BurgerConstructorElement key={ingridient.key} data={ingridient} />)
    ) : (
      <span className="text text_type_main-medium">{ADD_INGRIDIENTS_EMPTY_TEXT}</span>
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
            { [styles.empty]: buns.length === 0, [styles.onHover]: isBunHover },
            "custom-scroll"
          )}
          ref={dropTopBunTarget}
        >
          {topBun}
        </div>

        <div
          className={classNames(
            styles.list,
            styles.drop,
            { [styles.empty]: ingridients.length === 0, [styles.onHover]: isIngridientHover },
            "custom-scroll"
          )}
          ref={dropIngridientTarget}
        >
          {ingridientsList}
        </div>

        <div
          className={classNames(
            styles.bun,
            styles.bottom,
            styles.drop,
            { [styles.empty]: buns.length === 0, [styles.onHover]: isBunHover },
            "custom-scroll"
          )}
          ref={dropBottomBunTarget}
        >
          {bottomBun}
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
