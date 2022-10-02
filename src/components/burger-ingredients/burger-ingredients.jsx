import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngridientsCategory from '../burger-ingridients-category/burger-ingridients-category';
import { TYPES_OF_INGRIDIENTS } from '../../utils/constants';
import styles from './burger-ingredients.module.scss';

const [activeType] = Object.keys(TYPES_OF_INGRIDIENTS);

class BurgerIngridients extends React.Component {
  state = {
    activeType,
  };

  componentDidMount() {
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

  render() {
    const ingridientTypes = this.props.data.map(([category]) => category);

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

        <div className={`${styles.list} custom-scroll`}>
          {this.props.data.map((category) => (
            <BurgerIngridientsCategory key={category[0]} type={category[0]} list={category[1]} />
          ))}
        </div>
      </div>
    );
  }
}

export default BurgerIngridients;
