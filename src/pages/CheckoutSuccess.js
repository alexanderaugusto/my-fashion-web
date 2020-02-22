import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeCheckoutStep, activeCheckout } from "../redux/actions/checkoutAction"
import { CardTitle, Row, Col } from "reactstrap"
import { Redirect } from "react-router-dom"
import { CardDescription } from "../components"

export default function CheckoutSuccess({ location, match }) {
  const { order_id: orderId } = match.params ? match.params : {}
  const { buy_info: orderItems } = location.state ? location.state : {}

  // Redux
  const { data } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(activeCheckout(true))
    dispatch(changeCheckoutStep(2))

    return () => dispatch(activeCheckout(false))
  }, [dispatch])

  const renderBilletInfo = () => {
    return (
      <div>
        <CardDescription fontSize={20} marginBottom={2}>
          Agora é só pagar o boleto e enviaremos seu pedido o mais rápido possível
        </CardDescription>
        <CardDescription>O pedido será enviado após a confirmação do pagamento </CardDescription>
      </div>
    )
  }

  const renderCardInfo = () => {
    return (
      <div>
        <CardDescription fontSize={20} marginBottom={2}>
          Enviaremos seu pedido o mais rápido possível.
        </CardDescription>
        <CardDescription> Fique atento a sua caixa de email, pois assim que o pagamento cair você receberá informações
          sobre o envio do seu pedido.
        </CardDescription>
      </div>
    )
  }

  if (!location.state || !match.params)
    return <Redirect to="/" />

  return (
    <div>
      <Row>
        <Col md={8} xs={12}>
          <CardTitle style={{ marginBottom: 0 }}>Nº DO PEDIDO: <span className="default-color">{orderId}</span></CardTitle>
          <CardDescription>
            A confirmação foi enviada para {" "}
            <span className="default-color">{data.email}</span>
          </CardDescription>
          {orderItems.payment === "billet" ? renderBilletInfo() : renderCardInfo()}
        </Col>
        <Col md={4} xs={12}>
        </Col>
      </Row>
    </div>
  )
}