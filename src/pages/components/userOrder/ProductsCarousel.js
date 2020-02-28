import React from "react"
import { CardDescription, Button } from "../../../components"
import api from "../../../services/api"
import Carousel from 'react-multi-carousel'
import { CardHeader, CardBody, Row, Col } from "reactstrap"

import "./userOrder.css"
import 'react-multi-carousel/lib/styles.css'

// For carousel
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
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

export default function ProductsCarousel({ products, details }) {

  return (
    <div>
      <Carousel
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style arrow-style"
        itemClass="carousel-item-padding-40-px"
      >
        {products.map((product, index) => {
          return (
            <div key={index}>
              <div>
                <CardHeader className="text-center">
                  <Button href={`/product/view-${product.id}`} style={{ height: "auto", width: "auto" }} icon color="link">
                    <img src={api.routes.FILES_URL + product.images[0].name} width="auto" height="80" alt={"product" + product.cod} />
                  </Button>
                </CardHeader>
                <CardBody>
                  <CardDescription fontSize={15} marginBottom={2}>{product.title}</CardDescription>
                  <CardDescription fontSize={13}>
                    {`${product.buy_quantity}x ${product.buy_quantity === 1 ? "unidade" : "unidades"}`}
                  </CardDescription>
                  <Row>
                    <Col>
                      <CardDescription fontSize={13} color="green">
                        {`R$ ${(product.price).toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                      </CardDescription>
                    </Col>
                    <Col>
                      <Button style={{ marginTop: -8 }} color="link" className="link-address" onClick={() => details(product)}>
                        Ver detalhes
                      </Button>
                    </Col>
                  </Row>

                </CardBody>
                {/* <CardFooter className="text-center">
                  <Button color="link" className="link-address" onClick={() => details(product)}>
                    Ver detalhes
                  </Button>
                </CardFooter> */}
              </div>
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}