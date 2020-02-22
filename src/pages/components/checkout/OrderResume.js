import React from "react"
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap"
import { CardDescription, Button } from "../../../components"

import "./Cart.css"

export default function OrderResume({ products, buttonText, payment, onClick }) {
  let subTotal = 0
  let quantityTotal = 0
  let freightTotal = 0
  let discountTotal = 0
  products.forEach(value => {
    subTotal = subTotal + (value.price * value.Cart.quantity)
    quantityTotal = quantityTotal + value.Cart.quantity
    freightTotal = freightTotal + parseFloat(value.Cart.freight)
    discountTotal = discountTotal + parseFloat(value.Cart.discount)
  })
  let total = subTotal + freightTotal

  return (
    <div className="container-fixed">
      <Card>
        <CardHeader>
          <CardTitle>Resumo</CardTitle>
        </CardHeader>
        <CardBody>
          <CardDescription fontSize={15}>{`Subtotal (${quantityTotal} produtos):`} <span className="frete-value">
            {`R$ ${subTotal.toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</span>
          </CardDescription>
          <CardDescription fontSize={15}>Envio: <span className="frete-value">
            {`R$ ${freightTotal.toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</span>
          </CardDescription>
          <CardDescription fontSize={15}>Descontos: <span className="frete-value">
            {`R$ ${0.00.toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</span>
          </CardDescription>
          <CardDescription fontSize={15} fontWeight="bold">
            {`Total: R$ ${total.toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
          </CardDescription>
          <div className="text-center">
            {!payment ? null :
              <CardDescription fontSize={15} fontWeight="bold" marginBottom={-20}>
                Você irá pagar com {" "}
                {payment === "billet" ? <span style={{ color: "red" }}>Boleto</span> :
                  <span style={{ color: "red" }}>Cartão</span>}
              </CardDescription>}
          </div>
          {!buttonText ? null :
            <Button
              block
              size="lg"
              color="info"
              className="mb-3 button-buy"
              onClick={() => onClick()}
            >
              {`${buttonText} (${quantityTotal})`}
            </Button>}
        </CardBody>
      </Card>
    </div>
  )
}