import api from "../../services/api"
import { getUser } from "../actions/userAction"
import { dateToBrDate } from "../../constants/functions"

export const createOrder = (orderItems, history) => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token")))
    return null

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    }
  }

  const data = getData(orderItems)

  dispatch({ type: "START_LOADING" })
  await api.request.post(api.routes.ROUTE_ORDER_CREATE, config, data, (cod, message, payload) => {
    if (cod === 200) {
      dispatch(getUser())

      history.push({
        pathname: "/checkout/confirm/" + payload,
        state: data
      })
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const listStatus = () => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token")))
    return null

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.get(api.routes.ROUTE_ORDER_GET_STATUS, config, null, (cod, message, payload) => {
    if (cod === 200) {
      dispatch({
        type: "GET_STATUS",
        payload
      })
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

function getData(orderItems) {
  const { products, address, payment, card, total } = orderItems

  const newProducts = []
  products.filter(product => {
    product.status_id = 2
    const { id, cod, title, price, quantity, category_id, brand_id, company_id, images } = product
    const { quantity: buy_quantity, freight: buy_freight, praze: buy_term, discount } = product.Cart

    newProducts.push({
      id, cod, title, price, quantity, category_id, brand_id, company_id, images,
      buy_quantity, buy_freight, buy_term, discount: discount === null ? 0 : discount, buy_date: dateToBrDate(new Date())
    })

    return null
  })

  if (payment === "card") {
    newProducts.filter(product => product.status_id = 1)
    const buy_info = { products: newProducts, address, payment: { type: payment, card }, total }
    return { buy_info }
  }

  newProducts.filter(product => product.status_id = 1)
  const buy_info = { products: newProducts, address, payment: { type: payment }, total }

  return { buy_info }
}