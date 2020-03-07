import api from "../../services/api"

export const getAllProducts = () => async dispatch => {
  dispatch({ type: "START_LOADING" })
  await api.request.get(api.routes.ROUTE_PRODUCT_LIST_ALL, null, null, (cod, message, payload) => {
    if (cod === 200) {
      dispatch({
        type: "GET_ALL_PRODUCTS",
        payload
      })
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const getProduct = (id) => async dispatch => {
  const config = {
    params: { id }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.get(api.routes.ROUTE_PRODUCT_LIST, config, null, (cod, message, payload) => {
    if (cod === 200) {
      dispatch({
        type: "GET_PRODUCT",
        payload
      })
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const getProductOffers = (product_category, product_id) => async dispatch => {
  const config = {
    params: { product_category, product_id }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.get(api.routes.ROUTE_PRODUCT_LIST_OFFERS, config, null, (cod, message, payload) => {
    if (cod === 200) {
      dispatch({
        type: "GET_PRODUCT_OFFERS",
        payload
      })
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const filterProducts = (string) => async dispatch => {
  const config = {
    params: { string }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.get(api.routes.ROUTE_PRODUCT_SEARCH, config, null, (cod, message, payload) => {
    if (cod === 200) {
      dispatch({
        type: "FILTER_PRODUCTS",
        payload,
        text: string
      })
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const freightCalculator = (cep_dest, product, callback) => async dispatch => {
  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    }
  }

  const data = {
    cep_dest,
    product
  }

  dispatch({ type: "START_LOADING" })
  await api.request.post(api.routes.ROUTE_FRETE_CALCULATOR, config, data, (cod, message, data) => {
    if (cod === 200) {
      if (callback)
        callback(data)
      else {
        dispatch({
          type: "SET_FREIGHT",
          payload: { product, data }
        })
      }
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}