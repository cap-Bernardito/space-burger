import { data } from "utils/data";

import reducer, * as slice from "../burger-constructor-slice";

describe("BURGER_CONSTRUCTOR reducer", () => {
  const initialState: typeof slice.initialState = {
    buns: [],
    ingredients: [],
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle addBun", () => {
    const payloadData = { ...data[0] };

    expect(reducer(initialState, slice.addBunInBurgerConstructor(payloadData))).toEqual({
      ...initialState,
      buns: [
        { ...payloadData, name: `${payloadData.name} (верх)` },
        { ...payloadData, name: `${payloadData.name} (низ)` },
      ],
    });
  });

  it("should handle addIngredient", () => {
    const payloadData = { ...data[0] };
    const result = reducer(initialState, slice.addIngredientInBurgerConstructor(payloadData));

    expect(typeof result.ingredients[0].key).toEqual("string");
    expect(result).toEqual({
      ...initialState,
      ingredients: [{ ...payloadData, key: result.ingredients[0].key }],
    });
  });

  it("should handle removeIngredient", () => {
    const payloadData = { ...data[0], key: "target" };
    const result = reducer(
      {
        buns: [],
        ingredients: [
          { ...data[0], key: "target" },
          { ...data[0], key: "id_1" },
          { ...data[0], key: "id_2" },
        ],
      },
      slice.removeIngredientInBurgerConstructor(payloadData)
    );

    expect(result).toEqual({
      ...initialState,
      ingredients: [
        { ...data[0], key: "id_1" },
        { ...data[0], key: "id_2" },
      ],
    });
  });

  it("should handle setIngredients", () => {
    const payloadData = { ...data[0], key: "target" };
    const result = reducer(
      {
        buns: [],
        ingredients: [],
      },
      slice.setIngredientsInBurgerConstructor([payloadData])
    );

    expect(result).toEqual({
      ...initialState,
      ingredients: [payloadData],
    });
  });

  it("should handle resetStore", () => {
    const result = reducer(
      {
        buns: [
          { ...data[0], name: `${data[0].name} (верх)` },
          { ...data[0], name: `${data[0].name} (низ)` },
        ],
        ingredients: [
          { ...data[0], key: "target" },
          { ...data[0], key: "id_1" },
          { ...data[0], key: "id_2" },
        ],
      },
      slice.resetIngredientInBurgerConstructor()
    );

    expect(result).toEqual({
      buns: [],
      ingredients: [],
    });
  });
});
