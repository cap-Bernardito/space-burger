import classNames from "classnames";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectIngredient } from "services/slices/burger-ingredients-slice";

import styles from "./ingredient-details.module.scss";

const IngredientDetails = () => {
  const { id } = useParams();

  const [data, statusMessage] = useSelector(selectIngredient(id));

  if (!data) {
    return statusMessage;
  }

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

export default IngredientDetails;
