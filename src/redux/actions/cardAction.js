import api from "../../services/api"
import { getUserInfo } from "../actions/userAction"

export const insertCard = (data, onInsert) => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token")))
    return null

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    }
  }

  await api.request.post(api.routes.ROUTE_CARD_INSERT, data, config)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserInfo())
        onInsert()
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

export const updateCard = (data, onEdit) => async dispatch => {
  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    }
  }

  await api.request.put(api.routes.ROUTE_CARD_UPDATE, data, config)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserInfo())
        onEdit()
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

export const removeCard = (id) => async dispatch => {
  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    },
    data: { id }
  }

  await api.request.delete(api.routes.ROUTE_CARD_DELETE, config)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserInfo())
      }

    })
    .catch((error) => {
      console.log(error)
    })
}
