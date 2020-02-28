import api from "../../services/api"

export const getUser = () => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token"))) {
    return null
  }

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.get(api.routes.ROUTE_USER_LIST, config, null, (cod, message, payload) => {
    if (cod === 200) {
      dispatch({
        type: "GET_USER_INFO",
        payload
      })
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const updateUser = (data, onSubmit) => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token")))
    return null

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.put(api.routes.ROUTE_USER_UPDATE, config, data, (cod, message, payload) => {
    if (cod === 200) {
      dispatch(getUser())
      onSubmit()
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const login = (data, redirect, history) => async dispatch => {
  dispatch({ type: "START_LOADING" })
  await api.request.post(api.routes.ROUTE_LOGIN, null, data, (cod, message, payload) => {
    if (cod === 200) {
      console.log(payload)
      localStorage.setItem("user-token", JSON.stringify(payload.token))
      if (redirect)
        history.push(redirect)
      window.location.reload()
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const register = (data, redirect, history) => async dispatch => {
  dispatch({ type: "START_LOADING" })
  await api.request.post(api.routes.ROUTE_USER_INSERT, null, data, (cod, message, payload) => {
    if (cod === 200) {
      localStorage.setItem("user-token", JSON.stringify(payload.token))
      if (redirect)
        history.push(redirect)
      window.location.reload()
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const uploadImage = (image) => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token")))
    return null

  let formdata = new FormData()
  formdata.append("files", image)

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token")),
      'Content-Type': 'multipart/form-data'
    }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.post(api.routes.ROUTE_USER_UPLOAD_IMAGE, config, formdata, (cod, message, payload) => {
    if (cod === 200) {
      dispatch(getUser())
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}
