import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import apiService from "services/api-service";

import { resetIngredientInBurgerConstructor } from "../burger-constructor-slice";
import reducer, * as slice from "../order-details-slice";

describe("ORDER_DETAILS reducer", () => {
  const initialState = slice.initialState;

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle request", () => {
    expect(reducer({ ...initialState, loading: false, error: "init error" }, slice.setRequest)).toEqual({
      ...initialState,
      loading: true,
      error: false,
    });
  });

  it("should handle success", () => {
    expect(reducer({ ...initialState, loading: true, number: null }, slice.setSuccess(42))).toEqual({
      ...initialState,
      loading: false,
      number: 42,
    });
  });

  it("should handle remove", () => {
    expect(
      reducer(
        {
          ...initialState,
          number: 42,
        },
        slice.removeOrderDetails()
      )
    ).toEqual({
      ...initialState,
      number: null,
    });
  });

  it("should handle error", () => {
    expect(reducer({ ...initialState, number: 42, loading: true, error: false }, slice.setError("Test error"))).toEqual(
      {
        ...initialState,
        number: null,
        loading: false,
        error: "Test error",
      }
    );
  });
});

describe("ORDER_DETAILS thunks", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    apiService._accessToken = null;
  });

  it("should successfully complete createOrder", async () => {
    // Arrange
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        success: true,
        order: {
          number: 42,
        },
      }),
      ok: true,
    } as any);

    apiService._accessToken = "stub_token";

    const middllewares = [thunk];
    const mockStore = configureMockStore(middllewares);
    const expectedActions = [slice.setRequest(), slice.setSuccess(42), resetIngredientInBurgerConstructor()];
    const store = mockStore({
      data: null,
      loading: false,
      error: false,
    });

    // Act
    await store.dispatch(slice.createOrder(["id_1", "id_2"]) as any);
    const evaluatedActions = store.getActions();

    // Assert
    expect(evaluatedActions).toEqual(expectedActions);
  });

  it("should unsuccessfully complete createOrder when fetch rejected", async () => {
    // Arrange
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: false, message: "Fetch error" }),
      ok: false,
      status: 500,
    } as any);

    apiService._accessToken = "stub_token";

    const middllewares = [thunk];
    const mockStore = configureMockStore(middllewares);
    const expectedActions = [slice.setRequest(), slice.setError("Fetch error")];
    const store = mockStore({
      data: null,
      loading: false,
      error: false,
    });

    // Act
    await store.dispatch(slice.createOrder(["id_1", "id_2"]) as any);
    const evaluatedActions = store.getActions();

    // Assert
    expect(evaluatedActions).toEqual(expectedActions);
  });
});
