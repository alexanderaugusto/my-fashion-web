const INITIAL_STATE = {
  
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "INSERT_ITEM":
      return {
        ...state,
        items: action.payload
      }
    case "UPDATE_CART_INFO":
      return {
        ...state,
        items: action.payload
      }
    case "REMOVE_CART_ITEM":
      return {
        ...state,
        items: action.payload
      }
    default:
      return state
  }
}