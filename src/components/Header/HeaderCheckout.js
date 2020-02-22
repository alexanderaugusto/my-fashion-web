import React from "react"
import {
  Row,
  Col,
} from "reactstrap"
import { CheckoutSteps, Button } from "../../components"
import { useSelector } from "react-redux"

export default function HeaderMenu({ history }) {
  // Redux
  const { checkoutStep } = useSelector(state => state.checkoutReducer)

  return (
    <div className="header-checkout-style">
      <Row>
        <Col md={2} xs={12} className="text-center align-icon-middle">
          <Button href="/" style={{ height: "auto", width: "auto" }} icon color="link">
            <img className="logo" src={require("../../logo.png")} alt="logo" />
          </Button>
        </Col>
        <Col md={8} xs={12} className="text-left">
          <CheckoutSteps step={checkoutStep} />
        </Col>
      </Row>
    </div>
  )
}
