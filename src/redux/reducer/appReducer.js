const INITIAL_STATE = {
  loading: false,
  alert: {},
  categories: [],
  subcategories: [],
  brands: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START_LOADING":
      return {
        ...state,
        loading: true
      }
    case "STOP_LOADING":
      return {
        ...state,
        loading: false
      }
    case "OPEN_ALERT":
      const alert = { ...action.payload, open: true }
      return {
        ...state,
        alert
      }
    case "CLOSE_ALERT":
      return {
        ...state,
        alert: {}
      }
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload
      }
    case "GET_SUBCATEGORIES":
      return {
        ...state,
        subcategories: action.payload
      }
    case "GET_BRANDS":
      return {
        ...state,
        brands: action.payload
      }
    default:
      return state
  }
}