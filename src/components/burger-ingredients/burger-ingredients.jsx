import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngridientsCategory from '../burger-ingridients-category/burger-ingridients-category';
import ApiService from '../../services/api-service';
import { TYPES_OF_INGRIDIENTS } from '../../utils/constants';

import styles from './burger-ingredients.module.scss';

const apiService = new ApiService();
const [activeType] = Object.keys(TYPES_OF_INGRIDIENTS);

class BurgerIngridients extends React.Component {
  state = {
    ingridients: [],
    activeType,
    loading: false,
    error: false,
  };

  componentDidMount() {
    this.getBurgerIngridients();
    this.setCurrentTab();
  }

  setCurrentTab = (tabName) => {
    if (typeof tabName === 'undefined') {
      return;
    }

    this.setState({
      ...this.setState,
      activeType: tabName,
    });
  };

  async getBurgerIngridients() {
    this.setState({
      ...this.state,
      loading: true,
    });

    try {
      const ingridients = await apiService.getBurgerIngridientsByType();

      this.setState({
        ...this.state,
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
    const ingridientTypes = this.state.ingridients.map(([category]) => category);
    let ingridientList;

    if (this.state.error) {
      ingridientList = 'Что-то пошло не так...';
    } else if (this.state.loading) {
      ingridientList = 'Загрузка...';
    } else {
      ingridientList = this.state.ingridients.map((category) => (
        <BurgerIngridientsCategory key={category[0]} type={category[0]} list={category[1]} />
      ));
    }

    return (
      <div className={styles.container}>
        <div className={`${styles.tabs} mb-10`}>
          {ingridientTypes.map((tabName) => (
            <Tab
              key={tabName}
              value={tabName}
              active={this.state.activeType === tabName}
              onClick={this.setCurrentTab}
            >
              {TYPES_OF_INGRIDIENTS[tabName]}
            </Tab>
          ))}
        </div>

        <div className={`${styles.list} custom-scroll`}>{ingridientList}</div>
      </div>
    );
  }
}

export default BurgerIngridients;
