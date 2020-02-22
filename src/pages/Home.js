import React, { useEffect } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  CardFooter
} from "reactstrap"
import api from "../services/api"
import { CardDescription, Button } from "../components"
import { Slide } from 'react-slideshow-image'
import { slideImages } from "../constants"
import { insertItem } from "../redux/actions/cartAction"
import { insertFavoriteItem } from "../redux/actions/favoriteAction"
import { getAllProducts } from "../redux/actions/productAction"
import { useSelector, useDispatch } from "react-redux"

import "./stylesheet/Home.css"

export default function Home({ history }) {
  // Redux
  const { products } = useSelector(state => state.productReducer)
  const dispatch = useDispatch()

  useEffect(() => { dispatch(getAllProducts()) }, [dispatch])

  const renderSlider = () => {
    const properties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      arrows: true,
    }

    return (
      <div className="slide-container">
        <Slide {...properties}>
          {slideImages.map((value, index) => {
            return (
              <div key={index}>
                <img src={value} alt={index} width="100%" height="300px" />
              </div>
            )
          })}
        </Slide>
      </div>
    )
  }

  const renderProducts = () => {
    return (
      <Row>
        {products.map((product) => {
          return (
            <Col key={product.cod} xs={12} sm={6} lg={3}>
              <Card className="product-item">
                <CardHeader className="text-center" onClick={() => history.push(`/product/view-${product.id}`)}>
                  <div>
                    <img src={api.routes.IMAGE_PATH_PRODUCT + product.images[product.images.length - 1].name} width="auto" height="200" alt={"product" + product.cod} />
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
                    onClick={() => dispatch(insertItem(product.id))}>
                    <i className="now-ui-icons shopping_cart-simple" />
                  </Button>{" "}
                  <Button className="favourite-icon button-animation-grow" icon color="link">
                    <i className="now-ui-icons ui-2_favourite-28"
                      onClick={() => dispatch(insertFavoriteItem(product.id))} />
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          )
        })}
      </Row>
    )
  }

  return (
    <div>
      {renderSlider()}
      <CardTitle> Recentes </CardTitle>
      {renderProducts()}
    </div>
  )
}