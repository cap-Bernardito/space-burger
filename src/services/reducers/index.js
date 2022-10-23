import { combineReducers } from "redux";

import burgerConstructorReducer from "../slices/burger-constructor-slice";
import burgerIngredientDetailsReducer from "../slices/burger-ingredient-details-slice";
import burgerIngredientsReducer from "../slices/burger-ingredients-slice";
import orderDetailsReducer from "../slices/order-details-slice";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: burgerIngredientDetailsReducer,
  orderDetails: orderDetailsReducer,
});
