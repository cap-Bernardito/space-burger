import { combineReducers } from "redux";

import burgerConstructorReducer from "../slices/burger-constructor-slice";
import burgerIngredientDetailsReducer from "../slices/burger-ingredient-details-slice";
import burgerIngredientsReducer from "../slices/burger-ingredients-slice";
import orderDetailsReducer from "../slices/order-details-slice";
import userGetReducer from "../slices/user-get-slice";
import userLoginReducer from "../slices/user-login-slice";
import userLogoutReducer from "../slices/user-logout-slice";
import userRegisterReducer from "../slices/user-register-slice";
import userResetPasswordReducer from "../slices/user-reset-password-slice";
import userUpdatePasswordReducer from "../slices/user-update-password-slice";
import userUpdateReducer from "../slices/user-update-slice";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: burgerIngredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  userLogin: userLoginReducer,
  userLogout: userLogoutReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  userResetPassword: userResetPasswordReducer,
  userUpdatePassword: userUpdatePasswordReducer,
  userGet: userGetReducer,
});
