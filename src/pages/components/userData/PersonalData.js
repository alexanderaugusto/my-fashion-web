import React from "react"
import { useSelector } from "react-redux"
import { Form } from "../../../components"

export default function () {
  // Redux
  const { data } = useSelector(state => state.userReducer)
  
  return (
    <Form type="personal-data" userData={data} />
  )
}