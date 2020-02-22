const INITIAL_STATE = {
  checkoutStep: 1,
  isCheckout: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CHANGE_STEP":
      return {
        ...state,
        checkoutStep: action.checkoutStep
      }
    case "ACTIVE_CHECKOUT":
      return {
        ...state,
        isCheckout: action.isCheckout
      }
    default:
      return state
  }
}