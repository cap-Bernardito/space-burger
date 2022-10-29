import { combineReducers } from "redux";

import authReducer from "services/slices/auth-slice";
import burgerConstructorReducer from "services/slices/burger-constructor-slice";
import burgerIngredientDetailsReducer from "services/slices/burger-ingredient-details-slice";
import burgerIngredientsReducer from "services/slices/burger-ingredients-slice";
import orderDetailsReducer from "services/slices/order-details-slice";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: burgerIngredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  auth: authReducer,
});
