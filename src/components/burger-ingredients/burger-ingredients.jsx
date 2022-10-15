import { INGREDIENT_PROP_TYPES, TYPES_OF_INGREDIENTS } from "../../utils/constants";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";
import classNames from "classnames";
import PropTypes from "prop-types";
import { splitIngredientsByTypes } from "../../utils/utils";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
// eslint-disable-next-line sort-imports
import styles from "./burger-ingredients.module.scss";

const BurgerIngredients = ({ data }) => {
  const [activeTabName, setActiveTab] = useState(() => {
    const [activeType] = Object.keys(TYPES_OF_INGREDIENTS);

    return activeType;
  });

  const dataByCategory = useMemo(() => splitIngredientsByTypes(data), [data]);

  const categoryDOMElements = useMemo(() => ({}), []);

  useEffect(() => {
    Object.keys(TYPES_OF_INGREDIENTS).forEach((type) => {
      categoryDOMElements[type] = document.getElementById(type);
    });
  }, [categoryDOMElements]);

  const setCurrentTab = useCallback(
    (tabName) => {
      categoryDOMElements[tabName] && categoryDOMElements[tabName].scrollIntoView({ behavior: "smooth" });
    },
    [categoryDOMElements]
  );

  const tabsRef = useRef();

  const handleScroll = () => {
    const cssFlexGap = 40;
    const tabsBottomPosition = tabsRef.current.getBoundingClientRect().bottom;

    let delta = Number.MAX_VALUE;
    let result = "";

    Object.keys(TYPES_OF_INGREDIENTS).forEach((type) => {
      const categoryBottomPosition = categoryDOMElements[type].getBoundingClientRect().bottom;
      const newDelta = categoryBottomPosition - tabsBottomPosition - cssFlexGap;

      if (0 < newDelta && newDelta < delta) {
        result = type;
        delta = categoryBottomPosition;
      }
    });

    setActiveTab(result);
  };

  const ingredientTypes = dataByCategory.map(([category]) => category);

  const tabs = ingredientTypes.map((tabName) => (
    <Tab key={tabName} value={tabName} active={activeTabName === tabName} onClick={setCurrentTab}>
      {TYPES_OF_INGREDIENTS[tabName]}
    </Tab>
  ));

  const burgerIngredientsCategory = useMemo(
    () =>
      dataByCategory.map(([categoryName, categoryList]) => (
        <div key={categoryName} id={categoryName}>
          <BurgerIngredientsCategory type={categoryName} list={categoryList} />
        </div>
      )),
    [dataByCategory]
  );

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.tabs, "mb-10")} ref={tabsRef}>
        {tabs}
      </div>
      <div className={classNames(styles.list, "custom-scroll")} onScroll={handleScroll}>
        {burgerIngredientsCategory}
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(INGREDIENT_PROP_TYPES)).isRequired,
};

export default BurgerIngredients;
