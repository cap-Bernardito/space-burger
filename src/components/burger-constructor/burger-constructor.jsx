import { useContext } from "react";
import classNames from "classnames";
import apiService from "../../services/api-service";
import { BurgerConstructorContext } from "../../services/burgerConstructorContext";
import { ADD_BUN_EMPTY_TEXT, ADD_INGRIDIENTS_EMPTY_TEXT } from "../../utils/constants";
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useModal, useFetch } from "../../hooks";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import css from "./burger-constructor.module.scss";

const BurgerConstructor = () => {
  const { modalIsOpen, closeModal, showModal } = useModal();
  const [{ data: orderNumber, isLoading, isError }, setFetchFns] = useFetch([]);
  const { burgerConstructorState } = useContext(BurgerConstructorContext);

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
      ingridients.map((ingridient) => <BurgerConstructorElement key={ingridient._id} data={ingridient} />)
    ) : (
      <span className="text text_type_main-medium">{ADD_INGRIDIENTS_EMPTY_TEXT}</span>
    );

  const errorMessage = isError && (
    <div className={css.error}>{`Возникла ошибка при получении данных заказа: ${isError}`}</div>
  );

  return (
    <>
      <div className={classNames(css.container)}>
        <div className={classNames(css.bun, css.bun__top, { [css.bun__empty]: buns.length === 0 }, "custom-scroll")}>
          {topBun}
        </div>

        <div className={classNames(css.list, { [css.list__empty]: ingridients.length === 0 }, "custom-scroll")}>
          {ingridientsList}
        </div>

        <div className={classNames(css.bun, css.bun__bottom, { [css.bun__empty]: buns.length === 0 }, "custom-scroll")}>
          {bottomBun}
        </div>

        <div className={classNames(css.order)}>
          {errorMessage}
          <div className={classNames(css.order__sum, "text text_type_digits-medium")}>
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
