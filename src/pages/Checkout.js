import React, { useEffect, useState } from "react"
import { Row, Col, Nav, NavItem, Card, CardBody, CardFooter } from "reactstrap"
import { changeCheckoutStep, activeCheckout } from "../redux/actions/checkoutAction"
import { freightCalculator } from "../redux/actions/productAction"
import { useDispatch, useSelector } from "react-redux"
import { OrderResume } from "./components"
import { Button, CardDescription, Panel, Form } from "../components"
import Radio from '@material-ui/core/Radio'
import Cards from 'react-credit-cards'
import { Redirect } from "react-router-dom"

import "./stylesheet/Checkout.css"

export default function Checkout({ location, history }) {
  const { products, address, freight: selectedFreight } = location.state ? location.state : {}

  const [checked, setChecked] = useState(0)
  const [cardPage, setCardPage] = useState(1) // 1 - list cards, 2 - insert card
  const [selectedCard, setSelectedCard] = useState(null)
  const [cardToEdit, setCardToEdit] = useState({})

  // Redux
  const { cards } = useSelector(state => state.userReducer)
  const { freights } = useSelector(state => state.addressReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(activeCheckout(true))
    dispatch(changeCheckoutStep(1))

    return () => dispatch(activeCheckout(false))
  }, [dispatch])

  useEffect(() => { address && dispatch(freightCalculator(address.zipcode)) }, [address, dispatch])

  function goToConfirmCheckout() {
    if (checked === 0)
      return
    else if (checked === "card" && selectedCard === null)
      return

    const { products, address, freight } = location.state
    history.push({
      pathname: "/checkout/confirm",
      state: {
        products,
        address,
        freight,
        payment: checked,
        card: selectedCard
      }
    })
  }

  function setCardEdit(card) {
    setCardToEdit(card)
    setCardPage(3)
  }

  const renderBillet = () => {
    return (
      <Nav className="items-in-grid" onClick={() => setChecked("billet")}>
        <NavItem>
          <Radio
            color="primary"
            checked={checked === "billet"}
            name="radio-button-demo"
            onChange={() => setChecked("billet")}
            inputProps={{ 'aria-label': 'A' }}
          />
          &nbsp; &nbsp; &nbsp; &nbsp;
        </NavItem>
        <NavItem>
          <Button className="list-icon" icon round>
            <i className="fas fa-barcode" />
          </Button>
          &nbsp; &nbsp; &nbsp; &nbsp;
        </NavItem>
        <NavItem style={{ paddingTop: 10 }}>
          <CardDescription fontSize={20}>Boleto bancário</CardDescription>
        </NavItem>
      </Nav>
    )
  }

  const renderCreditCard = () => {
    return (
      <Nav className="items-in-grid" onClick={() => setChecked("card")}>
        <NavItem>
          <Radio
            color="primary"
            checked={checked === "card"}
            name="radio-button-demo"
            onChange={() => setChecked("card")}
            inputProps={{ 'aria-label': 'A' }}
          />
          &nbsp; &nbsp; &nbsp; &nbsp;
        </NavItem>
        <NavItem>
          <Button className="list-icon" icon round>
            <i className="now-ui-icons shopping_credit-card" />
          </Button>
          &nbsp; &nbsp; &nbsp; &nbsp;
        </NavItem>
        <NavItem style={{ paddingTop: 10 }}>
          <CardDescription fontSize={20}>Cartão de crédito &nbsp; &nbsp; &nbsp; &nbsp;</CardDescription>
        </NavItem>
        <NavItem style={{ paddingTop: 10 }}>
          <CardDescription fontSize={16} color="red">
            {selectedCard && selectedCard.number.substring(0, 4) + " **** **** ****"}
          </CardDescription>
        </NavItem>
      </Nav>
    )
  }

  const renderCreditCardForm = () => {
    if (cardPage === 1) {
      return (
        <div>
          <Button color="link" className="link-address"
            onClick={() => setCardPage(2)}>+ Adicionar novo cartão</Button>
          <Row>
            {cards.map((card, index) => {
              return (
                <Col xl={6} xs={12} key={index}>
                  <Card>
                    <CardBody>
                      <div>
                        <Cards
                          cvc={card.cod}
                          expiry={card.date}
                          preview={true}
                          name={card.name}
                          number={card.number.substring(0, 4) + " **** **** ****"}
                        />
                      </div>
                    </CardBody>
                    <CardFooter>
                      <Row>
                        <Col className="text-center">
                          <Button color="link" className="link-address"
                            onClick={() => setCardEdit(card)}>
                            Editar
                          </Button>
                        </Col>
                        <Col className="text-center">
                          {selectedCard && card.number === selectedCard.number ?
                            <CardDescription>Selecionado</CardDescription>
                            :
                            <Button color="link" className="link-address" onClick={() => setSelectedCard(card)}>
                              Selecionar cartão
                          </Button>}
                        </Col>
                      </Row>
                    </CardFooter>
                  </Card>
                </Col>
              )
            })}
          </Row>

        </div>
      )
    }

    else if (cardPage === 2) {
      return (
        <div>
          <Row>
            <Col xs={4}>
              <Button
                className="btn-neutral btn-go-back"
                onClick={() => setCardPage(1)}
              >
                <div>
                  <i className="now-ui-icons arrows-1_minimal-left" />
                  {" "} Voltar
                </div>
              </Button>
            </Col>
            <Col xs={6}>
              <CardDescription fontSize={25}> Inserir novo cartão </CardDescription>
            </Col>
          </Row>

          <Form type="card-insert" onSubmit={() => setCardPage(1)} />

        </div>
      )
    }

    else if (cardPage === 3) {
      return (
        <div>
          <Row>
            <Col xs={4}>
              <Button
                className="btn-neutral btn-go-back"
                onClick={() => setCardPage(1)}
              >
                <div>
                  <i className="now-ui-icons arrows-1_minimal-left" />
                  {" "} Voltar
                </div>
              </Button>
            </Col>
            <Col xs={6}>
              <CardDescription fontSize={25}> Editar cartão </CardDescription>
            </Col>
          </Row>

          <Form type="card-edit" card={cardToEdit} onSubmit={() => setCardPage(1)} />

        </div>
      )
    }
  }

  if (!location.state)
    return <Redirect to="/" />

  return (
    <div>
      <Row>
        <Col md={8} xs={12}>
          <Panel body={renderBillet()} />
          <Panel expansive expansionSumary={renderCreditCard()} expansionDetails={renderCreditCardForm()} />
        </Col>
        <Col md={4} xs={12}>
          <OrderResume products={products} freight={freights[selectedFreight]} buttonText="Continuar" history={history}
            payment={checked} onClick={() => goToConfirmCheckout()} />
        </Col>
      </Row>
    </div>
  )
}
