import api from "../../services/api"
import { getUser } from "../actions/userAction"

export const insertCartItem = (product_id, history) => async dispatch => {
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

  dispatch({ type: "START_LOADING" })
  await api.request.post(api.routes.ROUTE_CART_INSERT, config, data, (cod, message, payload) => {
    if (cod === 200) {
      dispatch(getUser())

      if (history)
        history.push("/cart")
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const updateCartItem = (product_id, quantity) => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token")))
    return null

  const data = { product_id, quantity }

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.put(api.routes.ROUTE_CART_UPDATE_INFO, config, data, (cod, message, payload) => {
    if (cod === 200) {
      dispatch({
        type: "SET_QUANTITY",
        payload: { product_id, quantity }
      })
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const deleteCartItem = (product_id) => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token")))
    return null

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    },
    data: { product_id }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.delete(api.routes.ROUTE_CART_DELETE_PRODUCT, config, null, (cod, message, payload) => {
    if (cod === 200) {
      dispatch(getUser())
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}