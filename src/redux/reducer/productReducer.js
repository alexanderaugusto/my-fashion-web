const INITIAL_STATE = {
  product: null,
  products: [],
  searchText: ""
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        searchText: ""
      }
    case "GET_PRODUCT":
      return {
        ...state,
        product: action.payload,
        searchText: ""
      }
    case "GET_PRODUCT_OFFERS":
      return {
        ...state,
        products: action.payload,
        searchText: ""
      }
    case "FILTER_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        searchText: action.text
      }

    default:
      return state
  }
}