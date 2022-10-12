import { v4 as uuidv4 } from "uuid";

export const initialState = { buns: [], ingridients: [], total: 0 };

const burgerConstructorReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_BUN": {
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
    case "ADD_INGRIDIENT": {
      const newState = { ...state, ingridients: [...state.ingridients, { ...payload, key: uuidv4() }] };

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
