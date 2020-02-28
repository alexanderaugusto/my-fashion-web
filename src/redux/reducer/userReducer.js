import api from "../../services/api"

const INITIAL_STATE = {
  data: {},
  adresses: [],
  mainAddress: null,
  cart: [],
  cards: [],
  orders: [],
  favorites: [],
  token: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_USER_INFO":
      const { id, email, name, cpf, date_of_birth: dateOfBirth, phone, image, createdAt, updatedAt } = action.payload
      const data = {
        id, email, name, cpf, dateOfBirth, phone, image: api.routes.FILES_URL + image,
        createdAt, updatedAt
      }
      const { addresses: adresses, cart_products: cart, cards, orders, favorite_products: favorites } = action.payload

      return {
        ...state,
        data,
        adresses,
        mainAddress: adresses.filter(address => address.is_main === true)[0],
        cart,
        cards,
        orders,
        favorites
      }
    default:
      return state
  }
}