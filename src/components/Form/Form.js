import React from "react"
import { useDispatch } from "react-redux"
import { insertAddress, updateAddress } from "../../redux/actions/addressAction"
import { insertCard, updateCard } from "../../redux/actions/cardAction"
import { updateUserInfo, login, register, uploadImage } from "../../redux/actions/userAction"
import {
  AddressForm, AddressEditForm, CardForm, LoginForm, RegisterForm, PersonalDataForm, AccountDataForm,
  CardEditForm
} from "../../components"

export default function Form({ type, onSubmit, address, card, userData, redirect, history }) {
  // Redux
  const dispatch = useDispatch()

  if (type === "address-insert") {
    return (
      <AddressForm onSubmit={(data) => dispatch(insertAddress(data, onSubmit))} />
    )
  }

  else if (type === "address-edit") {
    return (
      <AddressEditForm onSubmit={(data) => dispatch(updateAddress(data, onSubmit))} address={address} />
    )
  }

  else if (type === "card-insert") {
    return (
      <CardForm onSubmit={(data) => dispatch(insertCard(data, onSubmit))} />
    )
  }

  else if (type === "card-edit") {
    return (
      <CardEditForm onSubmit={(data) => dispatch(updateCard(data, onSubmit))} card={card} />
    )
  }

  else if (type === "login") {
    return (
      <LoginForm onSubmit={(data) => dispatch(login(data, redirect, history))} />
    )
  }

  else if (type === "register") {
    return (
      <RegisterForm onSubmit={(data) => dispatch(register(data, redirect, history))} />
    )
  }

  else if (type === "personal-data") {
    return (
      <PersonalDataForm onSubmit={(data, onSubmit) => dispatch(updateUserInfo(data, onSubmit))} data={userData}
        uploadImage={(data) => dispatch(uploadImage(data))} />
    )
  }

  else if (type === "account-data") {
    return (
      <AccountDataForm onSubmit={(data, onSubmit) => dispatch(updateUserInfo(data, onSubmit))} data={userData} />
    )
  }
}