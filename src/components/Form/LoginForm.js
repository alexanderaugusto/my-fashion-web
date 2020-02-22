import React, { useState } from "react"
import {
  Form
} from "reactstrap"
import { InputAddon, Button } from "../../components"

import "./Form.css"

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function login(e) {
    e.preventDefault()

    const data = { email, password }

    onSubmit(data)
  }

  return (
    <div>
      <Form onSubmit={(e) => login(e)}>
        <InputAddon type="text" value={email} placeholder="Seu email..." className="form-control-lg"
          onChange={(e) => setEmail(e.target.value)} />
        <InputAddon type="password" value={password} placeholder="Sua senha..." className="form-control-lg"
          onChange={(e) => setPassword(e.target.value)} />
        <Button
          block
          round
          color="info"
          size="lg"
          className="mb-3 button-login"
        >
          Entrar
        </Button>
        <div className="pull-left">
          <h6>
            <a href=" #" className="link footer-link">
              Esqueceu sua senha?
            </a>
          </h6>
        </div>
      </Form>
    </div>
  )
}