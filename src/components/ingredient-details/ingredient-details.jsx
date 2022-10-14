import PropTypes from "prop-types";
import classNames from "classnames";
import { INGREDIENT_PROP_TYPES } from "../../utils/constants";
import styles from "./ingredient-details.module.scss";

const IngredientDetails = ({ data }) => {
  const { name, image, image_mobile, image_large, calories, proteins, fat, carbohydrates } = data;
  const nutrients = [
    {
      name: "Калории,ккал",
      value: calories,
    },
    {
      name: "Белки, г",
      value: proteins,
    },
    {
      name: "Жиры, г",
      value: fat,
    },
    {
      name: "Углеводы, г",
      value: carbohydrates,
    },
  ];

  return (
    <div className={classNames(styles.root)}>
      <img
        className={classNames("mb-4")}
        src={image}
        srcSet={`${image_mobile} 144w, ${image} 240w, ${image_large} 480w`}
        sizes="240px"
        alt={name}
        width="480"
        height="240"
      />
      <div className={classNames("text text_type_main-medium mb-8")}>{name}</div>
      <div className={classNames(styles.nutrients)}>
        {nutrients.map(({ name, value }) => (
          <div className={classNames(styles.nutrients__item, styles.nutrient, "text_color_inactive")} key={name}>
            <div className={classNames(styles.nutrient__title)}>{name}</div>
            <div className={classNames(styles.nutrient__value, "text text_type_digits-default")}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  data: PropTypes.shape(INGREDIENT_PROP_TYPES).isRequired,
};

export default IngredientDetails;
