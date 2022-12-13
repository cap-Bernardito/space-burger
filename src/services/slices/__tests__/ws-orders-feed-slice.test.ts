import reducer, * as slice from "../ws-orders-feed-slice";

describe("WS_ORDERS_FEED reducer", () => {
  const initialState: typeof slice.initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    wsConnected: false,
    error: false,
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle open", () => {
    expect(reducer({ ...initialState, wsConnected: false, error: "init error" }, slice.wsAllOnopen)).toEqual({
      ...initialState,
      wsConnected: true,
      error: false,
    });
  });

  it("should handle close", () => {
    expect(reducer({ ...initialState, wsConnected: true }, slice.wsAllOnclose())).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it("should handle success", () => {
    const feedOrder: TFeedOrder = {
      ingredients: ["id_1", "id_2"],
      _id: "_id",
      status: "done",
      name: "Order name",
      number: 1377,
      createdAt: "2022-12-13T15:50:21.895Z",
      updatedAt: "2022-12-13T15:50:21.895Z",
    };

    expect(
      reducer(
        initialState,
        slice.wsAllOnmessage({
          orders: [{ ...feedOrder }, { ...feedOrder }],
          total: 42,
          totalToday: 33,
        })
      )
    ).toEqual({
      ...initialState,
      orders: [{ ...feedOrder }, { ...feedOrder }],
      total: 42,
      totalToday: 33,
    });
  });

  it("should handle error", () => {
    expect(reducer({ ...initialState, wsConnected: true, error: false }, slice.wsAllOneror("Test error"))).toEqual({
      ...initialState,
      wsConnected: false,
      error: "Test error",
    });
  });
});
