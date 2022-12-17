import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import apiService from "services/api-service";
import { EAuthStatus } from "utils/constants";

import reducer, * as slice from "../auth-slice";

describe("AUTH reducer", () => {
  const initialState = slice.initialState;
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

describe("AUTH thunks", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    apiService._accessToken = null;
  });

  it("should successfully complete auth", async () => {
    // Arrange
    const userStub = { name: "Mary", email: "Mary@gmail.com" };

    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true, user: userStub }),
      ok: true,
    } as any);

    apiService._accessToken = "stub_token";

    const middllewares = [thunk];
    const mockStore = configureMockStore(middllewares);
    const expectedActions = [
      slice.setRequest(),
      slice.setSuccess({
        success: true,
        user: userStub,
      }),
      slice.setStatus(EAuthStatus.ok),
    ];
    const store = mockStore({
      user: null,
      loading: false,
      error: false,
      status: EAuthStatus.pending,
    });

    // Act
    await store.dispatch(slice.auth() as any);
    const evaluatedActions = store.getActions();

    // Assert
    expect(evaluatedActions).toEqual(expectedActions);
  });

  it("should unsuccessfully complete auth when accesstoken is not available", async () => {
    // Arrange
    const userStub = { name: "Mary", email: "Mary@gmail.com" };

    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true, user: userStub }),
      ok: true,
    } as any);

    const middllewares = [thunk];
    const mockStore = configureMockStore(middllewares);
    const expectedActions = [
      slice.setRequest(),
      slice.setError("Access token is not available"),
      slice.setStatus(EAuthStatus.no),
    ];
    const store = mockStore({
      user: null,
      loading: false,
      error: false,
      status: EAuthStatus.pending,
    });

    // Act
    await store.dispatch(slice.auth() as any);
    const evaluatedActions = store.getActions();

    // Assert
    expect(evaluatedActions).toEqual(expectedActions);
  });

  it("should unsuccessfully complete auth when fetch rejected", async () => {
    // Arrange
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: false, message: "Fetch error" }),
      ok: false,
      status: 500,
    } as any);

    apiService._accessToken = "stub_token";

    const middllewares = [thunk];
    const mockStore = configureMockStore(middllewares);
    const expectedActions = [slice.setRequest(), slice.setError("Fetch error"), slice.setStatus(EAuthStatus.no)];
    const store = mockStore({
      user: null,
      loading: false,
      error: false,
      status: EAuthStatus.pending,
    });

    // Act
    await store.dispatch(slice.auth() as any);
    const evaluatedActions = store.getActions();

    // Assert
    expect(evaluatedActions).toEqual(expectedActions);
  });

  it("should successfully complete login", async () => {
    // Arrange
    const userStub = { name: "Mary", email: "Mary@gmail.com", password: "password" };

    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true, user: userStub }),
      ok: true,
    } as any);

    const middllewares = [thunk];
    const mockStore = configureMockStore(middllewares);
    const expectedActions = [
      slice.setRequest(),
      slice.setSuccess({
        success: true,
        user: userStub,
      }),
      slice.setStatus(EAuthStatus.ok),
    ];
    const store = mockStore({
      user: null,
      loading: false,
      error: false,
      status: EAuthStatus.pending,
    });

    // Act
    await store.dispatch(slice.login(userStub) as any);

    // Assert
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should unsuccessfully complete login when fetch rejected", async () => {
    // Arrange
    const userStub = { email: "Mary@gmail.com", password: "password" };

    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: false, message: "Fetch error" }),
      ok: false,
      status: 500,
    } as any);

    const middllewares = [thunk];
    const mockStore = configureMockStore(middllewares);
    const expectedActions = [slice.setRequest(), slice.setError("Fetch error")];
    const store = mockStore({
      user: null,
      loading: false,
      error: false,
      status: EAuthStatus.pending,
    });

    // Act
    await store.dispatch(slice.login(userStub) as any);

    // Assert
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should successfully complete logout", async () => {
    // Arrange
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true }),
      ok: true,
    } as any);

    const middllewares = [thunk];
    const mockStore = configureMockStore(middllewares);
    const expectedActions = [slice.setRequest(), slice.setSuccess({ user: null }), slice.setStatus(EAuthStatus.no)];
    const store = mockStore({
      user: null,
      loading: false,
      error: false,
      status: EAuthStatus.pending,
    });

    // Act
    await store.dispatch(slice.logout() as any);

    // Assert
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should unsuccessfully complete logout when fetch rejected", async () => {
    // Arrange
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: false, message: "Fetch error" }),
      ok: false,
      status: 500,
    } as any);

    const middllewares = [thunk];
    const mockStore = configureMockStore(middllewares);
    const expectedActions = [slice.setRequest(), slice.setError("Fetch error"), slice.setStatus(EAuthStatus.no)];
    const store = mockStore({
      user: null,
      loading: false,
      error: false,
      status: EAuthStatus.pending,
    });

    // Act
    await store.dispatch(slice.logout() as any);

    // Assert
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should successfully complete register", async () => {
    // Arrange
    const userStub = { name: "Mary", email: "Mary@gmail.com", password: "password" };

    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true, user: userStub }),
      ok: true,
    } as any);

    const middllewares = [thunk];
    const mockStore = configureMockStore(middllewares);
    const expectedActions = [
      slice.setRequest(),
      slice.setSuccess({
        success: true,
        user: userStub,
      }),
      slice.setStatus(EAuthStatus.ok),
    ];
    const store = mockStore({
      user: null,
      loading: false,
      error: false,
      status: EAuthStatus.pending,
    });

    // Act
    await store.dispatch(slice.register(userStub) as any);

    // Assert
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should unsuccessfully complete register when fetch rejected", async () => {
    // Arrange
    const userStub = { name: "Mary", email: "Mary@gmail.com", password: "password" };

    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: false, message: "Fetch error" }),
      ok: false,
      status: 500,
    } as any);

    const middllewares = [thunk];
    const mockStore = configureMockStore(middllewares);
    const expectedActions = [slice.setRequest(), slice.setError("Fetch error")];
    const store = mockStore({
      user: null,
      loading: false,
      error: false,
      status: EAuthStatus.pending,
    });

    // Act
    await store.dispatch(slice.register(userStub) as any);

    // Assert
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should successfully complete update", async () => {
    // Arrange
    const userStub = { name: "Mary", email: "Mary@gmail.com", password: "password" };

    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true, user: userStub }),
      ok: true,
    } as any);

    apiService._accessToken = "stub_token";

    const middllewares = [thunk];
    const mockStore = configureMockStore(middllewares);
    const expectedActions = [
      slice.setRequest(),
      slice.setSuccess({
        success: true,
        user: userStub,
      }),
    ];
    const store = mockStore({
      user: null,
      loading: false,
      error: false,
      status: EAuthStatus.pending,
    });

    // Act
    await store.dispatch(slice.updateUser(userStub) as any);

    // Assert
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should unsuccessfully complete update when fetch rejected", async () => {
    // Arrange
    const userStub = { name: "Mary", email: "Mary@gmail.com", password: "password" };

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
      user: null,
      loading: false,
      error: false,
      status: EAuthStatus.pending,
    });

    // Act
    await store.dispatch(slice.updateUser(userStub) as any);

    // Assert
    expect(store.getActions()).toEqual(expectedActions);
  });
});
