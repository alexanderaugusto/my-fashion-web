import React, { useState } from "react"
import {
  Card,
  CardBody,
  Row,
  Col,
  CardFooter
} from "reactstrap"
import { useSelector, useDispatch } from "react-redux"
import { Button, CardDescription, Form } from "../../../components"
import { deleteCard } from "../../../redux/actions/cardAction"
import Cards from 'react-credit-cards'

export default function AddressData() {
  const [page, setPage] = useState(1)
  const [cardToEdit, setCardToEdit] = useState(null)

  // Redux
  const { cards } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  function setEditCard(card) {
    setCardToEdit(card)
    setPage(3)
  }

  if (page === 1) {
    return (
      <Card>
        <CardBody>
          <div className="text-left">
            <Button color="link" className="link-address"
              onClick={() => setPage(2)}>+ Adicionar novo cartão</Button>
          </div>
          <Row>
            {cards.map((card, index) => {
              return (
                <Col xl={6} xs={12} key={index}>
                  <Card>
                    <CardBody>
                      <div>
                        <Cards
                          cvc={card.cod}
                          expiry={card.date}
                          preview={true}
                          name={card.name}
                          number={card.number.substring(0, 4) + " **** **** ****"}
                        />
                      </div>
                    </CardBody>
                    <CardFooter>
                      <Row>
                        <Col className="text-right">
                          <Button color="link" className="link-address"
                            onClick={() => setEditCard(card)}>
                            Editar
                          </Button>
                        </Col>
                        <Col className="text-left">
                          <Button color="link" className="link-address"
                            onClick={() => dispatch(deleteCard(card.id))}>
                            Excluir
                          </Button>
                        </Col>
                      </Row>
                    </CardFooter>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </CardBody>
      </Card>
    )
  }

  else if (page === 2) {
    return (
      <Card>
        <CardBody>
          <Row>
            <Col xs={4}>
              <Button
                className="btn-neutral btn-go-back"
                onClick={() => setPage(1)}
              >
                <div>
                  <i className="now-ui-icons arrows-1_minimal-left" />
                  {" "} Voltar
                </div>
              </Button>
            </Col>
            <Col xs={6}>
              <CardDescription fontSize={25}> Inserir novo cartão </CardDescription>
            </Col>
          </Row>

          <Form type="card-insert" onSubmit={() => setPage(1)} />

        </CardBody>
      </Card>
    )
  }

  else if (page === 3) {
    return (
      <Card>
        <CardBody>
          <Row>
            <Col xs={4}>
              <Button
                className="btn-neutral btn-go-back"
                onClick={() => setPage(1)}
              >
                <div>
                  <i className="now-ui-icons arrows-1_minimal-left" />
                  {" "} Voltar
            </div>
              </Button>
            </Col>
            <Col xs={6}>
              <CardDescription fontSize={25}> Editar cartão </CardDescription>
            </Col>
          </Row>

          <Form type="card-edit" card={cardToEdit} onSubmit={() => setPage(1)} />

        </CardBody>
      </Card>
    )
  }
}