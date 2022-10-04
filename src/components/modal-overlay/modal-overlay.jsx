import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './modal-overlay.module.scss';

const ModalOverlay = React.forwardRef(({ children, onClose }, ref) => {
  return (
    <div className={classNames(styles.root, 'custom-scroll')} onClick={onClose}>
      <div className={classNames(styles.root__content)} ref={ref}>
        {children}
      </div>
    </div>
  );
});

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
