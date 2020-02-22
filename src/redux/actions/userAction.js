import api from "../../services/api"

export const getUserInfo = () => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token"))) {
    return null
  }

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    }
  }

  await api.request.get(api.routes.ROUTE_USER_LIST, config)
    .then((response) => {
      dispatch({
        type: "GET_USER_INFO",
        payload: response.data
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

export const updateUserInfo = (data, onSubmit) => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token")))
    return null

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    }
  }

  await api.request.put(api.routes.ROUTE_USER_UPDATE, data, config)
    .then((response) => {
      dispatch(getUserInfo())
      onSubmit()
    })
    .catch((error) => {
      console.log(error)
    })
}

export const login = (data, redirect, history) => async dispatch => {
  await api.request.post(api.routes.ROUTE_LOGIN, data)
    .then((response) => {
      localStorage.setItem("user-token", JSON.stringify(response.data.token))
      if (redirect)
        history.push(redirect)
      window.location.reload()
    })
    .catch((error) => {
      console.log(error)
    })
}

export const register = (data, redirect, history) => async dispatch => {
  await api.request.post(api.routes.ROUTE_USER_INSERT, data)
    .then((response) => {
      localStorage.setItem("user-token", JSON.stringify(response.data.token))
      if (redirect)
        history.push(redirect)
      window.location.reload()
    })
    .catch((error) => {
      console.log(error)
    })
}

export const uploadImage = (image) => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token")))
    return null

  let formdata = new FormData()
  formdata.append("file", image)

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token")),
      'Content-Type': 'multipart/form-data'
    }
  }

  await api.request.post(api.routes.ROUTE_USER_UPLOAD_IMAGE, formdata, config)
    .then((response) => {
      dispatch(getUserInfo())
    })
    .catch((error) => {
      console.log(error)
    })
}
