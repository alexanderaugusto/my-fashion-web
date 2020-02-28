import api from "../../services/api"
import { getUser } from "../actions/userAction"

export const createAddress = (data, onInsert) => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token")))
    return null

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.post(api.routes.ROUTE_ADDRESS_INSERT, config, data, (cod, message, payload) => {
    if (cod === 200) {
      dispatch(getUser())
      onInsert()
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const updateAddress = (data, onEdit) => async dispatch => {
  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.put(api.routes.ROUTE_ADDRESS_UPDATE, config, data, (cod, message, payload) => {
    if (cod === 200) {
      dispatch(getUser())
      onEdit()
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const deleteAddress = (id) => async dispatch => {
  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    },
    data: { id }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.delete(api.routes.ROUTE_ADDRESS_DELETE, config, null, (cod, message, payload) => {
    if (cod === 200) {
      dispatch(getUser())
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}
