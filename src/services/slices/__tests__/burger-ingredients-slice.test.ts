import { data } from "utils/data";

import reducer, * as slice from "../burger-ingredients-slice";

describe("BURGER_INGREDIENTS reducer", () => {
  const initialState: typeof slice.initialState = {
    data: null,
    loading: false,
    error: false,
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "_" })).toEqual(initialState);
  });

  it("should handle request", () => {
    expect(reducer(undefined, slice.getBurgerIngredientsRequest)).toEqual({
      ...initialState,
      loading: true,
      error: false,
    });
  });

  it("should handle success", () => {
    expect(reducer(undefined, slice.getBurgerIngredientsSuccess(data))).toEqual({
      ...initialState,
      loading: false,
      data,
    });
  });

  it("should handle error", () => {
    expect(reducer(undefined, slice.getBurgerIngredientsError("Test error"))).toEqual({
      ...initialState,
      loading: false,
      error: "Test error",
    });
  });
});
