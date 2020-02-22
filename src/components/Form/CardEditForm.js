import React, { Component } from "react"
import { Form, Row, Col } from "reactstrap"
import { InputAddon, Button } from "../../components"
import { inputValidation } from "../../constants"
import Cards from 'react-credit-cards'

import "./Form.css"
import 'react-credit-cards/es/styles-compiled.css';

export default class CardForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cardInfo: {
        id: "",
        number: "",
        name: "",
        date: "",
        cod: "",
        cpf: "",
        numberState: "has-success",
        nameState: "has-success",
        dateState: "has-success",
        codState: "has-success",
        cpfState: "has-success",
      },
      inputFocused: false
    }
  }

  componentDidMount() {
    this.getCardInfo()
  }

  getCardInfo() {
    let cardInfo = this.state.cardInfo
    const { id, number, name, date, cod, cpf } = this.props.card

    cardInfo = { ...cardInfo, id, number, name, date, cod, cpf }

    this.setState({ cardInfo })
  }

  checkData(e) {
    e.preventDefault()

    const { numberState, nameState, dateState, codState, cpfState } = this.state.cardInfo

    if (numberState === "has-success" && nameState === "has-success" && dateState === "has-success" &&
      codState === "has-success" && cpfState === "has-success")
      this.editCard()
    else
      console.log("dados inválidos")
  }

  async editCard() {
    const { id, number, name, date, cod, cpf } = this.state.cardInfo
    const data = { id, number, name, date, cod, cpf }

    this.props.onSubmit(data)
  }

  render() {
    const { cardInfo, inputFocused } = this.state

    return (
      <div className="text-center">
        <Form onSubmit={(e) => this.checkData(e)}>
          <Row>
            <Col>
              <InputAddon type="text" maxLength={19} value={cardInfo.number} placeholder="Número do titular..." className="form-control-lg"
                inputState={cardInfo.numberState}
                onChange={(e) => this.setState({ cardInfo: inputValidation.cardNumberValidation(e, cardInfo) })}
                onFocus={() => this.setState({ inputFocused: "number" })} />

              <InputAddon type="text" value={cardInfo.name} placeholder="Nome do titular..." className="form-control-lg"
                inputState={cardInfo.nameState}
                onChange={(e) => this.setState({ cardInfo: inputValidation.cardNameValidation(e, cardInfo) })}
                onFocus={() => this.setState({ inputFocused: "name" })} />

              <InputAddon type="text" maxLength={7} value={cardInfo.date} placeholder="Data de vencimento..." className="form-control-lg"
                inputState={cardInfo.dateState}
                onChange={(e) => this.setState({ cardInfo: inputValidation.cardDateValidation(e, cardInfo) })}
                onFocus={() => this.setState({ inputFocused: "expiry" })} />

              <InputAddon type="text" maxLength={3} value={cardInfo.cod} placeholder="Código de segurança..." className="form-control-lg"
                inputState={cardInfo.codState}
                onChange={(e) => this.setState({ cardInfo: inputValidation.cardCodValidation(e, cardInfo) })}
                onFocus={() => this.setState({ inputFocused: "cvc" })} />

              <InputAddon type="text" maxLength={14} value={cardInfo.cpf} placeholder="CPF do titular..." className="form-control-lg"
                inputState={cardInfo.cpfState}
                onChange={(e) => this.setState({ cardInfo: inputValidation.cpfValidation(e, cardInfo) })}
                onFocus={() => this.setState({ inputFocused: "cpf" })} />
            </Col>
            <Col>
              <Cards
                cvc={cardInfo.cod}
                expiry={cardInfo.date}
                focused={inputFocused}
                preview={true}
                name={cardInfo.name}
                number={cardInfo.number}
              />
            </Col>
          </Row>

          <Button
            round
            color="info"
            size="lg"
            className="mb-3 button-confirm-address"
          >
            Confirmar
          </Button>
        </Form>
      </div>
    )
  }

}