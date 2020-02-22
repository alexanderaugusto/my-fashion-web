import api from "../../services/api"
import { getUserInfo } from "../actions/userAction"

export const insertAddress = (data, onInsert) => async dispatch => {
  if (!JSON.parse(localStorage.getItem("user-token")))
    return null

  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    }
  }

  await api.request.post(api.routes.ROUTE_ADDRESS_INSERT, data, config)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserInfo())
        onInsert()
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

export const updateAddress = (data, onEdit) => async dispatch => {
  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    }
  }

  await api.request.put(api.routes.ROUTE_ADDRESS_UPDATE, data, config)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserInfo())
        onEdit()
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

export const removeAddress = (id) => async dispatch => {
  const config = {
    headers: {
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user-token"))
    },
    data: { id }
  }

  await api.request.delete(api.routes.ROUTE_ADDRESS_DELETE, config)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserInfo())
      }

    })
    .catch((error) => {
      console.log(error)
    })
}

export const freightCalculator = (cep_dest) => async dispatch => {
  const data = {
    cep_dest
  }

  await api.request.post(api.routes.ROUTE_FRETE_CALCULATOR, data)
    .then((response) => {
      const { Valor: value, PrazoEntrega: term } = response.data[0]

      dispatch({
        type: "FREIGHT_CALCULATOR",
        payload: {
          pac: { value: parseInt(value, 10), term: parseInt(term, 10) },
          express: { value: 10, term: 10 }
        }
      })
    })
    .catch((error) => {
      console.log(error)
    })
}
