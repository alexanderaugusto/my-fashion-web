import api from "../../services/api"
import { getUserInfo } from "../actions/userAction"

export const insertItem = (product_id) => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token")))
    return null

  const data = {
    product_id,
    quantity: 1
  }

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    }
  }

  await api.request.post(api.routes.ROUTE_CART_INSERT, data, config)
    .then((response) => {
      dispatch(getUserInfo())
    })
    .catch((error) => {
      console.log(error)
    })
}

export const updateCartInfo = (product_id, quantity) => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token")))
    return null

  const data = { product_id, quantity }

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    }
  }

  await api.request.put(api.routes.ROUTE_CART_UPDATE_INFO, data, config)
    .then((response) => {
      // dispatch(getUserInfo())
    })
    .catch((error) => {
      console.log(error)
    })
}

export const removeCartItem = (product_id) => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token")))
    return null

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    },
    data: { product_id }
  }

  await api.request.delete(api.routes.ROUTE_CART_DELETE_PRODUCT, config)
    .then((response) => {
      dispatch(getUserInfo())
    })
    .catch((error) => {
      console.log(error)
    })
}