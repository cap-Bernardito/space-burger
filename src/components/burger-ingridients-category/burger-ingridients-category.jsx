import PropTypes from "prop-types";
import classNames from "classnames";
import { INGRIDIENT_PROP_TYPES } from "../../utils/constants";
import BurgerIngridient from "../burger-ingridient/burger-ingridient";
import { TYPES_OF_INGRIDIENTS } from "../../utils/constants";
import styles from "./burger-ingridients-category.module.scss";

const BurgerIngridientsCategory = ({ type, list }) => (
  <>
    <h2 className={classNames("text text_type_main-medium mb-6")}>{TYPES_OF_INGRIDIENTS[type]}</h2>
    <div className={classNames(styles.list, "pr-3")}>
      {list.map((ingridient) => {
        return (
          <div className={classNames("mb-2")} key={ingridient._id}>
            <BurgerIngridient data={ingridient} />
          </div>
        );
      })}
    </div>
  </>
);

BurgerIngridientsCategory.propTypes = {
  type: PropTypes.oneOf(Object.keys(TYPES_OF_INGRIDIENTS)).isRequired,
  list: PropTypes.arrayOf(PropTypes.shape(INGRIDIENT_PROP_TYPES)).isRequired,
};

export default BurgerIngridientsCategory;
