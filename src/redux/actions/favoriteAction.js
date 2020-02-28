import api from "../../services/api"
import { getUser } from "../actions/userAction"

export const insertFavoriteItem = (product_id) => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token")))
    return null

  const data = {
    product_id
  }

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.post(api.routes.ROUTE_FAVORITE_INSERT, config, data, (cod, message, payload) => {
    if (cod === 200) {
      dispatch(getUser())
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const deleteFavoriteItem = (product_id) => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token")))
    return null

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    },
    data: { product_id }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.delete(api.routes.ROUTE_FAVORITE_DELETE_PRODUCT, config, null, (cod, message, payload) => {
    if (cod === 200) {
      dispatch(getUser())
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}