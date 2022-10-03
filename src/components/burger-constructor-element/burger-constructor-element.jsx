import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { INGRIDIENT_PROP_TYPES } from '../../utils/constants';
import styles from './burger-constructor-element.module.scss';

const BurgerConstructorElement = ({ type = '', data, isLocked = false }) => {
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

BurgerConstructorElement.propTypes = {
  type: PropTypes.string,
  data: PropTypes.shape(INGRIDIENT_PROP_TYPES).isRequired,
  isLocked: PropTypes.bool,
};

export default BurgerConstructorElement;
