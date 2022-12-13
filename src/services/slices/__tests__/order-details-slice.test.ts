import reducer, * as slice from "../order-details-slice";

describe("ORDER_DETAILS reducer", () => {
  const initialState: typeof slice.initialState = {
    number: null,
    loading: false,
    error: false,
  };

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
