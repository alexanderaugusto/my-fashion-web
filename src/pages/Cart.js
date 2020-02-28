import React, { useEffect, useState } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  CardFooter,
} from "reactstrap"
import api from "../services/api"
import { CardDescription, Button } from "../components"
import * as CartActions from "../redux/actions/cartAction"
import { freightCalculator } from "../redux/actions/productAction"
import { useSelector, useDispatch } from "react-redux"
import { OrderResume, OrderAdresses } from "./components"

import "./stylesheet/Cart.css"

export default function Cart({ history }) {
  // Redux
  const { mainAddress, cart } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  // State
  const [selectedAddress, setSelectedAddress] = useState(mainAddress)
  const [products, setProducts] = useState([])

  useEffect(() => { mainAddress && setSelectedAddress(mainAddress) }, [mainAddress])

  useEffect(() => {
    // Set freight and praze for each product in the cart
    const newProducts = []
    if (selectedAddress) {
      cart.filter(product => {
        dispatch(freightCalculator(selectedAddress.zipcode, product, (data) => {
          newProducts.push({ ...product, Cart: { ...product.Cart, freight: parseFloat(data[0].Valor), praze: parseInt(data[0].PrazoEntrega, 10) } })
          if (newProducts.length === cart.length)
            setProducts(newProducts)
        }))

        return null
      })
    }

  }, [dispatch, selectedAddress, cart])

  function goToCheckout() {
    history.push({
      pathname: "/checkout",
      state: {
        products: products,
        address: selectedAddress,
        freight: "pac"
      }
    })
  }

  async function removeProduct(product) {
    const { id } = product

    dispatch(CartActions.deleteCartItem(id))
  }

  function incrementQuantity(product) {
    const { id } = product
    const { quantity } = product.Cart

    if (quantity < product.quantity) {
      const newQuantity = quantity + 1

      const newProducts = []
      products.filter(value => {
        let newProduct = value
        if (value.id === id) {
          newProduct = { ...value, Cart: { ...value.Cart, quantity: newQuantity } }
        }
        newProducts.push(newProduct)

        return null
      })
      setProducts(newProducts)

      dispatch(CartActions.updateCartItem(id, newQuantity))
    }
  }

  function decrementQuantity(product) {
    const { id } = product
    const { quantity } = product.Cart

    if (quantity > 1) {
      const newQuantity = quantity - 1

      const newProducts = []
      products.filter(value => {
        let newProduct = value
        if (value.id === id) {
          newProduct = { ...value, Cart: { ...value.Cart, quantity: newQuantity } }
        }
        newProducts.push(newProduct)

        return null
      })
      setProducts(newProducts)

      dispatch(CartActions.updateCartItem(id, newQuantity))
    }
  }

  const renderYourProducts = () => {
    return (
      <div>
        {products.map((product, index) => {
          let { quantity, freight, discount } = product.Cart
          const total = ((quantity * product.price) + freight - discount).toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          freight = (parseFloat(freight)).toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          discount = discount ? discount : 0
          discount = (parseFloat(discount)).toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")

          return (
            <Card key={index}>
              <CardBody>
                <Row>
                  <Col xs={3} className="text-center">
                    <img src={api.routes.FILES_URL + product.images[0].name} alt={product.images[0].name} width="100" height="100"
                      className="cursor-pointer" onClick={() => history.push(`/product/view-${product.id}`)} />
                  </Col>
                  <Col xs={6}>
                    <CardTitle className="cursor-pointer" onClick={() => history.push(`/product/view-${product.id}`)}>
                      {product.title}
                    </CardTitle>
                    <CardDescription fontSize={20}>
                      {`R$ ${product.price.toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                    </CardDescription>
                  </Col >
                  <Col xs={3} className="text-right">
                    <Button icon color="link" className="button-remove button-animation-grow"
                      onClick={() => removeProduct(product, index)}>
                      <i className="fas fa-trash-alt" />
                    </Button>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Row>
                  <Col xs={3} className="text-center">
                    <div className="align-grid text-right">
                      <Button round icon color="default"
                        onClick={() => decrementQuantity(product)}>
                        <i className="now-ui-icons ui-1_simple-delete" />
                      </Button>
                      <Button round icon color="link">
                        <CardDescription>{product.Cart.quantity}</CardDescription>
                      </Button>
                      <Button round icon color="default"
                        onClick={() => incrementQuantity(product)}>
                        <i className="now-ui-icons ui-1_simple-add" />
                      </Button>
                    </div>
                  </Col>
                  <Col className="text-right">
                    <div>
                      <CardDescription fontSize={16} marginBottom={2}>Envio: <span>
                        {freight}</span>
                      </CardDescription>
                      <CardDescription fontSize={16} marginBottom={2}>Desconto: <span>
                        {discount}</span>
                      </CardDescription>
                      <CardDescription fontSize={16} fontWeight="bold">Total: <span>
                        {total}</span>
                      </CardDescription>
                    </div>
                  </Col>
                </Row>
              </CardFooter>
            </Card >
          )
        })
        }
        {
          products.length !== 0 ? null :
            <div className="text-center">
              <CardDescription fontSize={20}> Você não possui nenhum produto no carrinho. </CardDescription>
              <Button color="link" className="link-address" onClick={() => history.push("/")}>
                Ver produtos
              </Button>
            </div>
        }
      </div >
    )
  }

  return (
    <div>
      <Row>
        <Col md={8} xs={12}>
          <Row>
            <Card>
              <CardHeader>
                <CardTitle> Informações de envio </CardTitle>
              </CardHeader>
              <CardBody>
                <OrderAdresses selectedAddress={selectedAddress}
                  changeSelectedAddress={(address) => setSelectedAddress(address)} />
              </CardBody>
            </Card>
          </Row>
          <Row>
            <Card>
              <CardHeader>
                <CardTitle> Seus produtos </CardTitle>
              </CardHeader>
              <CardBody>
                {renderYourProducts()}
              </CardBody>
            </Card>
          </Row>
        </Col>
        <Col md={4} xs={12}>
          <OrderResume products={products} buttonText="Comprar" history={history}
            onClick={() => goToCheckout()} />
        </Col>
      </Row>
    </div>
  )
}