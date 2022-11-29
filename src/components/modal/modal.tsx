import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";

import { useEffect, useRef } from "react";
import ReactDom from "react-dom";

import ModalOverlay from "components/modal-overlay/modal-overlay";

import styles from "./modal.module.scss";

const bodyClass = "modal-opened";
const modalRoot = document.getElementById("modals") as HTMLDivElement;
const documentBody = document.querySelector("body") as HTMLBodyElement;

type Props = {
  title: React.ReactNode;
  type?: "order";
  onClose: () => void;
};

const Modal: React.FC<React.PropsWithChildren<Props>> = ({ title, onClose, type, children }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    documentBody.classList.add(bodyClass);

    return () => documentBody.classList.remove(bodyClass);
  }, []);

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  return ReactDom.createPortal(
    <>
      <ModalOverlay />
      <div className={classNames(styles.modal, "custom-scroll")}>
        <div className={classNames(styles.modal__inner)} ref={overlayRef} onClick={handleClose}>
          <div
            className={classNames(styles.modal__content, {
              [styles.modal__content_withoutHeader]: !title,
              [styles.modal__content_order]: type === "order",
            })}
          >
            <div className={classNames(styles.close)} onClick={onClose}>
              <CloseIcon type="primary" />
            </div>
            {title && <div className={classNames(styles.header, "text text_type_main-large")}>{title}</div>}
            <div className={classNames(styles.body, "text text_type_main-default")}>{children}</div>
          </div>
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
