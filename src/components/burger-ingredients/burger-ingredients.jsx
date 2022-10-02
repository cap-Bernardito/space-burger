import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngridientsCategory from '../burger-ingridients-category/burger-ingridients-category';
import { TYPES_OF_INGRIDIENTS, INGRIDIENT_PROP_TYPES } from '../../utils/constants';
import styles from './burger-ingredients.module.scss';

const BurgerIngridients = ({ data }) => {
  const [activeTabName, setActiveTab] = useState(() => {
    const [activeType] = Object.keys(TYPES_OF_INGRIDIENTS);

    return activeType;
  });

  useEffect(() => {
    setCurrentTab();
  }, []);

  function setCurrentTab(tabName) {
    if (typeof tabName !== 'undefined') {
      setActiveTab(tabName);
    }
  }

  const ingridientTypes = data.map(([category]) => category);

  return (
    <div className={styles.container}>
      <div className={`${styles.tabs} mb-10`}>
        {ingridientTypes.map((tabName) => (
          <Tab
            key={tabName}
            value={tabName}
            active={activeTabName === tabName}
            onClick={setCurrentTab}
          >
            {TYPES_OF_INGRIDIENTS[tabName]}
          </Tab>
        ))}
      </div>

      <div className={`${styles.list} custom-scroll`}>
        {data.map(([categoryName, categoryList]) => (
          <BurgerIngridientsCategory key={categoryName} type={categoryName} list={categoryList} />
        ))}
      </div>
    </div>
  );
};

BurgerIngridients.propTypes = {
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

    PropTypes.checkPropTypes(dataPropsTypes, props, 'prop', 'BurgerIngridients');
  }).isRequired,
};

export default BurgerIngridients;
