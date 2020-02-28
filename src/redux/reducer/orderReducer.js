const INITIAL_STATE = {
  status: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_STATUS":
      return {
        ...state,
        status: action.payload
      }
    default:
      return state
  }
}