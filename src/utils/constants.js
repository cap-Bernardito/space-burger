import PropTypes from "prop-types";

export const TYPES_OF_INGREDIENTS = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};

export const ADD_BUN_EMPTY_TEXT = "Добавьте булку";

export const ADD_INGREDIENTS_EMPTY_TEXT = "Добавьте ингридиенты";

export const INGREDIENT_PROP_TYPES = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
};

export const routes = {
  login: "/login",
  profile: "/profile",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
};

export const authStatus = {
  pending: "pending",
  ok: "auth",
  no: "notAuth",
};

export const isErrorVisibility = (error) => {
  if (error === "Access token is not available") {
    return false;
  }

  return true;
};
