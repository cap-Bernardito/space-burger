import React from 'react';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.scss';

class BurgerConstructor extends React.Component {
  render() {
    // Todo сделать логику валидного набора ингридиентов в конструкторе, а пока для верстки отображаются все ингридиенты
    const buns = this.props.data
      .filter(([category]) => category === 'bun')
      .reduce((acc, [, data]) => acc.concat(data), []);
    const ingridients = this.props.data
      .filter(([category]) => category !== 'bun')
      .reduce((acc, [, data]) => acc.concat(data), []);

    return (
      <div className={styles.container}>
        {buns[0] && (
          <div className={`${styles.bun} custom-scroll`}>
            {<BurgerConstructorElement isLocked={true} type="top" data={buns[0]} />}
          </div>
        )}

        <div className={`${styles.list} custom-scroll`}>
          {ingridients.map((ingridient) => (
            <BurgerConstructorElement key={ingridient._id} data={ingridient} />
          ))}
        </div>

        {buns[0] && (
          <div className={`${styles.bun} custom-scroll`}>
            {<BurgerConstructorElement isLocked={true} type="bottom" data={buns[0]} />}
          </div>
        )}

        <div className={`${styles.order}`}>
          <div className={`${styles.order__sum} text text_type_digits-medium`}>
            610&nbsp;
            <CurrencyIcon type="primary" />
          </div>
          <div className={`${styles.order__submit}`}>
            <Button type="primary" size="large" htmlType="button">
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default BurgerConstructor;
