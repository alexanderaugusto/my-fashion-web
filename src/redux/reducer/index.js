import { combineReducers } from "redux"

import appReducer from "./appReducer"
import productReducer from "./productReducer"
import checkoutReducer from "./checkoutReducer"
import userReducer from "./userReducer"
import orderReducer from "./orderReducer"

export default combineReducers({
  appReducer,
  productReducer,
  checkoutReducer,
  userReducer,
  orderReducer
})