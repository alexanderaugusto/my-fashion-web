import React, { useState } from "react"
import {
  Card,
  CardBody,
  Row,
  Col,
  CardFooter
} from "reactstrap"
import { useSelector, useDispatch } from "react-redux"
import { deleteAddress } from "../../../redux/actions/addressAction"
import { Button, Form, CardDescription } from "../../../components"

export default function AddressData() {
  const [page, setPage] = useState(1)
  const [addressToEdit, setAddressToEdit] = useState(null)

  // Redux
  const { adresses } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  function setEditAddress(address) {
    setAddressToEdit(address)
    setPage(3)
  }

  if (page === 1) {
    return (
      <div>
        <Card>
          <CardBody>
            <div className="text-left">
              <Button color="link" className="link-address"
                onClick={() => setPage(2)}>+ Adicionar novo endereço</Button>
            </div>

            <Row>
              {adresses.map((address, index) => {
                return (
                  <Col xs={6} key={index}>
                    <Card>
                      <CardBody>
                        <CardDescription color="#363636">{`${address.name} - ${address.phone}`}</CardDescription>
                        <CardDescription marginBottom={4}>{`${address.street}  ${address.number}`}</CardDescription>
                        <CardDescription marginBottom={4}>{`${address.city}  ${address.state}`}</CardDescription>
                        <CardDescription marginBottom={4}>{address.zipcode}</CardDescription>
                      </CardBody>
                      <CardFooter className="text-center">
                        <Button color="link" className="link-address"
                          onClick={() => setEditAddress(address)}>Editar endereço</Button>
                        <Button color="link" className="link-address"
                          onClick={() => dispatch(deleteAddress(address.id))}>Excluir endereço</Button>
                      </CardFooter>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </CardBody>
        </Card>
      </div>
    )
  }
  else if (page === 2) {
    return (
      <Card>
        <CardBody>
          <Row>
            <Col xs={4}>
              <Button
                className="btn-neutral btn-go-back"
                onClick={() => setPage(1)}
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
        </CardBody>
      </Card>
    )
  }

  else if (page === 3) {
    return (
      <Card>
        <CardBody>
          <Row>
            <Col xs={4}>
              <Button
                className="btn-neutral btn-go-back"
                onClick={() => setPage(1)}
              >
                <div>
                  <i className="now-ui-icons arrows-1_minimal-left" />
                  {" "} Voltar
          </div>
              </Button>
            </Col>
            <Col xs={6}>
              <CardDescription fontSize={25}>Editar Endereço</CardDescription>
            </Col>
          </Row>
          <Form type="address-edit" onSubmit={() => setPage(1)}
            address={addressToEdit} />
        </CardBody>
      </Card>
    )
  }
}