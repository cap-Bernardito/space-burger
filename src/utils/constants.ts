// NOTE: Map нужен для сохранения порядка свойств при обходе коллекции
export const TYPES_OF_INGREDIENTS: ReadonlyMap<TIngredientType, string> = new Map([
  ["bun", "Булки"],
  ["sauce", "Соусы"],
  ["main", "Начинки"],
]);

export const ADD_BUN_EMPTY_TEXT = "Добавьте булку";

export const ADD_INGREDIENTS_EMPTY_TEXT = "Добавьте ингридиенты";

export const WS_INVALID_TOKEN_MESSAGE = "invalid or missing token";

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
