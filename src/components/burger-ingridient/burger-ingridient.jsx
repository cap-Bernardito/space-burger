import { useState } from "react";
import classNames from "classnames";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useModal } from "../hooks";
import Modal from "../modal/modal";
import IngridientDetails from "../ingridient-details/ingridient-details";
import { INGRIDIENT_PROP_TYPES } from "../../utils/constants";

import styles from "./burger-ingridient.module.scss";

const BurgerIngridient = ({ data }) => {
  const [count, setCount] = useState(0);
  const { modalIsOpen, closeModal, showModal } = useModal();
  const { name, price, image, image_large } = data;

  const handleClick = () => {
    // TODO: заменить счетчик при реализации DnD
    setCount((current) => current + 1);
    showModal();
  };

  return (
    <>
      <div className={classNames(styles.box, "pb-4")} onClick={handleClick}>
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
          <IngridientDetails data={data} />
        </Modal>
      )}
    </>
  );
};

BurgerIngridient.propTypes = {
  data: PropTypes.shape(INGRIDIENT_PROP_TYPES).isRequired,
};

export default BurgerIngridient;
