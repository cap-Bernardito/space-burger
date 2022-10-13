import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngridientsCategory from "../burger-ingridients-category/burger-ingridients-category";
import { TYPES_OF_INGRIDIENTS, INGRIDIENT_PROP_TYPES } from "../../utils/constants";
import { transformIngridientsList } from "../../utils/utils";
import styles from "./burger-ingredients.module.scss";

const BurgerIngridients = ({ data }) => {
  const [activeTabName, setActiveTab] = useState(() => {
    const [activeType] = Object.keys(TYPES_OF_INGRIDIENTS);

    return activeType;
  });

  const tabsRef = useRef();

  const transformedData = useMemo(() => transformIngridientsList(data), [data]);

  const categoryDOMElements = useMemo(() => ({}), []);

  useEffect(() => {
    Object.keys(TYPES_OF_INGRIDIENTS).forEach((type) => {
      categoryDOMElements[type] = document.getElementById(type);
    });
  }, [categoryDOMElements]);

  const setCurrentTab = useCallback(
    (tabName) => {
      categoryDOMElements[tabName] && categoryDOMElements[tabName].scrollIntoView({ behavior: "smooth" });
    },
    [categoryDOMElements]
  );

  const handleScroll = () => {
    const cssFlexGap = 40;
    const tabsBottomPosition = tabsRef.current.getBoundingClientRect().bottom;

    let delta = Number.MAX_VALUE;
    let result = "";

    Object.keys(TYPES_OF_INGRIDIENTS).forEach((type) => {
      const categoryBottomPosition = categoryDOMElements[type].getBoundingClientRect().bottom;
      const newDelta = categoryBottomPosition - tabsBottomPosition - cssFlexGap;

      if (0 < newDelta && newDelta < delta) {
        result = type;
        delta = categoryBottomPosition;
      }
    });

    setActiveTab(result);
  };

  const ingridientTypes = transformedData.map(([category]) => category);

  const tabs = ingridientTypes.map((tabName) => (
    <Tab key={tabName} value={tabName} active={activeTabName === tabName} onClick={setCurrentTab}>
      {TYPES_OF_INGRIDIENTS[tabName]}
    </Tab>
  ));

  const burgerIngridientsCategory = useMemo(
    () =>
      transformedData.map(([categoryName, categoryList]) => (
        <div key={categoryName} id={categoryName}>
          <BurgerIngridientsCategory type={categoryName} list={categoryList} />
        </div>
      )),
    [transformedData]
  );

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.tabs, "mb-10")} ref={tabsRef}>
        {tabs}
      </div>
      <div className={classNames(styles.list, "custom-scroll")} onScroll={handleScroll}>
        {burgerIngridientsCategory}
      </div>
    </div>
  );
};

BurgerIngridients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(INGRIDIENT_PROP_TYPES)).isRequired,
};

export default BurgerIngridients;
