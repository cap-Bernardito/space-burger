import { toast } from "react-toastify";

import { TYPES_OF_INGREDIENTS } from "./constants";

export const splitIngredientsByTypes = (data) => {
  const initial = {};

  for (const type of Object.keys(TYPES_OF_INGREDIENTS)) {
    initial[type] = [];
  }

  const result = data.reduce((acc, item) => {
    const { type } = item;

    if (typeof acc[type] === "undefined") {
      acc[type] = [];
    }

    acc[type].push(item);

    return acc;
  }, initial);

  return Object.entries(result);
};

export const notify = (message, options = {}, type = "error") => {
  if (!message) {
    return;
  }

  const toastType = typeof options === "string" ? options : type;

  const defaultOptions = {
    position: "top-center",
    autoClose: 3000,
    theme: "colored",
  };

  toast[toastType](message, { ...defaultOptions, ...options });
};

export const isErrorVisibility = (error) => {
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

export const setDocumentTitle = (title) => {
  const prevTitle = document.title;
  document.title = `${title} | Space Burger`;

  return () => {
    document.title = prevTitle;
  };
};
