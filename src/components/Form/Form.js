import React from "react"
import { useDispatch } from "react-redux"
import { createAddress, updateAddress } from "../../redux/actions/addressAction"
import { createCard, updateCard } from "../../redux/actions/cardAction"
import { updateUser, login, register, uploadImage } from "../../redux/actions/userAction"
import {
  AddressForm, AddressEditForm, CardForm, LoginForm, RegisterForm, PersonalDataForm, AccountDataForm,
  CardEditForm
} from "../../components"

export default function Form({ type, onSubmit, address, card, userData, redirect, history }) {
  // Redux
  const dispatch = useDispatch()

  if (type === "address-insert") {
    return (
      <AddressForm onSubmit={(data) => dispatch(createAddress(data, onSubmit))}
        error={(message) => dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })} />
    )
  }

  else if (type === "address-edit") {
    return (
      <AddressEditForm onSubmit={(data) => dispatch(updateAddress(data, onSubmit))} address={address}
        error={(message) => dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })} />
    )
  }

  else if (type === "card-insert") {
    return (
      <CardForm onSubmit={(data) => dispatch(createCard(data, onSubmit))}
        error={(message) => dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })} />
    )
  }

  else if (type === "card-edit") {
    return (
      <CardEditForm onSubmit={(data) => dispatch(updateCard(data, onSubmit))} card={card}
        error={(message) => dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })} />
    )
  }

  else if (type === "login") {
    return (
      <LoginForm onSubmit={(data) => dispatch(login(data, redirect, history))} />
    )
  }

  else if (type === "register") {
    return (
      <RegisterForm onSubmit={(data) => dispatch(register(data, redirect, history))}
        error={(message) => dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })} />
    )
  }

  else if (type === "personal-data") {
    return (
      <PersonalDataForm onSubmit={(data, onSubmit) => dispatch(updateUser(data, onSubmit))} data={userData}
        uploadImage={(data) => dispatch(uploadImage(data))}
        error={(message) => dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })} />
    )
  }

  else if (type === "account-data") {
    return (
      <AccountDataForm onSubmit={(data, onSubmit) => dispatch(updateUser(data, onSubmit))} data={userData}
        error={(message) => dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })} />
    )
  }
}