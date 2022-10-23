import classNames from "classnames";
import PropTypes from "prop-types";

import { INGREDIENT_PROP_TYPES } from "../../utils/constants";
import { TYPES_OF_INGREDIENTS } from "../../utils/constants";

import BurgerIngredient from "../burger-ingredient/burger-ingredient";

import styles from "./burger-ingredients-category.module.scss";

const BurgerIngredientsCategory = ({ type, list }) => (
  <>
    <h2 className={classNames("text text_type_main-medium mb-6")}>{TYPES_OF_INGREDIENTS[type]}</h2>
    <div className={classNames(styles.list, "pr-3")}>
      {list.map((ingredient) => {
        return (
          <div className={classNames("mb-2")} key={ingredient._id}>
            <BurgerIngredient data={ingredient} />
          </div>
        );
      })}
    </div>
  </>
);

BurgerIngredientsCategory.propTypes = {
  type: PropTypes.oneOf(Object.keys(TYPES_OF_INGREDIENTS)).isRequired,
  list: PropTypes.arrayOf(PropTypes.shape(INGREDIENT_PROP_TYPES)).isRequired,
};

export default BurgerIngredientsCategory;
