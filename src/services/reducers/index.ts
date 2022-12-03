import { combineReducers } from "redux";

import authReducer from "services/slices/auth-slice";
import burgerConstructorReducer from "services/slices/burger-constructor-slice";
import burgerIngredientsReducer from "services/slices/burger-ingredients-slice";
import orderDetailsReducer from "services/slices/order-details-slice";
import wsOrdersFeedPrivateReducer from "services/slices/ws-orders-feed-private-slice";
import wsOrdersFeedReducer from "services/slices/ws-orders-feed-slice";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  orderDetails: orderDetailsReducer,
  auth: authReducer,
  wsOrdersFeed: wsOrdersFeedReducer,
  wsOrdersFeedPrivate: wsOrdersFeedPrivateReducer,
});
