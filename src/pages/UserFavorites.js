import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUser } from "../redux/actions/userAction"
import { deleteFavoriteItem } from "../redux/actions/favoriteAction"
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap"
import { UserOptions, CardDescription, Button } from "../components"
import api from "../services/api"

export default function UserFavorites({ match, history }) {
  // Redux
  const { favorites } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  useEffect(() => { dispatch(getUser("GET_USER_ORDERS")) }, [dispatch])

  async function removeProduct(product) {
    const { id } = product

    dispatch(deleteFavoriteItem(id))
  }

  return (
    <div>
      <Row>
        <UserOptions activeRoute={match.path} history={history} />

        <Col xs={12} md={9} className="ml-auto mr-auto">
          <CardTitle>Favoritos</CardTitle>

          {favorites.map((product, index) => {
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
                        onClick={() => removeProduct(product, index)}
                        style={{ marginTop: 0 }}>
                        <i className="fas fa-trash-alt" />
                      </Button>
                      <Button
                        block
                        round
                        color="info"
                        className="mb-3 button-login"
                        onClick={() => history.push(`/product/view-${product.id}`)}
                      >
                        Visualizar
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card >
            )
          })}

          {
            favorites.length !== 0 ? null :
              <div className="text-center">
                <CardDescription fontSize={20}> Você não possui nenhum produto marcado como favorito. </CardDescription>
                <Button color="link" className="link-address" onClick={() => history.push("/")}>
                  Ver produtos
                </Button>
              </div>
          }

        </Col>
      </Row>
    </div >
  )
}