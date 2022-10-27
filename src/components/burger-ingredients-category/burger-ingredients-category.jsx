import classNames from "classnames";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import { INGREDIENT_PROP_TYPES } from "../../utils/constants";
import { TYPES_OF_INGREDIENTS } from "../../utils/constants";

import BurgerIngredient from "../burger-ingredient/burger-ingredient";

import styles from "./burger-ingredients-category.module.scss";

const BurgerIngredientsCategory = ({ type, list }) => {
  const { buns, ingredients } = useSelector((state) => state.burgerConstructor);
  const counters = {};

  [...buns, ...ingredients].forEach((ingredient) => {
    if (!counters[ingredient._id]) {
      counters[ingredient._id] = 0;
    }

    counters[ingredient._id] += 1;
  });

  return (
    <>
      <h2 className={classNames("text text_type_main-medium mb-6")}>{TYPES_OF_INGREDIENTS[type]}</h2>
      <div className={classNames(styles.list, "pr-3")}>
        {list.map((ingredient) => {
          return (
            <div className={classNames("mb-2")} key={ingredient._id}>
              <BurgerIngredient data={ingredient} count={counters[ingredient._id]} />
            </div>
          );
        })}
      </div>
    </>
  );
};

BurgerIngredientsCategory.propTypes = {
  type: PropTypes.oneOf(Object.keys(TYPES_OF_INGREDIENTS)).isRequired,
  list: PropTypes.arrayOf(PropTypes.shape(INGREDIENT_PROP_TYPES)).isRequired,
};

export default BurgerIngredientsCategory;
