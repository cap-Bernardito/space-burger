import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngridientsCategory from "../burger-ingridients-category/burger-ingridients-category";
import { TYPES_OF_INGRIDIENTS, INGRIDIENT_PROP_TYPES } from "../../utils/constants";
import styles from "./burger-ingredients.module.scss";

const BurgerIngridients = ({ data }) => {
  const [activeTabName, setActiveTab] = useState(() => {
    const [activeType] = Object.keys(TYPES_OF_INGRIDIENTS);

    return activeType;
  });

  useEffect(() => {
    setCurrentTab();
  }, []);

  function setCurrentTab(tabName) {
    if (typeof tabName !== "undefined") {
      setActiveTab(tabName);
    }
  }

  const ingridientTypes = data.map(([category]) => category);

  const tabs = ingridientTypes.map((tabName) => (
    <Tab key={tabName} value={tabName} active={activeTabName === tabName} onClick={setCurrentTab}>
      {TYPES_OF_INGRIDIENTS[tabName]}
    </Tab>
  ));

  const burgerIngridientsCategory = useMemo(
    () =>
      data.map(([categoryName, categoryList]) => (
        <BurgerIngridientsCategory key={categoryName} type={categoryName} list={categoryList} />
      )),
    [data]
  );

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.tabs, "mb-10")}>{tabs}</div>
      <div className={classNames(styles.list, "custom-scroll")}>{burgerIngridientsCategory}</div>
    </div>
  );
};

BurgerIngridients.propTypes = {
  data: PropTypes.arrayOf((propValue, index) => {
    const dataPropsTypes = {
      dataCategoryName: PropTypes.string.isRequired,
      dataCategoryList: PropTypes.arrayOf(PropTypes.shape(INGRIDIENT_PROP_TYPES)).isRequired,
    };
    const [categoryName, categoryList] = propValue[index];
    const props = {
      dataCategoryName: categoryName,
      dataCategoryList: categoryList,
    };

    PropTypes.checkPropTypes(dataPropsTypes, props, "prop", "BurgerIngridients");
  }).isRequired,
};

export default BurgerIngridients;
