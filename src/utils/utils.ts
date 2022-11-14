import { toast, ToastContent, ToastOptions, TypeOptions } from "react-toastify";

import { TIngredient, TIngredientType } from "../../declarations";

import { TYPES_OF_INGREDIENTS } from "./constants";

export const splitIngredientsByTypes = (data: TIngredient[]) => {
  type TIngredientsByTypes = {
    [K in TIngredientType]?: TIngredient[];
  };

  const initial: TIngredientsByTypes = {};

  for (const type of TYPES_OF_INGREDIENTS.keys()) {
    initial[type] = [];
  }

  const result = data.reduce((acc, item) => {
    const { type } = item;

    if (typeof acc[type] === "undefined") {
      acc[type] = [];
    }

    (acc[type] as TIngredient[]).push(item);

    return acc;
  }, initial);

  return Object.entries(result);
};

export const notify = (
  message: ToastContent,
  options: ToastOptions = {},
  toastType: Exclude<TypeOptions, "default"> = "error"
) => {
  if (!message) {
    return;
  }

  const defaultOptions: ToastOptions = {
    position: "top-center",
    autoClose: 3000,
    theme: "colored",
  };

  toast[toastType](message, { ...defaultOptions, ...options });
};

export const isErrorVisibility = (error: string) => {
  if (!error) {
    return false;
  }

  // NOTE: пользователю эти ошибки показывать не надо
  const ignoredErrors = ["Access token is not available", "Incorrect reset token", "Token is invalid"];

  if (ignoredErrors.includes(error)) {
    return false;
  }

  return true;
};

export const setDocumentTitle = (title: string) => {
  const prevTitle = document.title;
  document.title = `${title} | Space Burger`;

  return () => {
    document.title = prevTitle;
  };
};
