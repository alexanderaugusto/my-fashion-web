import React, { useEffect } from "react"
import {
  Card,
  CardHeader,
  Row,
  Col,
  CardTitle
} from "reactstrap"
import { Button } from "../components"
import { ProductView, ProductInfo, ProductInfoBuy, ProductOffers } from "./components"
import { getProductInfo } from "../redux/actions/productAction"
import { useSelector, useDispatch } from "react-redux"

import "./stylesheet/Product.css"

export default function Product({ match, history }) {
  // Redux
  const { product } = useSelector(state => state.productReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getProduct() {
      dispatch(getProductInfo(match.params.id))
    }

    getProduct() // Call function

  }, [match.params.id, dispatch])


  return (
    <div>
      <Card>
        <CardHeader className="card-header-main">
          <Button
            className="btn-neutral btn-go-back"
            onClick={() => history.goBack()}
          >
            <div>
              <i className="now-ui-icons arrows-1_minimal-left" />
              {" "} Voltar ao início
            </div>
          </Button>

          <Row>
            <Col md={6} xs={12} className="text-left">
              <ProductView product={product} />
            </Col>
            <Col className="text-left">
              <Row>
                <Col>
                  <ProductInfo product={product} />
                </Col>
                <Col>
                  <ProductInfoBuy product={product} history={history} />
                </Col>
              </Row>
            </Col>
          </Row>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle> Produtos que talvez te interesse </CardTitle>
          <ProductOffers currentProduct={product} history={history} />
        </CardHeader>
      </Card>
    </div>
  )
}