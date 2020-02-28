import React, { useEffect, useState } from "react"
import { Row, Col, CardTitle, Card, CardBody, Nav, NavItem } from "reactstrap"
import { changeCheckoutStep, activeCheckout } from "../redux/actions/checkoutAction"
import { createOrder } from "../redux/actions/orderAction"
import { freightCalculator } from "../redux/actions/productAction"
import { useDispatch, useSelector } from "react-redux"
import { OrderResume } from "./components"
import { CardDescription, Avatar, Button, ModalAdresses } from "../components"
import { Redirect } from "react-router-dom"
import api from "../services/api"

import "./stylesheet/Checkout.css"

export default function CheckoutConfirm({ location, history }) {
  let { address, payment, card } = location.state ? location.state : {}

  const [modalAddress, setModalAddress] = useState(false)
  // const [modalFreight, setModalFreight] = useState(false)

  // Redux
  const { cart } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(activeCheckout(true))
    dispatch(changeCheckoutStep(2))

    return () => dispatch(activeCheckout(false))
  }, [dispatch])

  useEffect(() => {
    // Set freight and praze for each product in the cart
    if (address) {
      cart.filter(product => {
        dispatch(freightCalculator(address.zipcode, product))

        return null
      })
    }
  }, [dispatch, address, cart])

  function getBuyTotal() {
    let subTotal = 0
    let freightTotal = 0
    let quantityTotal = 0
    let discountTotal = 0
    cart.filter(value => {
      subTotal = subTotal + (value.price * value.Cart.quantity)
      freightTotal = freightTotal + value.Cart.freight
      quantityTotal = quantityTotal + value.Cart.quantity
      discountTotal = discountTotal + value.Cart.discount

      return null
    })

    return (subTotal + freightTotal - discountTotal)
  }

  function finallyOrder() {
    dispatch(createOrder({ products: cart, address, payment, card, total: getBuyTotal() }, history))
  }

  function toggleModalAddress(newAddress) {
    setModalAddress(!modalAddress)

    if (newAddress) {
      let state = location.state
      state.address = newAddress
      history.replace({ state })
    }
  }

  // function toggleModalFreight(newFreight) {
  //   setModalFreight(!modalFreight)

  //   if (newFreight) {
  //     let state = location.state
  //     state.freight = newFreight
  //     history.replace({ state })
  //   }
  // }

  const renderAddress = () => {
    // let { value, term } = selectedFreight ? freights[selectedFreight] : {}

    return (
      <div className="items-in-grid">
        <ModalAdresses modalOpen={modalAddress} toggleModal={(newAddress) => toggleModalAddress(newAddress)}
          selectedAddress={address} />

        {/* <ModalFreight modalOpen={modalFreight} toggleModal={(newFreight) => toggleModalFreight(newFreight)}
          selectedFreight={selectedFreight} /> */}

        <Card>
          <CardBody>
            <Row className="items-in-grid">
              <Col md={10} xs={12}>
                <Nav>
                  <NavItem className="cursor-default">
                    <Avatar icon="now-ui-icons location_pin" background="rgba(211,211,211, 0.5)"
                      color="rgba(0, 153, 204, 1)" />

                    &nbsp; &nbsp; &nbsp; &nbsp;
                  </NavItem>
                  <NavItem className="cursor-default" style={{ marginTop: 10 }}>
                    <CardDescription fontSize={15} marginBottom={2}>{`${address.name} - ${address.phone}`}</CardDescription>
                    <CardDescription fontSize={13} marginBottom={2}>{`${address.zipcode}, ${address.street} - ${address.number}`}</CardDescription>
                    <CardDescription fontSize={13}>{`${address.city}, ${address.state} - ${address.complement}`}</CardDescription>
                  </NavItem>
                </Nav>
              </Col>
              <Col md={2} xs={12} className="text-right">
                <Button color="link" className="link-address" onClick={() => setModalAddress(true)}>
                  Escolher outro
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        {/* {products.length === 1 &&
          <Card>
            <CardBody>
              <Row className="items-in-grid">
                <Col md={10} xs={12}>
                  <Nav>
                    <NavItem className="cursor-default">
                      <Avatar icon="now-ui-icons shopping_delivery-fast" background="rgba(211,211,211, 0.5)"
                        color="rgba(0, 153, 204, 1)" />

                      &nbsp; &nbsp; &nbsp; &nbsp;
                  </NavItem>
                    <NavItem className="cursor-default" style={{ marginTop: 10 }}>
                      <CardDescription fontSize={15} marginBottom={2}>
                        {`${selectedFreight.toUpperCase()} - ${term} à ${term + 2} úteis`}
                      </CardDescription>
                      <CardDescription fontSize={13} color="green">
                        {`R$ ${value.toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                      </CardDescription>
                    </NavItem>
                  </Nav>
                </Col>
                <Col md={2} xs={12} className="text-right">
                  <Button color="link" className="link-address" onClick={() => setModalFreight(true)}>
                    Escolher outro
                </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>} */}
      </div>
    )
  }

  const renderProducts = (product) => {
    const { quantity, freight, praze } = product.Cart

    return (
      <div className="items-in-grid">
        <Row>
          <Col xs={8}>
            <Nav>
              <NavItem className="cursor-default">
                <Avatar alt={product.title} type="square"
                  src={api.routes.FILES_URL + product.images[product.images.length - 1].name} />

                &nbsp; &nbsp; &nbsp; &nbsp;
                </NavItem>
              <NavItem className="cursor-default" style={{ marginTop: 15 }}>
                <CardDescription fontSize={15} marginBottom={2}>{product.title}</CardDescription>
                <CardDescription fontSize={13}>
                  {`${quantity}x ${quantity === 1 ? "unidade" : "unidades"}`}
                </CardDescription>
                <CardDescription fontSize={13} color="green">
                  {`R$ ${(product.price).toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                </CardDescription>
              </NavItem>
            </Nav>
          </Col>
          <Col xs={4} className="text-right" style={{ marginTop: 15 }}>
            <CardDescription fontSize={15} marginBottom={2}>
              {`FRETE - ${praze} à ${praze + 2} úteis`}
            </CardDescription>
            <CardDescription fontSize={13} color="green" marginBottom={4}>
              {`R$ ${parseFloat(freight).toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
            </CardDescription>
          </Col>
        </Row>

      </div>
    )
  }

  const renderBillet = () => {
    // let subTotal = 0
    // let quantityTotal = 0
    // products.forEach(value => {
    //   subTotal = subTotal + (value.price * value.Cart.quantity)
    //   quantityTotal = quantityTotal + value.Cart.quantity
    // })
    // let total = subTotal + freights[selectedFreight].value

    return (
      <Row className="items-in-grid">
        <Col md={2} xs={12}>
          <Avatar icon="fas fa-barcode" background="rgba(211,211,211, 0.5)"
            color="rgba(0, 153, 204, 1)" />
        </Col>
        <Col md={8} xs={12}>
          <CardDescription fontSize={15} marginBottom={2}>Boleto bancário</CardDescription>
          <CardDescription fontSize={13} color="green">{`R$ ${getBuyTotal().toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</CardDescription>
          <CardDescription fontSize={13}>
            O boleto tem um prazo máximo de compensação de 2 dias úteis,  más pode acontecer do pagamento
            ser liberado antes. Atente-se a data de validade!
          </CardDescription>
        </Col>
        <Col md={2} xs={12}>
          <Button color="link" className="link-address" onClick={() => history.goBack()}>
            Escolher outro
          </Button>
        </Col>
      </Row>
    )
  }

  const renderCreditCard = () => {
    // let subTotal = 0
    // let quantityTotal = 0
    // products.forEach(value => {
    //   subTotal = subTotal + (value.price * value.Cart.quantity)
    //   quantityTotal = quantityTotal + value.Cart.quantity
    // })
    // let total = subTotal + freights[selectedFreight].value

    return (
      <Row className="items-in-grid">
        <Col md={2} xs={12}>
          <Avatar icon="now-ui-icons shopping_credit-card" background="rgba(211,211,211, 0.5)"
            color="rgba(0, 153, 204, 1)" />
        </Col>
        <Col md={8} xs={12}>
          <CardDescription fontSize={15} marginBottom={2}>
            {`Cartão de crédito - ${card.number.substring(0, 4) + " **** **** ****"}`}
          </CardDescription>
          <CardDescription fontSize={13}>{`1x de R$ ${getBuyTotal().toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</CardDescription>
        </Col>
        <Col md={2} xs={12}>
          <Button color="link" className="link-address" onClick={() => history.goBack()}>
            Escolher outro
          </Button>
        </Col>
      </Row>
    )
  }

  if (!location.state)
    return <Redirect to="/" />

  return (
    <div>
      <Row>
        <Col md={8} xs={12}>
          <CardTitle>É quase seu... Só falta revisar e finalizar a compra</CardTitle>

          <CardDescription marginBottom={2} fontSize={16} color="black">Detalhes do envio</CardDescription>
          {renderAddress()}

          <CardDescription marginBottom={2} fontSize={16} color="black">Você está comprando:</CardDescription>
          {cart.map((product, index) => {
            return (
              <Card key={index}>
                <CardBody>
                  {renderProducts(product)}
                </CardBody>
              </Card>
            )
          })}

          <CardDescription marginBottom={2} fontSize={16} color="black">Detalhes do pagamento</CardDescription>
          <Card>
            <CardBody>
              {payment === "billet" ? renderBillet() : renderCreditCard()}
            </CardBody>
          </Card>

        </Col>
        <Col md={4} xs={12}>
          <OrderResume products={cart} buttonText="Finalizar compra" history={history}
            onClick={() => finallyOrder()} payment={payment} />
        </Col>
      </Row>
    </div>
  )
}
