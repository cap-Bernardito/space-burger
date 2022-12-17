import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { data } from "utils/data";

import reducer, * as slice from "../burger-ingredients-slice";

describe("BURGER_INGREDIENTS reducer", () => {
  const initialState = slice.initialState;

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle request", () => {
    expect(
      reducer({ ...initialState, loading: false, error: "init error" }, slice.getBurgerIngredientsRequest)
    ).toEqual({
      ...initialState,
      loading: true,
      error: false,
    });
  });

  it("should handle success", () => {
    expect(reducer({ ...initialState, loading: true }, slice.getBurgerIngredientsSuccess(data))).toEqual({
      ...initialState,
      loading: false,
      data,
    });
  });

  it("should handle error", () => {
    expect(
      reducer({ ...initialState, loading: true, error: false }, slice.getBurgerIngredientsError("Test error"))
    ).toEqual({
      ...initialState,
      loading: false,
      error: "Test error",
    });
  });
});

describe("BURGER_INGREDIENTS thunks", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should successfully complete getBurgerIngredients", async () => {
    // Arrange
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true, data }),
      ok: true,
    } as any);

    const middllewares = [thunk];
    const mockStore = configureMockStore(middllewares);
    const expectedActions = [slice.getBurgerIngredientsRequest(), slice.getBurgerIngredientsSuccess(data)];
    const store = mockStore({
      data: null,
      loading: false,
      error: false,
    });

    // Act
    await store.dispatch(slice.getBurgerIngredients() as any);
    const evaluatedActions = store.getActions();

    // Assert
    expect(evaluatedActions).toEqual(expectedActions);
  });

  it("should unsuccessfully complete getBurgerIngredients when fetch rejected", async () => {
    // Arrange
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: false, message: "Fetch error" }),
      ok: false,
      status: 500,
    } as any);

    const middllewares = [thunk];
    const mockStore = configureMockStore(middllewares);
    const expectedActions = [slice.getBurgerIngredientsRequest(), slice.getBurgerIngredientsError("Fetch error")];
    const store = mockStore({
      data: null,
      loading: false,
      error: false,
    });

    // Act
    await store.dispatch(slice.getBurgerIngredients() as any);
    const evaluatedActions = store.getActions();

    // Assert
    expect(evaluatedActions).toEqual(expectedActions);
  });
});
