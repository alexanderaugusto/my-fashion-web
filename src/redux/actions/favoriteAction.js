import api from "../../services/api"
import { getUserInfo } from "../actions/userAction"

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

  await api.request.post(api.routes.ROUTE_FAVORITE_INSERT, data, config)
    .then((response) => {
      dispatch(getUserInfo())
    })
    .catch((error) => {
      console.log(error)
    })
}

export const removeFavoriteItem = (product_id) => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token")))
    return null

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    },
    data: { product_id }
  }

  await api.request.delete(api.routes.ROUTE_FAVORITE_DELETE_PRODUCT, config)
    .then((response) => {
      dispatch(getUserInfo())
    })
    .catch((error) => {
      console.log(error)
    })
}