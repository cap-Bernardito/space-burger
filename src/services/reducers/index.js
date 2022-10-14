import { combineReducers } from "redux";
import burgerIngredientsReducer from "../slices/burger-ingredients-slice";
import burgerConstructorReducer from "../slices/burger-constructor-slice";
import burgerIngredientDetailReducer from "../slices/burger-ingredient-detail-slice";
import orderDetailsReducer from "../slices/order-details-slice";

export const rootReducer = combineReducers({
  burgerIngridients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetail: burgerIngredientDetailReducer,
  orderDetails: orderDetailsReducer,
});
