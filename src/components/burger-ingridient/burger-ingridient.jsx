import { useState } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingridientPropTypes } from '../../utils/constants';

import styles from './burger-ingridient.module.scss';

const BurgerIngridient = ({ data }) => {
  const [count, setCount] = useState(0);
  const { name, price, image, image_mobile, image_large } = data;

  return (
    <div className={`${styles.box} pb-4`} onClick={() => setCount(count + 1)}>
      {count === 0 ? null : <Counter count={count} size="default" />}
      <div className={`${styles.image} mb-1 pr-1 pl-1`}>
        <img
          src={image}
          alt={name}
          srcSet={`${image_mobile} 144w, ${image} 240w, ${image_large} 480w`}
          sizes="240px"
        />
      </div>
      <div className={`${styles.price} mb-1 text text_type_digits-default`}>
        <span className={styles.price__num}>{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={styles.title}>{name}</div>
    </div>
  );
};

BurgerIngridient.propTypes = {
  data: PropTypes.shape(ingridientPropTypes).isRequired,
};

export default BurgerIngridient;
