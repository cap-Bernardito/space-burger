import reducer, * as slice from "../ws-orders-feed-private-slice";

describe("WS_ORDERS_FEED_PRIVATE reducer", () => {
  const initialState = slice.initialState;
  const feedOrderStub: TFeedOrder = {
    ingredients: ["id_1", "id_2"],
    _id: "_id",
    status: "done",
    name: "Order name",
    number: 1377,
    createdAt: "2022-12-13T15:50:21.895Z",
    updatedAt: "2022-12-13T15:50:21.895Z",
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle open", () => {
    expect(reducer({ ...initialState, wsConnected: false, error: "init error" }, slice.wsPrivateOnopen)).toEqual({
      ...initialState,
      wsConnected: true,
      error: false,
    });
  });

  it("should handle close", () => {
    expect(
      reducer(
        { ...initialState, orders: [feedOrderStub], wsConnected: true, total: 1377, totalToday: 42 },
        slice.wsPrivateOnclose()
      )
    ).toEqual({
      ...initialState,
      wsConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
    });
  });

  it("should handle success", () => {
    expect(
      reducer(
        initialState,
        slice.wsPrivateOnmessage({
          orders: [{ ...feedOrderStub }, { ...feedOrderStub }],
          total: 42,
          totalToday: 33,
        })
      )
    ).toEqual({
      ...initialState,
      orders: [{ ...feedOrderStub }, { ...feedOrderStub }],
      total: 42,
      totalToday: 33,
    });
  });

  it("should handle error", () => {
    expect(reducer({ ...initialState, wsConnected: true, error: false }, slice.wsPrivateOnerror("Test error"))).toEqual(
      {
        ...initialState,
        wsConnected: false,
        error: "Test error",
      }
    );
  });
});
