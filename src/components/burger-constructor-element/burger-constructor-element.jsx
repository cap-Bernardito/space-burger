import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingridientPropTypes } from '../../utils/constants';
import styles from './burger-constructor-element.module.scss';

const BurgerConstructorElement = ({ type, data, isLocked }) => {
  return (
    <div className={`${styles.item} ${isLocked ? styles.locked : ''}`}>
      <div className={`${styles.item__lock} mr-2`}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={data.name}
        price={data.price}
        thumbnail={data.image}
      />
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
