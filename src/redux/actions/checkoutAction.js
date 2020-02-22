export const changeCheckoutStep = (checkoutStep) => async dispatch => {
  dispatch({
    type: "CHANGE_STEP",
    checkoutStep
  })
}

export const activeCheckout = (isCheckout) => dispatch => dispatch({ type: "ACTIVE_CHECKOUT", isCheckout })