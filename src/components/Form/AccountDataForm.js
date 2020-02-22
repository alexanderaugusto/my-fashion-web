import React, { Component } from "react"
import {
  Card,
  CardBody,
  Form
} from "reactstrap"
import { CardDropdown, InputAddon, Button } from "../../components"
import { inputValidation } from "../../constants"

export default class PersonalData extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accountData: {
        id: "",
        email: "",
        emailState: "default"
      },
    }
  }

  componentDidMount() {
    const { data } = this.props
    const { accountData } = this.state

    if (data.id !== accountData.id) {
      this.getAccountData()
    }
  }

  componentDidUpdate() {
    const { data } = this.props
    const { accountData } = this.state

    if (data.id !== accountData.id) {
      this.getAccountData()
    }
  }

  getAccountData() {
    let accountData = this.state.accountData
    const { id, email } = this.props.data

    accountData.id = id
    if (email && email !== "") {
      accountData.email = email
      accountData.emailState = "has-success"
    }


    this.setState({ accountData })
  }

  checkData(e, state) {
    e.preventDefault()

    const { accountData } = this.state

    if (accountData[state] === "has-success")
      this.edit()
    else
      console.log("Dados inválidos")
  }

  edit() {
    const { email } = this.state.accountData
    const data = { email }

    this.props.onSubmit(data, () => this.refs["card-dropdown"].closeCollapse())
  }

  render() {
    const { accountData } = this.state

    return (
      <Card>
        <CardBody>
          <CardDropdown
            plain
            ref="card-dropdown"
            components={[
              {
                title: "Email",
                subtitle: accountData.email,
                component: (
                  <Form onSubmit={(e) => this.checkData(e, "emailState")}>
                    <InputAddon type="text" value={accountData.email} placeholder="Email..." className="form-control-lg"
                      inputState={accountData.emailState}
                      onChange={(e) => this.setState({ accountData: inputValidation.emailValidation(e, accountData) })} />
                    <Button
                      block
                      round
                      color="info"
                      className="mb-3"
                    >
                      Salvar
                        </Button>
                  </Form>
                )
              }
            ]}
          />
        </CardBody>
      </Card>
    )
  }
}