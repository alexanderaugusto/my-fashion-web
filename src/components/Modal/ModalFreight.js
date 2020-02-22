import React, { useEffect, useState } from "react"
import {
  Modal,
  ModalHeader,
  ModalBody,
  CardTitle,
  Nav,
  NavItem,
  Card,
  CardBody,
  Row,
  Col,
  ModalFooter
} from "reactstrap"
import { useSelector } from "react-redux"
import { CardDescription, Button } from "../../components"
import Radio from '@material-ui/core/Radio'

import "./Modal.css"

export default function ModalFreight({ modalOpen, toggleModal, selectedFreight }) {
  const [checked, setChecked] = useState(selectedFreight)

  // Redux
  const { freights } = useSelector(state => state.addressReducer)

  useEffect(() => setChecked(selectedFreight), [selectedFreight])

  const { value: valuePac, term: termPac } = freights.pac
  const { value: valueExpress, term: termExpress } = freights.express

  return (
    <div>
      <Modal className="card-plain" isOpen={modalOpen} toggle={() => toggleModal()} size="lg">
        <ModalHeader className="justify-content-center" toggle={() => toggleModal()}>
          <div className="header header-primary text-center">
            <CardTitle>Opções de entrega</CardTitle>
          </div>
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Row className="items-in-grid">
                <Col>
                  <Nav>
                    <NavItem className="cursor-default">
                      <Radio
                        color="primary"
                        checked={checked === "pac"}
                        name="radio-button-demo"
                        onChange={() => setChecked("pac")}
                        inputProps={{ 'aria-label': 'A' }}
                      />
                      &nbsp; &nbsp; &nbsp; &nbsp;
                    </NavItem>
                    <NavItem className="cursor-default" style={{ marginTop: 10 }}>
                      <CardDescription fontSize={15} marginBottom={2}>
                        {`Normal - ${termPac} à ${termPac + 2} úteis`}
                      </CardDescription>
                      <CardDescription fontSize={13} color="green">
                        {`R$ ${valuePac.toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                      </CardDescription>
                    </NavItem>
                  </Nav>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Row className="items-in-grid">
                <Col md={10} xs={12}>
                  <Nav>
                    <NavItem>
                      <Radio
                        color="primary"
                        checked={checked === "express"}
                        name="radio-button-demo"
                        onChange={() => setChecked("express")}
                        inputProps={{ 'aria-label': 'A' }}
                      />
                      &nbsp; &nbsp; &nbsp; &nbsp;
                  </NavItem>
                    <NavItem className="cursor-default" style={{ marginTop: 10 }}>
                      <CardDescription fontSize={15} marginBottom={2}>
                        {`Expresso - ${termExpress} à ${termExpress + 2} úteis`}
                      </CardDescription>
                      <CardDescription fontSize={13} color="green">
                        {`R$ ${valueExpress.toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                      </CardDescription>
                    </NavItem>
                  </Nav>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button
            round
            color="info"
            size="lg"
            className="mb-3 button-confirm-address"
            onClick={() => toggleModal(checked)}
          >
            Salvar
          </Button>
        </ModalFooter>
      </Modal>
    </div >
  )
}