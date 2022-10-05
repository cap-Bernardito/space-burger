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

const Modal = ({ title, children, onClose }) => {
  const overlayRef = useRef();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    documentBody.classList.add(bodyClass);

    return () => documentBody.classList.remove(bodyClass);
  }, []);

  const handleClose = (event) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  return ReactDom.createPortal(
    <>
      <ModalOverlay />
      <div className={classNames(styles.modal, 'custom-scroll')}>
        <div className={classNames(styles.modal__inner)} ref={overlayRef} onClick={handleClose}>
          <div
            className={classNames(styles.modal__content, {
              [styles.modal__content_withoutHeader]: !title,
            })}
          >
            <div className={classNames(styles.close)} onClick={onClose}>
              <CloseIcon type="primary" />
            </div>
            {title && (
              <div className={classNames(styles.header, 'text text_type_main-large')}>{title}</div>
            )}
            <div className={classNames(styles.body, 'text text_type_main-default')}>{children}</div>
          </div>
        </div>
      </div>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  // NOTE: Стилизация заголовка может быть разная, потому должна быть возможность передать стилизованный элемент
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
