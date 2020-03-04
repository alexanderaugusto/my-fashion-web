import React, { useEffect } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Row,
  Col
} from "reactstrap"
import { filterProducts } from "../redux/actions/productAction"
import { insertCartItem } from "../redux/actions/cartAction"
import { useSelector, useDispatch } from 'react-redux'
import { CardDescription, Button } from "../components"
import { Sidebar } from "./components"

import api from "../services/api"

export default function Products({ match, history }) {
  // Redux
  const { products, searchText } = useSelector(state => state.productReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    const pathParam = match.params.searchText
    dispatch(filterProducts(pathParam))
  }, [dispatch, match.params.searchText])

  const renderProducts = () => {
    return (
      <div>
        <CardTitle>{`Resultados da busca de "${searchText}"`}</CardTitle>
        <Row>
          {products.map((product) => {
            return (
              <Col key={product.cod} lg={4} xs={12}>
                <Card className="product-item">
                  <CardHeader className="text-center" onClick={() => history.push(`/product/view-${product.id}`)}>
                    <div>
                      <img src={api.routes.FILES_URL + product.images[product.images.length - 1].name} width="auto" height="200" alt={"product" + product.cod} />
                    </div>
                  </CardHeader>
                  <CardBody className="card-body" onClick={() => history.push(`/product/view-${product.id}`)}>
                    <CardTitle className="card-title">
                      {`R$ ${product.price.toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                    </CardTitle>
                    <CardDescription>
                      {product.title.length <= 40 ? product.title : product.title.substring(0, 37) + "..."}
                    </CardDescription>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button className="cart-icon button-animation-grow" icon color="link"
                      onClick={() => dispatch(insertCartItem(product.id))}>
                      <i className="now-ui-icons shopping_cart-simple" />
                    </Button>{" "}
                    <Button className="favourite-icon button-animation-grow" icon color="link">
                      <i className="now-ui-icons ui-2_favourite-28" />
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }

  if (products.length === 0)
    return (
      <div>
        <CardDescription fontSize={25}>
          Nenum resultado encontrado pela pesquisa:
                <span className="search-text-no-product">{" " + searchText}</span>
        </CardDescription>
      </div>)

  return (
    <div>
      <Row>
        <Col md={3} xs={12}>
          <Sidebar />
        </Col>
        <Col md={9} xs={12}>
          {renderProducts()}
        </Col>
      </Row>
    </div>
  )
}