import { EAuthStatus } from "utils/constants";

import reducer, * as slice from "../auth-slice";

describe("AUTH reducer", () => {
  const initialState: typeof slice.initialState = {
    user: null,
    loading: false,
    error: false,
    status: EAuthStatus.pending,
  };
  const userStub = { name: "Mary", email: "Mary@gmail.com" };

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
    expect(reducer({ ...initialState, loading: true }, slice.setSuccess({ success: true, user: userStub }))).toEqual({
      ...initialState,
      loading: false,
      user: userStub,
    });
  });

  it("should handle status", () => {
    expect(
      reducer(
        {
          ...initialState,
          status: EAuthStatus.pending,
        },
        slice.setStatus(EAuthStatus.ok)
      )
    ).toEqual({
      ...initialState,
      status: EAuthStatus.ok,
    });
  });

  it("should handle error", () => {
    expect(
      reducer({ ...initialState, user: userStub, loading: true, error: false }, slice.setError("Test error"))
    ).toEqual({
      ...initialState,
      user: null,
      loading: false,
      error: "Test error",
    });
  });
});
