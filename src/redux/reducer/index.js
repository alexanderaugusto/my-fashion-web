import { combineReducers } from "redux"

import cartReducer from "./cartReducer"
import productReducer from "./productReducer"
import checkoutReducer from "./checkoutReducer"
import cardReducer from "./cardReducer"
import addressReducer from "./addressReducer"
import userReducer from "./userReducer"
import orderReducer from "./orderReducer"

export default combineReducers({
  cartReducer,
  productReducer,
  checkoutReducer,
  cardReducer,
  addressReducer,
  userReducer,
  orderReducer
})