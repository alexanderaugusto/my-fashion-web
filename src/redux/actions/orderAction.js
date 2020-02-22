import api from "../../services/api"
import { getUserInfo } from "../actions/userAction"
import { getDate } from "../../constants/functions"

export const createOrder = (orderItems, history) => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token")))
    return null

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    }
  }

  const data = getData(orderItems)

  await api.request.post(api.routes.ROUTE_ORDER_CREATE, data, config)
    .then((response) => {
      dispatch(getUserInfo())

      history.push({
        pathname: "/checkout/confirm/" + response.data,
        state: data
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

export const listStatus = () => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token")))
    return null

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    }
  }


  await api.request.get(api.routes.ROUTE_ORDER_GET_STATUS, config)
    .then((response) => {
      dispatch({
        type: "GET_STATUS",
        payload: response.data
      })
    })
    .catch((error) => {
      console.log(error)
    })
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
      buy_quantity, buy_freight, buy_term, discount: discount === null ? 0 : discount, buy_date: getDate(new Date())
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