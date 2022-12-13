import { data } from "utils/data";

import reducer, * as slice from "../burger-constructor-slice";

describe("BURGER_CONSTRUCTOR reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "_" })).toEqual(slice.initialState);
  });

  it("should handle addBun", () => {
    const payloadData = { ...data[0] };

    expect(reducer(undefined, slice.addBunInBurgerConstructor(payloadData))).toEqual({
      ...slice.initialState,
      buns: [
        { ...payloadData, name: `${payloadData.name} (верх)` },
        { ...payloadData, name: `${payloadData.name} (низ)` },
      ],
    });
  });

  it("should handle addIngredient", () => {
    const payloadData = { ...data[0] };
    const result = reducer(undefined, slice.addIngredientInBurgerConstructor(payloadData));

    expect(typeof result.ingredients[0].key).toEqual("string");
    expect(result).toEqual({
      ...slice.initialState,
      ingredients: [{ ...payloadData, key: result.ingredients[0].key }],
    });
  });

  it("should handle removeIngredient", () => {
    const payloadData = { ...data[0], key: "target" };
    const initialState: typeof slice.initialState = {
      buns: [],
      ingredients: [
        { ...data[0], key: "target" },
        { ...data[0], key: "id_1" },
        { ...data[0], key: "id_2" },
      ],
    };
    const result = reducer(initialState, slice.removeIngredientInBurgerConstructor(payloadData));

    expect(result).toEqual({
      ...slice.initialState,
      ingredients: [
        { ...data[0], key: "id_1" },
        { ...data[0], key: "id_2" },
      ],
    });
  });

  it("should handle setIngredients", () => {
    const payloadData = { ...data[0], key: "target" };
    const initialState: typeof slice.initialState = {
      buns: [],
      ingredients: [],
    };
    const result = reducer(initialState, slice.setIngredientsInBurgerConstructor([payloadData]));

    expect(result).toEqual({
      ...slice.initialState,
      ingredients: [payloadData],
    });
  });

  it("should handle resetStore", () => {
    const initialState: typeof slice.initialState = {
      buns: [
        { ...data[0], name: `${data[0].name} (верх)` },
        { ...data[0], name: `${data[0].name} (низ)` },
      ],
      ingredients: [
        { ...data[0], key: "target" },
        { ...data[0], key: "id_1" },
        { ...data[0], key: "id_2" },
      ],
    };
    const result = reducer(initialState, slice.resetIngredientInBurgerConstructor());

    expect(result).toEqual({
      buns: [],
      ingredients: [],
    });
  });
});
