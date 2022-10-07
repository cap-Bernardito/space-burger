import { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ApiService from "../../services/api-service";
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useModal } from "../hooks";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { INGRIDIENT_PROP_TYPES } from "../../utils/constants";
import styles from "./burger-constructor.module.scss";

const apiService = new ApiService();

const BurgerConstructor = ({ data }) => {
  const { modalIsOpen, closeModal, showModal } = useModal();
  const [orderInfo, setOrderInfo] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  // Todo: Cделать логику валидного набора ингридиентов в конструкторе. Пока для верстки отображаются все ингридиенты
  const buns = data
    .filter(([categoryName]) => categoryName === "bun")
    .reduce((acc, [, categoryList]) => acc.concat(categoryList), []);
  const ingridients = data
    .filter(([categoryName]) => categoryName !== "bun")
    .reduce((acc, [, categoryList]) => acc.concat(categoryList), []);

  const checkout = async () => {
    setLoading(true);
    setError(false);
    setOrderInfo(false);

    try {
      const fetchedData = await apiService.getOrderInfo();

      setOrderInfo(fetchedData);
      showModal();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

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

        {buns[0] && (
          <div className={classNames(styles.bun, "custom-scroll")}>
            {<BurgerConstructorElement isLocked={true} type="bottom" data={buns[0]} />}
          </div>
        )}

        <div className={classNames(styles.order)}>
          {error && <div className={styles.error}>{`Возникла ошибка при получении данных заказа: ${error}`}</div>}
          <div className={classNames(styles.order__sum, "text text_type_digits-medium")}>
            610&nbsp;
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large" htmlType="button" onClick={checkout} disabled={loading}>
            {loading ? "Загрузка ..." : "Оформить заказ"}
          </Button>
        </div>
      </div>
      {modalIsOpen && orderInfo && (
        <Modal onClose={closeModal}>
          <OrderDetails number={orderInfo} />
        </Modal>
      )}
    </>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf((propValue, index) => {
    const dataPropsTypes = {
      dataCategoryName: PropTypes.string.isRequired,
      dataCategoryList: PropTypes.arrayOf(PropTypes.shape(INGRIDIENT_PROP_TYPES)).isRequired,
    };
    const [categoryName, categoryList] = propValue[index];
    const props = {
      dataCategoryName: categoryName,
      dataCategoryList: categoryList,
    };

    PropTypes.checkPropTypes(dataPropsTypes, props, "prop", "BurgerConstructor");
  }).isRequired,
};

export default BurgerConstructor;
