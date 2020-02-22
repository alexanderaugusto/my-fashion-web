import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUserInfo } from "../redux/actions/userAction"
import { Card, CardBody, CardTitle, Row, Col, Nav, NavItem } from "reactstrap"
import { UserOptions, CardDescription, Button, Avatar, OrderSteps } from "../components"
import { ProductsCarousel } from "./components"
import { getDate } from "../constants"
import Divider from '@material-ui/core/Divider'
import api from "../services/api"

export default function UserOrders({ match, history }) {
  const [detailProduct, setDetailProduct] = useState(null)

  // Redux
  const { orders } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  useEffect(() => { dispatch(getUserInfo("GET_USER_ORDERS")) }, [dispatch])

  const renderOrders = () => {
    return (
      <>
        <CardTitle>Meus pedidos</CardTitle>
        {orders.map((order, index) => {
          const { total, address, products, payment } = order.buy_info

          return (
            <Card key={index}>
              <CardBody>
                <Row>
                  <Col md={4} xs={12}>
                    <ProductsCarousel products={products}
                      details={(product) => setDetailProduct({ product, address, payment })} />
                  </Col>
                  <Col md={4} xs={12} className="text-center" style={{ alignItems: "center", justifyContent: "center" }}>
                    <Divider orientation="vertical" />
                  </Col>
                  <Col md={4} xs={12}>
                    <CardTitle>Resumo do pedido</CardTitle>
                    <CardDescription marginBottom={2}>
                      Pedido: <span style={{ fontWeight: "bold" }}>{order.id}</span>
                    </CardDescription>
                    <CardDescription marginBottom={2}>
                      Data da compra: <span style={{ fontWeight: "bold" }}>{getDate(order.createdAt)}</span>
                    </CardDescription>
                    <CardDescription>
                      Total: <span style={{ fontWeight: "bold" }}>
                        {"R$ " + total.toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </span>
                    </CardDescription>

                    {/* <CardTitle>Endereço de envio</CardTitle>
                    <CardDescription marginBottom={2}>{address.street + ", " + address.number}</CardDescription>
                    <CardDescription marginBottom={2}>{address.city + " - " + address.state}</CardDescription>
                    <CardDescription marginBottom={2}>{address.zipcode}</CardDescription> */}
                    {/* <Button
                      block
                      round
                      color="info"
                      size="lg"
                      className="mb-3 button-login"
                      onClick={() => setIsDetails(true)}
                    >
                      Ver detalhes
                    </Button> */}
                  </Col>
                </Row>

              </CardBody>
            </Card>
          )
        })}

        {
          orders.length !== 0 ? null :
            <div className="text-center">
              <CardDescription fontSize={20}> Você ainda não realizou nenhuma compra. </CardDescription>
              <Button color="link" className="link-address" onClick={() => history.push("/")}>
                Ver produtos
              </Button>
            </div>
        }
      </>
    )
  }

  const renderDetails = () => {
    const { product, address, payment } = detailProduct
    const subtotal = (product.buy_quantity * product.price).toFixed(2).toString().replace(".", ",")
    const freight = product.buy_freight.toFixed(2).toString().replace(".", ",")
    const discount = product.discount ? product.discount.toFixed(2).toString().replace(".", ",") : "0,00"
    const total = ((product.buy_quantity * product.price) + product.buy_freight - product.discount).toFixed(2).toString().replace(".", ",")

    return (
      <>
        <Row>
          <Col>
            <CardTitle style={{ marginBottom: 0 }}>Detalhes</CardTitle>
          </Col>
          <Col className="text-right">
            <Button
              color="info"
              className="mb-3"
              onClick={() => setDetailProduct(null)}
            >
              Voltar aos pedidos
            </Button>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={8}>
            <Card>
              <CardBody>
                <div className="text-center">
                  <OrderSteps currentStatus={product.status_id} />
                </div>
                <Nav>
                  <NavItem className="cursor-default">
                    <Avatar alt={product.title} type="square" width={120} height="auto"
                      src={api.routes.IMAGE_PATH_PRODUCT + product.images[0].name} />

                    &nbsp; &nbsp; &nbsp; &nbsp;
                  </NavItem>
                  <NavItem className="cursor-default" style={{ flex: 1, alignSelf: "center" }}>
                    <CardDescription fontSize={15}>{product.title}</CardDescription>
                    <CardDescription fontSize={13} marginBottom={2}>
                      <span style={{ fontWeight: "bold" }}>Quantidade: {" "}</span>{`${product.buy_quantity}x ${product.buy_quantity === 1 ? "unidade" : "unidades"}`}
                    </CardDescription>
                    <CardDescription fontSize={13}>
                      <span style={{ fontWeight: "bold" }}>Valor unitário: {" "}</span>{`R$ ${product.price.toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                    </CardDescription>
                  </NavItem>
                </Nav>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card>
              <CardBody style={{ backgroundColor: "rgba(128,128,128, 0.15)"}}>
                <CardTitle>Resumo</CardTitle>

                <CardDescription marginBottom={5} fontWeight="bold" fontSize={16}>Endereço de entrega</CardDescription>
                <CardDescription marginBottom={2} fontSize={15}>{address.street + ", " + address.number}</CardDescription>
                <CardDescription marginBottom={2} fontSize={15}>{address.city + " - " + address.state}</CardDescription>
                <CardDescription fontSize={15}>{address.zipcode}</CardDescription>

                <CardDescription marginBottom={5} fontWeight="bold" fontSize={16}>Forma de Pagamento</CardDescription>
                <Nav>
                  <NavItem>
                    <i className={payment.type === "billet" ? "fas fa-barcode" : "now-ui-icons shopping_credit-card"} />
                  </NavItem>
                  &nbsp; &nbsp;
                  <NavItem>
                    <CardDescription fontSize={15}>{payment.type === "billet" ? "Boleto bancário" : "Cartão de crédito"}</CardDescription>
                  </NavItem>
                </Nav>

                <CardDescription marginBottom={5} fontWeight="bold" fontSize={16}>Total dos produtos</CardDescription>
                <Row>
                  <Col>
                    <CardDescription marginBottom={2} fontSize={15}>Subtotal: </CardDescription>
                  </Col>
                  <Col className="text-right">
                    <CardDescription marginBottom={2} fontSize={15}>
                      {`R$ ${subtotal}`}
                    </CardDescription>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <CardDescription marginBottom={2} fontSize={15}>Envio: </CardDescription>
                  </Col>
                  <Col className="text-right">
                    <CardDescription marginBottom={2} fontSize={15}>
                      {`R$ ${freight}`}
                    </CardDescription>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <CardDescription marginBottom={2} fontSize={15}>Descontos: </CardDescription>
                  </Col>
                  <Col className="text-right">
                    <CardDescription marginBottom={2} fontSize={15}>
                      {`R$ ${discount}`}
                    </CardDescription>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <CardDescription marginBottom={2} fontSize={15} color="black" fontWeight="bold">Total: </CardDescription>
                  </Col>
                  <Col className="text-right">
                    <CardDescription marginBottom={2} fontSize={15} color="black" fontWeight="bold">
                      {`R$ ${total}`}
                    </CardDescription>
                  </Col>
                </Row>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }

  return (
    <div>
      <Row>
        <UserOptions activeRoute={match.path} history={history} />

        <Col xs={12} md={9} className="ml-auto mr-auto">
          {!detailProduct ? renderOrders() : renderDetails()}
        </Col>
      </Row>
    </div>
  )

}