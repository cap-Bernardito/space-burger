import classNames from "classnames";

import { useAppSelector } from "hooks";
import { selectCounters } from "services/slices/burger-constructor-slice";
import { TYPES_OF_INGREDIENTS } from "utils/constants";

import BurgerIngredient from "components/burger-ingredient/burger-ingredient";

import styles from "./burger-ingredients-category.module.scss";

type Props = {
  type: TIngredientType;
  list: TIngredient[];
};

const BurgerIngredientsCategory: React.FC<Props> = ({ type, list }) => {
  const counters = useAppSelector(selectCounters);

  return (
    <>
      <h2 className={classNames("text text_type_main-medium mb-6")}>{TYPES_OF_INGREDIENTS.get(type)}</h2>
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

export default BurgerIngredientsCategory;
