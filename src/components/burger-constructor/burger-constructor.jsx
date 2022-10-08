import { useContext } from "react";
import classNames from "classnames";
import ApiService from "../../services/api-service";
import { BurgerConstructorContext } from "../../services/burgerConstructorContext";
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useModal, useFetch } from "../../hooks";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.scss";

const apiService = new ApiService();

const BurgerConstructor = () => {
  const { modalIsOpen, closeModal, showModal } = useModal();
  const [{ data: orderNumber, isLoading, isError }, setFetchFns] = useFetch([]);
  const { burgerConstructorState } = useContext(BurgerConstructorContext);

  const checkout = () => {
    const extractedIds = [burgerConstructorState.buns[0], ...burgerConstructorState.ingridients].map(({ _id }) => _id);

    setFetchFns({
      getDataFn: () => apiService.createOrder.call(apiService, extractedIds),
      doneFn: showModal,
    });
  };

  const { buns, ingridients, total } = burgerConstructorState;

  return (
    <>
      <div className={classNames(styles.container)}>
        {buns[0] && (
          <div className={classNames(styles.bun, "custom-scroll")}>
            {<BurgerConstructorElement isLocked={true} type="top" data={buns[0]} />}
          </div>
        )}

        <div className={classNames(styles.list, "custom-scroll")}>
          {ingridients.map((ingridient) => (
            <BurgerConstructorElement key={ingridient._id} data={ingridient} />
          ))}
        </div>

        {buns[1] && (
          <div className={classNames(styles.bun, "custom-scroll")}>
            {<BurgerConstructorElement isLocked={true} type="bottom" data={buns[1]} />}
          </div>
        )}

        <div className={classNames(styles.order)}>
          {isError && <div className={styles.error}>{`Возникла ошибка при получении данных заказа: ${isError}`}</div>}
          <div className={classNames(styles.order__sum, "text text_type_digits-medium")}>
            {total}&nbsp;
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large" htmlType="button" onClick={checkout} disabled={isLoading}>
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
