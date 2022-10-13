import { combineReducers } from "redux";
import burgerIngredientsReducer from "../slices/burger-ingredients-slice";
import burgerConstructorReducer from "../slices/burger-constructor-slice";

export const rootReducer = combineReducers({
  burgerIngridients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
});
