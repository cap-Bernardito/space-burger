import { combineReducers } from "redux";
import burgerIngridientsReducer from "../slices/burger-ingredients-slice";

export const rootReducer = combineReducers({
  burgerIngridients: burgerIngridientsReducer,
});
