import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useScreenTest } from "hooks";
import { TYPES_OF_INGREDIENTS } from "utils/constants";
import { splitIngredientsByTypes } from "utils/utils";

import BurgerIngredientsCategory from "components/burger-ingredients-category/burger-ingredients-category";

import styles from "./burger-ingredients.module.scss";

type Props = {
  data: TIngredient[];
};

type TCategoryDOMElements = Partial<Record<TIngredientType, HTMLElement>>;

const BurgerIngredients: React.FC<Props> = ({ data }) => {
  const isPortraitScreen = useScreenTest("(max-width: 1137px)");
  const [activeTabName, setActiveTab] = useState(() => {
    const [activeType] = [...TYPES_OF_INGREDIENTS.keys()];

    return activeType;
  });

  const dataByCategory = useMemo(() => splitIngredientsByTypes(data), [data]);

  const categoryDOMElements = useMemo<TCategoryDOMElements>(() => ({}), []);

  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollableRef.current) {
      return;
    }

    const root = scrollableRef.current;
    const rootHeight = root.getBoundingClientRect().bottom - root.getBoundingClientRect().top;
    const cssFlexGap = 40;

    const observer = new IntersectionObserver(
      function (entries) {
        const [result] = entries.map((entry) => (entry.isIntersecting ? entry.target : null)).filter(Boolean);

        if (result) {
          setActiveTab(result.getAttribute("id") as TIngredientType);
        }
      },
      {
        root: root,
        rootMargin: `0px 0px -${rootHeight - cssFlexGap}px 0px`,
        threshold: 0,
      }
    );

    for (const type of TYPES_OF_INGREDIENTS.keys()) {
      const element = document.getElementById(type);

      if (element) {
        categoryDOMElements[type] = element;
        observer.observe(element);
      }
    }

    return () => {
      Object.values(categoryDOMElements).forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [categoryDOMElements, isPortraitScreen]);

  const setCurrentTab = useCallback(
    (value: string) => {
      const tabName = value as TIngredientType;

      if (typeof categoryDOMElements[tabName] !== "undefined") {
        (categoryDOMElements[tabName] as HTMLElement).scrollIntoView({ behavior: "smooth" });
      }
    },
    [categoryDOMElements]
  );

  const ingredientTypes = dataByCategory.map(([category]) => category);

  const tabs = ingredientTypes.map((tabName) => (
    <Tab key={tabName} value={tabName} active={activeTabName === tabName} onClick={setCurrentTab}>
      {TYPES_OF_INGREDIENTS.get(tabName)}
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

export default BurgerIngredients;
