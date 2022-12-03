import { toast, ToastContent, ToastOptions, TypeOptions } from "react-toastify";

import { TYPES_OF_INGREDIENTS } from "./constants";

export const splitIngredientsByTypes = (data: TIngredient[]) => {
  const initial: Partial<Record<TIngredientType, TIngredient[]>> = {};

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

  return Object.entries(result) as TIngredientsByTypes;
};

export const createIngredientsDict = (data: TIngredient[]) => {
  const result: Map<TIngredient["_id"], TIngredient> = new Map();

  for (const item of data) {
    result.set(item._id, item);
  }

  return result;
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

export const isErrorVisibility = (error: string | false): error is string => {
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

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Что-то пошло не так";
};

export const setDocumentTitle = (title: string) => {
  document.title = `${title} | Space Burger`;
};

export const blurFormFields = (form: HTMLFormElement) => {
  const validTypes = ["text", "password", "email"];
  const formElements = [...form.elements] as HTMLInputElement[];

  for (const field of formElements) {
    if (validTypes.includes(field.type)) {
      field.blur();
    }
  }
};

export const isSuccessResponseData = <T extends { success: boolean }, K extends { success: boolean }>(
  data: T | K
): data is T => {
  return "success" in data && data.success === true;
};

export const getLastOrderNumbers = (data: TFeed["orders"] = [], count: number) => {
  const resultDone: TFeedOrder["number"][] = Array(count);
  const resultPending: TFeedOrder["number"][] = Array(count);
  let i = 0;
  let d = 0;
  let p = 0;

  while (d < count) {
    if (typeof data[i] === "undefined") {
      break;
    }

    if (data[i].status === "done") {
      resultDone[d] = data[i].number;
      d++;
    }

    if (data[i].status === "pending" && p < count) {
      resultPending[p] = data[i].number;
      p++;
    }

    i++;
  }

  return {
    done: resultDone.filter(Boolean),
    pending: resultPending.filter(Boolean),
  };
};
