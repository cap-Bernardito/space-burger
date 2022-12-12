import reducer, * as slice from "../order-details-slice";

describe("ORDER_DETAILS reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "_" })).toEqual(slice.initialState);
  });

  it("should handle request", () => {
    expect(reducer(undefined, slice.setRequest)).toEqual({
      ...slice.initialState,
      loading: true,
      error: false,
    });
  });

  it("should handle success", () => {
    expect(reducer(undefined, slice.setSuccess(42))).toEqual({
      ...slice.initialState,
      loading: false,
      number: 42,
    });
  });

  it("should handle remove", () => {
    const initialState = {
      ...slice.initialState,
      number: 42,
    };

    expect(reducer(initialState, slice.removeOrderDetails())).toEqual({
      ...slice.initialState,
      number: null,
    });
  });

  it("should handle error", () => {
    expect(reducer(undefined, slice.setError("Test error"))).toEqual({
      ...slice.initialState,
      number: null,
      loading: false,
      error: "Test error",
    });
  });
});
