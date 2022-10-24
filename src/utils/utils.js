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

  const defaultOptions = {
    position: "top-center",
    autoClose: 3000,
    theme: "colored",
  };

  toast[type](message, { ...defaultOptions, ...options });
};
