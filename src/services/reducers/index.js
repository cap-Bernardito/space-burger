import { combineReducers } from "redux";
import burgerIngredientsReducer from "../slices/burger-ingredients-slice";
import burgerConstructorReducer from "../slices/burger-constructor-slice";
import burgerIngredientDetailsReducer from "../slices/burger-ingredient-details-slice";
import orderDetailsReducer from "../slices/order-details-slice";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: burgerIngredientDetailsReducer,
  orderDetails: orderDetailsReducer,
});
