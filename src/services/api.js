import axios from "axios"

const axiosCreated = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const routes = {
  // Images
  FILES_URL: "https://centralmodas-upload.s3.amazonaws.com/",

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
  ROUTE_USER_INSERT: "/user/create",
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

const success = (message, callback, data) => {
  callback(200, message, data)
}

const error = (message, callback) => {
  if (message.toString().includes("400")) {
    callback(400, "Um erro ocorreu! Por favor, verifique todos os campos inseridos.")
  }
  else if (message.toString().includes("401")) {
    callback(401, "Você precisa estar autenticado para relizar essa operação.")
  }
  else if (message.toString().includes("404")) {
    callback(404, "Um erro ocorreu. Por favor, tente novamente mais tarde.")
  }
  else if (message.toString().includes("409")) {
    callback(409, "Este email já foi cadastrado anteriormente.")
  }
  else if (message.toString().includes("402")) {
    callback(402, "Email ou senha incorretos.")
  }
  else if (message.toString().includes("500")) {
    callback(500, "Um erro ocorreu. Por favor, tente novamente mais tarde.")
  }
  else {
    callback(500, "Um erro ocorreu. Por favor, tente novamente mais tarde.")
  }
}

const request = {
  post: async (route, config, data, callback) => {
    await axiosCreated.post(route, data, config)
      .then((response) => success(null, callback, response.data))
      .catch((response) => error(response, callback))
  },
  put: async (route, config, data, callback) => {
    await axiosCreated.put(route, data, config)
      .then((response) => success(null, callback, response.data))
      .catch((response) => error(response, callback))
  },
  get: async (route, config, data, callback) => {
    await axiosCreated.get(route, config, data)
      .then((response) => success(null, callback, response.data))
      .catch((response) => error(response, callback))
  },
  delete: async (route, config, data, callback) => {
    await axiosCreated.delete(route, config, data)
      .then((response) => success(null, callback, response.data))
      .catch((response) => error(response, callback))
  }
}

export default {
  request,
  routes
}