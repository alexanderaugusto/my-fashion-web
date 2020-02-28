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

export const getProductsByCategory = (product_category) => async dispatch => {
  const config = {
    params: { product_category }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.get(api.routes.ROUTE_PRODUCT_LIST_BY_CATEGORY, config, null, (cod, message, payload) => {
    if (cod === 200) {
      dispatch({
        type: "GET_PRODUCT_BY_CATEGORY",
        payload: payload
      })
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const searchProducts = (string) => async dispatch => {
  const config = {
    params: { string }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.get(api.routes.ROUTE_PRODUCT_SEARCH, config, null, (cod, message, payload) => {
    if (cod === 200) {
      dispatch({
        type: "SEARCH_PRODUCTS",
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
  await api.request.post(api.routes.ROUTE_FRETE_CALCULATOR, config, data, (cod, message, payload) => {
    if (cod === 200) {
      if (callback)
        callback(payload)
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}