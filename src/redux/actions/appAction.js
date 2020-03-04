import api from "../../services/api"

export const getCategories = () => async dispatch => {
  dispatch({ type: "START_LOADING" })
  await api.request.get(api.routes.ROUTE_CATEGORY_GET_ALL, null, null, (cod, message, payload) => {
    if (cod === 200) {
      payload.map(category => category.background = "#" + ((1 << 24) * Math.random() | 0).toString(16))
      
      dispatch({
        type: "GET_CATEGORIES",
        payload
      })
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const getSubcategoires = () => async dispatch => {
  dispatch({ type: "START_LOADING" })
  await api.request.get(api.routes.ROUTE_SUBCATEGORY_GET_ALL, null, null, (cod, message, payload) => {
    if (cod === 200) {
      dispatch({
        type: "GET_SUBCATEGORIES",
        payload
      })
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const getBrands = (id) => async dispatch => {
  dispatch({ type: "START_LOADING" })
  await api.request.get(api.routes.ROUTE_BRAND_GET_ALL, null, null, (cod, message, payload) => {
    if (cod === 200) {
      dispatch({
        type: "GET_BRANDS",
        payload
      })
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}