import React, { useEffect } from "react"
import {
  Card,
  CardHeader,
  Row,
  Col,
  CardTitle
} from "reactstrap"
import { ProductView, ProductInfo, ProductInfoBuy, ProductOffers } from "./components"
import { getProduct } from "../redux/actions/productAction"
import { useSelector, useDispatch } from "react-redux"

import "./stylesheet/Product.css"

export default function Product({ match, history }) {
  // Redux
  const { product } = useSelector(state => state.productReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getProductInfo() {
      dispatch(getProduct(match.params.id))
    }

    getProductInfo() // Call function

  }, [match.params.id, dispatch])


  return (
    <div>
      <Card>
        <CardHeader className="card-header-main">
          {/* <Button
            className="btn-neutral btn-go-back"
            onClick={() => history.goBack()}
          >
            <div>
              <i className="now-ui-icons arrows-1_minimal-left" />
              {" "} Voltar ao início
            </div>
          </Button> */}

          <Row>
            <Col md={7} xs={12} className="text-left">
              <ProductView product={product} />
            </Col>
            <Col md={5} xs={12} className="text-left">
              <ProductInfoBuy product={product} history={history} />
            </Col>
          </Row>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle> Descrição do produto </CardTitle>
          <ProductInfo product={product} history={history} />
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle> Produtos que talvez você tenha interesse </CardTitle>
          <ProductOffers currentProduct={product} history={history} />
        </CardHeader>
      </Card>
    </div>
  )
}