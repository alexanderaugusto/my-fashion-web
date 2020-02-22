import React, { Component } from "react"
import { Form, Row, Col } from "reactstrap"
import { InputAddon, Button } from "../../components"
import { inputValidation } from "../../constants"
import cep from 'cep-promise'

import "./Form.css"

export default class AddressForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addressInfo: {
        zipcode: "",
        city: "",
        state: "",
        street: "",
        neighborhood: "",
        number: "",
        complement: "",
        name: "",
        phone: "",
        zipcodeState: "default",
        cityState: "default",
        stateState: "default",
        streetState: "default",
        neighborhoodState: "default",
        numberState: "default",
        complementState: "default",
        nameState: "default",
        phoneState: "default"
      }
    }
  }

  checkData(e) {
    e.preventDefault()

    const { zipcodeState, cityState, stateState, streetState, neighborhoodState, numberState,
      nameState, phoneState} = this.state.addressInfo

    if (zipcodeState === "has-success" && cityState === "has-success" && stateState === "has-success" &&
      streetState === "has-success" && neighborhoodState === "has-success" && numberState === "has-success" &&
      nameState === "has-success" && phoneState === "has-success") {
      this.insert()
    }

    else
      console.log("dados inválidos")
  }

  insert() {
    const { zipcode, city, state, street, neighborhood, number, complement, name, phone } = this.state.addressInfo
    const data = { zipcode, city, state, street, neighborhood, number, complement, name, phone, is_main: false }

    this.props.onSubmit(data)
  }

  getInfosByCep(zipcode) {
    if (this.state.addressInfo.zipcodeState === "has-success") {
      cep(parseInt(zipcode.replace("-", ""), 10))
        .then((response) => {
          const { state, city, neighborhood, street } = response
          const addressInfo = this.state.addressInfo

          if (state) {
            addressInfo.state = state
            addressInfo.stateState = "has-success"
          }
          if (city) {
            addressInfo.city = city
            addressInfo.cityState = "has-success"
          }
          if (neighborhood) {
            addressInfo.neighborhood = neighborhood
            addressInfo.neighborhoodState = "has-success"
          }
          if (street) {
            addressInfo.street = street
            addressInfo.streetState = "has-success"
          }

          this.setState({ addressInfo })
        })
    }
  }

  render() {
    const { addressInfo } = this.state

    return (
      <div className="text-center">
        <Form onSubmit={(e) => this.checkData(e)}>
          <Row>
            <Col>
              <InputAddon type="text" value={addressInfo.name} placeholder="Nome..." className="form-control-lg"
                inputState={addressInfo.nameState}
                onChange={(e) => this.setState({ addressInfo: inputValidation.nameValidation(e, addressInfo) })} />
            </Col>
            <Col>
              <InputAddon maxLength="14" type="text" value={addressInfo.phone} placeholder="Celular..." className="form-control-lg"
                inputState={addressInfo.phoneState}
                onChange={(e) => this.setState({ addressInfo: inputValidation.phoneValidation(e, addressInfo) })} />
            </Col>
          </Row>

          <Row>
            <Col>
              <InputAddon maxLength="9" type="text" value={addressInfo.zipcode} placeholder="CEP..." className="form-control-lg"
                inputState={addressInfo.zipcodeState}
                onChange={(e) => this.setState({ addressInfo: inputValidation.zipcodeValidation(e, addressInfo) })}
                onBlur={() => this.getInfosByCep(this.state.addressInfo.zipcode)} />
            </Col>
            <Col>
              <InputAddon type="text" value={addressInfo.street} placeholder="Rua..." className="form-control-lg"
                inputState={addressInfo.streetState}
                onChange={(e) => this.setState({ addressInfo: inputValidation.streetValidation(e, addressInfo) })} />
            </Col>
            <Col>
              <InputAddon type="number" value={addressInfo.number} placeholder="Número..." className="form-control-lg"
                inputState={addressInfo.numberState}
                onChange={(e) => this.setState({ addressInfo: inputValidation.numberValidation(e, addressInfo) })} />
            </Col>
          </Row>

          <Row>
            <Col>
              <InputAddon type="text" value={addressInfo.city} placeholder="Cidade..." className="form-control-lg"
                inputState={addressInfo.cityState}
                onChange={(e) => this.setState({ addressInfo: inputValidation.cityValidation(e, addressInfo) })} />
            </Col>
            <Col>
              <InputAddon type="text" value={addressInfo.state} placeholder="Estado..." className="form-control-lg"
                inputState={addressInfo.stateState}
                onChange={(e) => this.setState({ addressInfo: inputValidation.stateValidation(e, addressInfo) })} />
            </Col>
          </Row>

          <Row>
            <Col>
              <InputAddon type="text" value={addressInfo.neighborhood} placeholder="Bairro..." className="form-control-lg"
                inputState={addressInfo.neighborhoodState}
                onChange={(e) => this.setState({ addressInfo: inputValidation.neighborhoodValidation(e, addressInfo) })} />
            </Col>
            <Col>
              <InputAddon type="text" value={addressInfo.complement} placeholder="Complemento..." className="form-control-lg"
                inputState={addressInfo.complementState}
                onChange={(e) => this.setState({ addressInfo: inputValidation.complementValidation(e, addressInfo) })} />
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