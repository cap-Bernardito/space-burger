import { combineReducers } from "redux";

import burgerConstructorReducer from "../slices/burger-constructor-slice";
import burgerIngredientDetailsReducer from "../slices/burger-ingredient-details-slice";
import burgerIngredientsReducer from "../slices/burger-ingredients-slice";
import orderDetailsReducer from "../slices/order-details-slice";
import userLoginReducer from "../slices/user-login-slice";
import userRegisterReducer from "../slices/user-register-slice";
import userResetReducer from "../slices/user-reset-slice";
import userUpdateReducer from "../slices/user-update-slice";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: burgerIngredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userReset: userResetReducer,
  userUpdate: userUpdateReducer,
});
