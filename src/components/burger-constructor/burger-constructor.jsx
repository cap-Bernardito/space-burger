import React from 'react';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ApiService from '../../services/api-service';
import styles from './burger-constructor.module.scss';

const apiService = new ApiService();

class BurgerConstructor extends React.Component {
  state = {
    buns: [],
    ingridients: [],
    loading: false,
    error: false,
  };

  componentDidMount() {
    // Todo временные данные для верстки
    this.getBurgerIngridients();
  }

  async getBurgerIngridients() {
    this.setState({
      ...this.state,
      loading: true,
    });

    try {
      const ingridients = await apiService.getBurgerIngridients();

      // Todo временные данные для верстки
      const buns = [];
      buns.push(ingridients.pop());
      buns.push(ingridients.pop());

      this.setState({
        ...this.state,
        buns,
        ingridients,
        loading: false,
      });
    } catch (error) {
      this.setState({
        ...this.state,
        error: true,
      });
    }
  }

  render() {
    return (
      <div className={styles.container}>
        {!this.state.buns[0] ? null : (
          <div className={`${styles.bun} custom-scroll`}>
            {<BurgerConstructorElement isLocked={true} type="top" data={this.state.buns[0]} />}
          </div>
        )}

        <div className={`${styles.list} custom-scroll`}>
          {this.state.error
            ? 'Что-то пошло не так...'
            : this.state.loading
            ? 'Загрузка...'
            : this.state.ingridients.map((ingridient) => (
                <BurgerConstructorElement key={ingridient._id} data={ingridient} />
              ))}
        </div>

        {!this.state.buns[0] ? null : (
          <div className={`${styles.bun} custom-scroll`}>
            {<BurgerConstructorElement isLocked={true} type="bottom" data={this.state.buns[1]} />}
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
