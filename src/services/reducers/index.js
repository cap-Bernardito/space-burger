import { combineReducers } from "redux";
import burgerIngredientsReducer from "../slices/burger-ingredients-slice";
import burgerConstructorReducer from "../slices/burger-constructor-slice";
import burgerIngredientDetailReducer from "../slices/burger-ingredient-detail-slice";

export const rootReducer = combineReducers({
  burgerIngridients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetail: burgerIngredientDetailReducer,
});
