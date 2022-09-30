import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingridientPropTypes } from '../../utils/constants';
import img from '../../images/img.png';
import styles from './burger-constructor-element.module.scss';

const BurgerConstructorElement = ({ type, data, isLocked }) => {
  return (
    <div className={`${styles.item} ${isLocked ? styles.locked : ''}`}>
      <div className={`${styles.item__lock} mr-2`}>
        <DragIcon type="primary" />
      </div>
      <div>
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={img}
        />
      </div>
    </div>
  );
};

BurgerConstructorElement.defaultProps = {
  type: '',
  isLocked: false,
};

BurgerConstructorElement.propTypes = {
  type: PropTypes.string,
  data: PropTypes.shape(ingridientPropTypes).isRequired,
  isLocked: PropTypes.bool,
};

export default BurgerConstructorElement;
