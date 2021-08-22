import React from "react"
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink
} from "reactstrap"
import { Button, CategoryDropdown, AutoCompleteInput } from "../../../components"
import { autoCompleteSuggestions } from "../../../constants"
import { useSelector } from 'react-redux'
import { Badge } from "@material-ui/core"

import image from "../../../assets/img/default-avatar.png"

export default function HeaderBig({ onBtnClick, logout, isOnline, redirectToPage, search, screenWidth }) {
  // Redux
  const { data: userInfo, mainAddress, favorites, cart } = useSelector(state => state.userReducer)

  const renderUserInfo = () => {
    return (
      <Row>
        {userInfo.id ?
          <Col>
            <UncontrolledDropdown>
              <DropdownToggle tag="a" className="button-dropdown nav-link" caret>
                <img className="user-avatar" style={{ marginRight: 10 }} src={userInfo.image} alt="Avatar" />
                {userInfo.name}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => redirectToPage("/user/my-data")}>Minha conta</DropdownItem>
                <DropdownItem onClick={() => redirectToPage("/user/orders")}>Meus pedidos</DropdownItem>
                <DropdownItem onClick={() => logout()}>Sair</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
          :
          <Col>
            <UncontrolledDropdown>
              <DropdownToggle tag="a" className="button-dropdown nav-link" caret>
                <img className="user-avatar" style={{ marginRight: 10 }} src={image} alt="Avatar" />
                Minha Conta
                </DropdownToggle>
              <DropdownMenu right >
                <DropdownItem header disabled className="text-left"> Bem-vindo a My Fashion </DropdownItem>
                <Row className="text-center">
                  <Col className="ml-auto mr-auto">
                    <Button color="info" onClick={() => onBtnClick("register")}> Cadastrar </Button>
                  </Col>

                  <Col className="ml-auto mr-auto">
                    <Button color="simple" className="btn-simple-info" onClick={() => onBtnClick("login")}> Entrar </Button>
                  </Col>
                </Row>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>}

        <Col>
          <Badge color="primary" style={{ position: "absolute", marginTop: 12, marginLeft: 30, zIndex: 10 }}
            badgeContent={favorites.length} />
          <Button className="icons button-animation-grow" icon color="link"
            onClick={() => isOnline("/user/favorites")}>
            <i className="now-ui-icons ui-2_favourite-28" />
          </Button>

          <Badge color="primary" style={{ position: "absolute", marginTop: 12, marginLeft: 30, zIndex: 10 }}
            badgeContent={cart.length} />
          <Button className="icons button-animation-grow" icon color="link"
            onClick={() => isOnline("/cart")}>
            <i className="now-ui-icons shopping_cart-simple" />
          </Button>
          <Button className="icons button-animation-grow" icon color="link">
            <i className="now-ui-icons ui-1_bell-53" />
          </Button>
        </Col>
      </Row>
    )
  }

  return (
    <div className="header-style">
      <Row>
        <Col xs={12} md={2} className="text-center">
          <Button href="/" style={{ height: "auto", width: "auto" }} icon color="link">
            <img className="logo" src={require("../../../logo.png")} alt="logo" />
          </Button>
        </Col>

        <Col xs={12} md={screenWidth > 1200 ? 6 : 5} className="text-center">
          <AutoCompleteInput
            suggestions={autoCompleteSuggestions}
            handleSearch={(e, text) => search(e, text)}
          />
        </Col>

        <Col xs={12} md="auto" className="text-center">
          {renderUserInfo()}
        </Col>
      </Row>

      <Row noGutters>
        <Col xs={12} md={(screenWidth < 1200) ? 3 : 2} className="text-center">
          {!mainAddress ? null :
            <Nav className="nav-address d-flex justify-content-left">
              <NavItem>
                <Button className="icons button-address" icon color="link">
                  <i className="now-ui-icons location_pin" />
                </Button>
              </NavItem>
              <NavItem>
                <div>
                  <p className="text-cep">{`Enviar para ${mainAddress.zipcode}`}</p>
                  <p className="text-address">{`
                  ${mainAddress.street.length > 18 ? mainAddress.street.substring(0, 16) + "..." : mainAddress.street} 
                  ${mainAddress.number}`}</p>
                </div>
              </NavItem>
            </Nav>}
        </Col>

        <Col xs={12} md="auto" style={{ marginLeft: screenWidth < 1200 ? -50 : "" }}>
          <Nav>
            <NavItem>
              <CategoryDropdown />
            </NavItem>
            <NavItem>
              <NavLink className="button-dropdown">
                Ofertas do dia
            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="button-dropdown">
                Contato
            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="button-dropdown">
                Ajuda
            </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </div >
  )
}
