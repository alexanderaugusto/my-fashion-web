import React, { Component } from "react"
import { Form } from "reactstrap"
import { InputAddon, Button } from "../../components"
import { inputValidation } from "../../constants"

import "./Form.css"

export default class RegisterForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInfo: {
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        emailState: "default",
        nameState: "default",
        passwordState: "default",
        confirmPasswordState: "default"
      }
    }
  }

  checkData(e) {
    e.preventDefault()

    const { emailState, nameState, passwordState, confirmPasswordState } = this.state.userInfo
    if (emailState === "has-success" && nameState === "has-success" && passwordState === "has-success" &&
      confirmPasswordState === "has-success")
      this.register()
    else
      this.props.error("Dados inválidos! Por favor, verifique todos os campos e tente novamente.")
  }

  register() {
    const { email, name, password } = this.state.userInfo
    const data = { email, name, password }

    const { onSubmit, redirect, history } = this.props
    onSubmit(data, redirect, history)
  }

  render() {
    const { userInfo } = this.state

    return (
      <div>
        <Form onSubmit={(e) => this.checkData(e)}>
          <InputAddon type="text" value={userInfo.email} placeholder="Email..." className="form-control-lg"
            inputState={userInfo.emailState}
            onChange={(e) => this.setState({ userInfo: inputValidation.emailValidation(e, userInfo) })} />
          <InputAddon type="text" value={userInfo.name} placeholder="Nome..." className="form-control-lg"
            inputState={userInfo.nameState}
            onChange={(e) => this.setState({ userInfo: inputValidation.nameValidation(e, userInfo) })} />
          <InputAddon type="password" value={userInfo.password} placeholder="Senha..." className="form-control-lg"
            inputState={userInfo.passwordState}
            onChange={(e) => this.setState({ userInfo: inputValidation.passwordValidation(e, userInfo) })} />
          <InputAddon type="password" value={userInfo.confirmPassword} placeholder="Confirmar senha..." className="form-control-lg"
            inputState={userInfo.confirmPasswordState}
            onChange={(e) => this.setState({ userInfo: inputValidation.confirmPasswordValidation(e, userInfo) })} />
          <Button
            block
            round
            color="info"
            size="lg"
            className="mb-3 button-login"
          >
            Cadastrar
          </Button>
        </Form>
      </div>
    )
  }

}