import { EAuthStatus } from "utils/constants";

import reducer, * as slice from "../auth-slice";

describe("AUTH reducer", () => {
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
    expect(
      reducer(undefined, slice.setSuccess({ success: true, user: { name: "Mary", email: "Mary@gmail.com" } }))
    ).toEqual({
      ...slice.initialState,
      loading: false,
      user: { name: "Mary", email: "Mary@gmail.com" },
    });
  });

  it("should handle status", () => {
    const initialState: typeof slice.initialState = {
      ...slice.initialState,
      status: EAuthStatus.pending,
    };

    expect(reducer(initialState, slice.setStatus(EAuthStatus.ok))).toEqual({
      ...slice.initialState,
      status: EAuthStatus.ok,
    });
  });

  it("should handle error", () => {
    expect(reducer(undefined, slice.setError("Test error"))).toEqual({
      ...slice.initialState,
      user: null,
      loading: false,
      error: "Test error",
    });
  });
});
