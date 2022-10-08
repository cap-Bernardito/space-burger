export const initialState = { buns: [], ingridients: [], total: 0 };

const burgerConstructorReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_BUN": {
      const newState = {
        ...state,
        buns: [
          { ...payload, name: `${payload.name} (верх)` },
          { ...payload, name: `${payload.name} (низ)` },
        ],
      };

      newState.total = calculate(newState);

      return newState;
    }
    case "SET_INGRIDIENTS": {
      const newState = { ...state, ingridients: payload };

      newState.total = calculate(newState);

      return newState;
    }
    default:
      return state;
  }
};

function calculate(state) {
  return [...state.buns, ...state.ingridients].reduce((acc, { price }) => (acc += price), 0);
}

export default burgerConstructorReducer;
