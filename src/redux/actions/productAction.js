import api from "../../services/api"

export const getAllProducts = () => async dispatch => {
  await api.request.get(api.routes.ROUTE_PRODUCT_LIST_ALL)
    .then((response) => {
      dispatch({
        type: "GET_ALL_PRODUCTS",
        payload: response.data
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

export const getProductInfo = (id) => async dispatch => {
  const config = {
    params: { id }
  }

  await api.request.get(api.routes.ROUTE_PRODUCT_LIST, config)
    .then((response) => {
      dispatch({
        type: "GET_PRODUCT_INFO",
        payload: response.data
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

export const getProductOffers = (product_category, product_id) => async dispatch => {
  const config = {
    params: { product_category, product_id }
  }

  await api.request.get(api.routes.ROUTE_PRODUCT_LIST_OFFERS, config)
    .then((response) => {
      dispatch({
        type: "GET_PRODUCT_OFFERS",
        payload: response.data
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

export const getProductsByCategory = (product_category) => async dispatch => {
  const config = {
    params: { product_category }
  }

  await api.request.get(api.routes.ROUTE_PRODUCT_LIST_BY_CATEGORY, config)
    .then((response) => {
      dispatch({
        type: "GET_PRODUCT_BY_CATEGORY",
        payload: response.data
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

export const searchProducts = (string) => async dispatch => {
  const config = {
    params: { string }
  }

  await api.request.get(api.routes.ROUTE_PRODUCT_SEARCH, config)
    .then((response) => {
      dispatch({
        type: "SEARCH_PRODUCTS",
        payload: response.data,
        text: string
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

export const freightCalculator = (cep_dest, product, callback) => async dispatch => {
  const data = {
    cep_dest,
    product
  }

  await api.request.post(api.routes.ROUTE_FRETE_CALCULATOR, data)
    .then((response) => {
      if (callback)
        callback(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}