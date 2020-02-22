import React from "react"
import {
  CardTitle,
  Row,
  Col,
} from "reactstrap"
import { AddressData, PersonalData, AccountData, CardData } from "./components"
import { UserOptions } from "../components"

import "./stylesheet/UserData.css"

export default function UserData({ match, history }) {

  return (
    <div>
      <Row>
        <UserOptions activeRoute={match.path} history={history} />

        <Col xs={12} md={8} className="ml-auto mr-auto">
          <div className="text-center">
            <CardTitle> Meus Dados </CardTitle>
          </div>

          <CardTitle> Dados da Conta </CardTitle>
          <AccountData />

          <CardTitle> Dados Pessoais </CardTitle>
          <PersonalData />

          <CardTitle> Seus Endereços </CardTitle>
          <AddressData />

          <CardTitle> Seus Cartões </CardTitle>
          <CardData />
        </Col>
      </Row>
    </div>
  )
}
