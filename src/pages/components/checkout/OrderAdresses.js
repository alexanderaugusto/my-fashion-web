import React, { useState, useEffect } from "react"
import { Card, CardBody, CardFooter, Row, Col, FormGroup, Label, Input } from "reactstrap"
import { Button, CardDescription, Form } from "../../../components"
import { useSelector } from "react-redux"

export default function OrderAdresses({ selectedAddress, isModal, changeSelectedAddress }) {
  const [page, setPage] = useState(1)
  const [oldPage, setOldPage] = useState(1)
  const [selected, setSelected] = useState({})
  const [addressToEdit, setAddressToEdit] = useState(null)

  // Redux
  const { adresses } = useSelector(state => state.userReducer)

  useEffect(() => setSelected(selectedAddress), [selectedAddress])

  function saveSelectedAddress() {
    const newAddress = adresses.filter(address => address.id === selected.id)

    if (isModal) {
      changeSelectedAddress(newAddress[0])
    } else {
      changeSelectedAddress(newAddress[0])
      setPage(1)
    }
  }

  function addAddress(old) {
    setPage(3)
    setOldPage(old)
  }

  function editAddress(address, old) {
    setAddressToEdit(address)
    setPage(4)
    setOldPage(old)
  }

  // Main address
  if (page === 1 && selected && !isModal) {
    const address = selected
    return (
      <div>
        <Card>
          <CardBody>
            <CardDescription color="#363636">{`${address.name} - ${address.phone}`}</CardDescription>
            <CardDescription marginBottom={4}>{`${address.street}  ${address.number}`}</CardDescription>
            <CardDescription marginBottom={4}>{`${address.city}  ${address.state}`}</CardDescription>
            <CardDescription marginBottom={4}>{address.zipcode}</CardDescription>
          </CardBody>
          <CardFooter>
            <Button color="link" className="link-address"
              onClick={() => addAddress(1)}>+ Adicionar novo endereço</Button>
            <Button color="link" className="link-address" onClick={() => setPage(2)}>
              Selecionar outro endereço
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Choose other adresses
  else if (page === 2 || (page === 1 && isModal)) {
    return (
      <div>
        <Row>
          {adresses.map((address, index) => {
            return (
              <Col xs={6} key={index}>
                <Card>
                  <CardBody>
                    <FormGroup check className="form-check-radio">
                      <Label check>
                        <Input type="radio" name="radios"
                          defaultChecked={address.id === selected.id ? true : false}
                          onChange={() => setSelected(address)} />
                        <span className="form-check-sign" />
                        <CardDescription color="#363636">{`${address.name} - ${address.phone}`}</CardDescription>
                        <CardDescription marginBottom={4}>{`${address.street}  ${address.number}`}</CardDescription>
                        <CardDescription marginBottom={4}>{`${address.city}  ${address.state}`}</CardDescription>
                        <CardDescription marginBottom={4}>{address.zipcode}</CardDescription>
                      </Label>
                    </FormGroup>
                  </CardBody>
                  <CardFooter>
                    <Button color="link" className="link-address"
                      onClick={() => editAddress(address, 2)}>
                      Editar
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            )
          })}
        </Row>
        <Button color="link" className="link-address"
          onClick={() => addAddress(2)}>+ Adicionar novo endereço</Button>
        <Button className="btn-neutral link-address" color="link"
          onClick={() => saveSelectedAddress()}>
          <i className="now-ui-icons ui-1_check" /> Salvar selecionado
          </Button>
      </div>
    )
  }

  // Insert new address
  else if (page === 3) {
    return (
      <div>
        <Row>
          <Col xs={4}>
            <Button
              className="btn-neutral btn-go-back"
              onClick={() => setPage(oldPage)}
            >
              <div>
                <i className="now-ui-icons arrows-1_minimal-left" />
                {" "} Voltar
            </div>
            </Button>
          </Col>
          <Col xs={6}>
            <CardDescription fontSize={25}> Inserir novo Endereço</CardDescription>
          </Col>
        </Row>

        <Form type="address-insert" onSubmit={() => setPage(1)} />
      </div>
    )
  }

  // Edit address
  else if (page === 4) {
    return (
      <div>
        <Row>
          <Col xs={4}>
            <Button
              className="btn-neutral btn-go-back"
              onClick={() => setPage(oldPage)}
            >
              <div>
                <i className="now-ui-icons arrows-1_minimal-left" />
                {" "} Voltar
            </div>
            </Button>
          </Col>
          <Col xs={6}>
            <CardDescription fontSize={25}> Editar endereço</CardDescription>
          </Col>
        </Row>

        <Form type="address-edit" address={addressToEdit} onSubmit={() => setPage(2)} />
      </div>
    )
  }

  // Adresses is empty
  else if (adresses.length === 0) {
    return (
      <div className="text-left">
        <Button color="link" className="link-address"
          onClick={() => setPage(3)}>+ Adicionar novo endereço</Button>
      </div>
    )
  }

  else
    return null
}