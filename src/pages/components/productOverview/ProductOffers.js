import React, { useEffect } from "react"
import {
  CardTitle,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "reactstrap"
import { CardDescription, Button } from "../../../components"
import api from "../../../services/api"
import Carousel from 'react-multi-carousel'
import { useSelector, useDispatch } from "react-redux"
import { getProductOffers } from "../../../redux/actions/productAction"
import { insertFavoriteItem } from "../../../redux/actions/favoriteAction"
import { insertItem } from "../../../redux/actions/cartAction"

import 'react-multi-carousel/lib/styles.css'

// For carousel
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
}

export default function ProductOffers({ currentProduct, history }) {

  // Redux
  const { products } = useSelector(state => state.productReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    function getProducts() {
      dispatch(getProductOffers(currentProduct.category_id, currentProduct.id))
    }

    if (currentProduct !== null)
      getProducts() // Call function
  }, [currentProduct, dispatch])

  return (
    <div>
      <Carousel
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        // infinite={true}
        keyBoardControl={true}
        // customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {products.map((product, index) => {
          return (
            <div key={index}>
              <Card className="product-item">
                <CardHeader className="text-center"
                  onClick={() => {
                    history.push(`/product/view-${product.id}`)
                    window.location.reload()
                  }}>
                  <div>
                    <img src={api.routes.IMAGE_PATH_PRODUCT + product.images[product.images.length - 1].name} width="auto" height="200" alt={"product" + product.cod} />
                  </div>
                </CardHeader>
                <CardBody className="card-body"
                  onClick={() => {
                    history.push(`/product/view-${product.id}`)
                    window.location.reload()
                  }}>
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
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}