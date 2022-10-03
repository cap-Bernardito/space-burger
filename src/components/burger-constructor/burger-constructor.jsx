import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import { INGRIDIENT_PROP_TYPES } from '../../utils/constants';
import styles from './burger-constructor.module.scss';

const BurgerConstructor = ({ data }) => {
  // Todo Cделать логику валидного набора ингридиентов в конструкторе. Пока для верстки отображаются все ингридиенты
  const buns = data
    .filter(([categoryName]) => categoryName === 'bun')
    .reduce((acc, [, categoryList]) => acc.concat(categoryList), []);
  const ingridients = data
    .filter(([categoryName]) => categoryName !== 'bun')
    .reduce((acc, [, categoryList]) => acc.concat(categoryList), []);

  return (
    <div className={classNames(styles.container)}>
      {buns[0] && (
        <div className={classNames(styles.bun, 'custom-scroll')}>
          {<BurgerConstructorElement isLocked={true} type="top" data={buns[0]} />}
        </div>
      )}

      <div className={classNames(styles.list, 'custom-scroll')}>
        {ingridients.map((ingridient) => (
          <BurgerConstructorElement key={ingridient._id} data={ingridient} />
        ))}
      </div>

      {buns[0] && (
        <div className={classNames(styles.bun, 'custom-scroll')}>
          {<BurgerConstructorElement isLocked={true} type="bottom" data={buns[0]} />}
        </div>
      )}

      <div className={classNames(styles.order)}>
        <div className={classNames(styles.order__sum, 'text text_type_digits-medium')}>
          610&nbsp;
          <CurrencyIcon type="primary" />
        </div>
        <div className={classNames(styles.order__submit)}>
          <Button type="primary" size="large" htmlType="button">
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf((_, index) => {
    const dataPropsTypes = {
      dataNameCategory: PropTypes.string.isRequired,
      dataListCategory: PropTypes.arrayOf(PropTypes.shape(INGRIDIENT_PROP_TYPES)).isRequired,
    };
    const [categoryName, categoryList] = _[index];
    const props = {
      dataNameCategory: categoryName,
      dataListCategory: categoryList,
    };

    PropTypes.checkPropTypes(dataPropsTypes, props, 'prop', 'BurgerConstructor');
  }).isRequired,
};

export default BurgerConstructor;
