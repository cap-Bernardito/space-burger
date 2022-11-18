import PropTypes from "prop-types";

// NOTE: Map нужен для сохранения порядка свойств при обходе коллекции
export const TYPES_OF_INGREDIENTS: ReadonlyMap<TIngredientType, string> = new Map([
  ["bun", "Булки"],
  ["sauce", "Соусы"],
  ["main", "Начинки"],
]);

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

export const PAGES_PROTYPES = {
  pageTitle: PropTypes.string,
};

export const ROUTES = {
  home: { path: "/", title: "Конструктор бургера" },
  login: { path: "/login", title: "Вход" },
  register: { path: "/register", title: "Регистрация" },
  forgotPassword: { path: "/forgot-password", title: "Восстановление пароля" },
  resetPassword: { path: "/reset-password", title: "Сброс пароля" },
  ingredient: { path: "/ingredients/:id", title: "Детали ингредиента" },
  profile: { path: "/profile", title: "Профиль" },
  profileOrders: { path: "/profile/orders", title: "История заказов" },
  profileOrder: { path: "/profile/orders/:id", title: "Информация о заказе" },
  notFound: { path: "*", title: "Страница не найдена" },
};

export enum EAuthStatus {
  pending = "pending",
  ok = "auth",
  no = "notAuth",
}

export const AUTH_STATUS = {
  pending: "pending",
  ok: "auth",
  no: "notAuth",
};
