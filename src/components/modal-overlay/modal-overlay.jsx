import styles from "./modal-overlay.module.scss";

// NOTE: Тут не нужен обработчик клика, т.к. у компоненте Modal z-index больше и сюда событие не доходит.
// Эффект клика по оверлею достигается кликом на контейнер с классом "modal__inner" в компоненте Modal. Там и обрабатывается.

const ModalOverlay = () => <div className={styles.root}></div>;

export default ModalOverlay;
