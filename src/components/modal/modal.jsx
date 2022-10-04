import { useEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.scss';

const bodyClass = 'modal-opened';
const modalRoot = document.getElementById('modals');
const documentBody = document.querySelector('body');

const Modal = ({ title, children, onClose, show }) => {
  const overlayRef = useRef();

  useEffect(() => {
    if (show) {
      documentBody.classList.add(bodyClass);

      return () => documentBody.classList.remove(bodyClass);
    }
  }, [show]);

  const handleClose = (event) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    show &&
    ReactDom.createPortal(
      <ModalOverlay onClose={handleClose} ref={overlayRef}>
        <div className={classNames(styles.modal, !title && styles.modal_withoutHeader)}>
          <div className={classNames(styles.close)} onClick={onClose}>
            <CloseIcon type="primary" />
          </div>
          {title && (
            <div className={classNames(styles.header, 'text text_type_main-large')}>{title}</div>
          )}
          <div className={classNames(styles.body, 'text text_type_main-default')}>{children}</div>
        </div>
      </ModalOverlay>,
      modalRoot
    )
  );
};

Modal.propTypes = {
  // NOTE: Стилизация заголовка может быть разная, потому должна быть возможность передать стилизованный элемент
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
