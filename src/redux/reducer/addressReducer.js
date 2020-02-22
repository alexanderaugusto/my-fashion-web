const INITIAL_STATE = {
  freights: {
    pac: {
      value: 0, term: 0
    },
    express: {
      value: 0, term: 0
    }
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "INSERT_ADDRESS":
      return {
        ...state,
        adresses: action.payload
      }
    case "UPDATE_ADDRESS":
      return {
        ...state,
        adresses: action.payload
      }
    case "REMOVE_ADDRESS":
      return {
        ...state,
        adresses: action.payload
      }
    case "FREIGHT_CALCULATOR": {
      return {
        ...state,
        freights: action.payload
      }
    }
    default:
      return state
  }
}