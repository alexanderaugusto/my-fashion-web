import axios from "axios"

const baseURL = process.env.REACT_APP_API_URL

// const baseURL = "http://6d049803.ngrok.io"

const request = axios.create({
  baseURL
})

const routes = {
  // Images
  IMAGE_PATH_PRODUCT: `${baseURL}/img/product/`,
  IMAGE_PATH_USER: `${baseURL}/img/user/`,

  // Auth
  ROUTE_LOGIN: "/login",

  // Products 
  ROUTE_PRODUCT_LIST_ALL: "/product/list_all",
  ROUTE_PRODUCT_LIST: "/product/list",
  ROUTE_FRETE_CALCULATOR: "/product/frete_calculator",
  ROUTE_PRODUCT_LIST_OFFERS: "/product/list_offers",
  ROUTE_PRODUCT_LIST_BY_CATEGORY: "/product/list_by_category",
  ROUTE_PRODUCT_SEARCH: "/product/search",

  // User 
  ROUTE_USER_INSERT: "/use/create",
  ROUTE_USER_LIST_ALL: "/user/list_all",
  ROUTE_USER_LIST: "/user/list",
  ROUTE_USER_UPDATE: "/user/update",
  ROUTE_USER_UPLOAD_IMAGE: "/user/upload_image",

  // Card 
  ROUTE_CARD_INSERT: "/card/create",
  ROUTE_CARD_LIST: "/card/list",
  ROUTE_CARD_UPDATE: "/card/update",
  ROUTE_CARD_DELETE: "/card/delete",

  // Address 
  ROUTE_ADDRESS_INSERT: "/address/create",
  ROUTE_ADDRESS_LIST: "/address/list",
  ROUTE_ADDRESS_UPDATE: "/address/update",
  ROUTE_ADDRESS_DELETE: "/address/delete",

  // Cart 
  ROUTE_CART_INSERT: "/cart/insert",
  ROUTE_CART_LIST: "/cart/list",
  ROUTE_CART_UPDATE_INFO: "/cart/update_info",
  ROUTE_CART_DELETE_PRODUCT: "/cart/delete_product",

  // Order 
  ROUTE_ORDER_CREATE: "/order/create",
  ROUTE_ORDER_LIST: "/order/list",
  ROUTE_ORDER_UPDATE: "/order/status/update",
  ROUTE_ORDER_GET_STATUS: "/order/status/list_all",
  // Favorite 
  ROUTE_FAVORITE_INSERT: "/favorite/create",
  ROUTE_FAVORITE_LIST: "/favorite/list",
  ROUTE_FAVORITE_DELETE_PRODUCT: "/favorite/delete_product",
}

export default {
  request,
  routes
}