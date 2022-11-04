import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import PropTypes from "prop-types";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { INGREDIENT_PROP_TYPES, TYPES_OF_INGREDIENTS } from "utils/constants";
import { splitIngredientsByTypes } from "utils/utils";

import BurgerIngredientsCategory from "components/burger-ingredients-category/burger-ingredients-category";

import styles from "./burger-ingredients.module.scss";

const BurgerIngredients = ({ data }) => {
  const [activeTabName, setActiveTab] = useState(() => {
    const [activeType] = Object.keys(TYPES_OF_INGREDIENTS);

    return activeType;
  });

  const dataByCategory = useMemo(() => splitIngredientsByTypes(data), [data]);

  const categoryDOMElements = useMemo(() => ({}), []);

  const scrollableRef = useRef();

  useEffect(() => {
    const root = scrollableRef.current;
    const rootHeight = root.getBoundingClientRect().bottom - root.getBoundingClientRect().top;
    const cssFlexGap = 40;

    const observerCallback = function (entries) {
      const [result] = entries.map((entry) => (entry.isIntersecting ? entry.target : null)).filter(Boolean);

      if (result) {
        setActiveTab(result.getAttribute("id"));
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: root,
      rootMargin: `0px 0px -${rootHeight - cssFlexGap}px 0px`,
      threshold: 0,
    });

    Object.keys(TYPES_OF_INGREDIENTS).forEach((type) => {
      const element = document.getElementById(type);
      categoryDOMElements[type] = element;

      observer.observe(element);
    });

    return () => {
      Object.values(categoryDOMElements).forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [categoryDOMElements]);

  const setCurrentTab = useCallback(
    (tabName) => {
      categoryDOMElements[tabName] && categoryDOMElements[tabName].scrollIntoView({ behavior: "smooth" });
    },
    [categoryDOMElements]
  );

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
      <div className={classNames(styles.tabs, "mb-10")}>{tabs}</div>
      <div className={classNames(styles.list, "custom-scroll")} ref={scrollableRef}>
        {burgerIngredientsCategory}
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(INGREDIENT_PROP_TYPES)).isRequired,
};

export default BurgerIngredients;
