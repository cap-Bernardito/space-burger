import { combineReducers } from "redux";

import burgerConstructorReducer from "services/slices/burger-constructor-slice";
import burgerIngredientDetailsReducer from "services/slices/burger-ingredient-details-slice";
import burgerIngredientsReducer from "services/slices/burger-ingredients-slice";
import orderDetailsReducer from "services/slices/order-details-slice";
import userGetReducer from "services/slices/user-get-slice";
import userLoginReducer from "services/slices/user-login-slice";
import userLogoutReducer from "services/slices/user-logout-slice";
import userRegisterReducer from "services/slices/user-register-slice";
import userResetPasswordReducer from "services/slices/user-reset-password-slice";
import userUpdatePasswordReducer from "services/slices/user-update-password-slice";
import userUpdateReducer from "services/slices/user-update-slice";

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
