const INITIAL_STATE = {
  loading: false,
  alert: {}
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
      return {
        ...state,
        alert: action.payload
      }
    case "CLOSE_ALERT":
      return {
        ...state,
        alert: {}
      }
    default:
      return state
  }
}