import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap'
import { Button, AutoCompleteInput } from "../../../components"
import { autoCompleteSuggestions } from "../../../constants"
import { useSelector } from 'react-redux'
import { Badge } from "@material-ui/core"

import image from "../../../assets/img/default-avatar.png"

export default function HeaderMini({ onBtnClick, logout, isOnline, redirectToPage, search, screenWidth }) {
  const [collapsed, setCollapsed] = useState(true);

  // Redux
  const { data: userInfo, favorites, cart } = useSelector(state => state.userReducer)

  const toggleNavbar = () => setCollapsed(!collapsed);

  const renderUserInfo = () => {
    return (
      <Row noGutters>
        {screenWidth <= 540 ? null :
          <>
            <Col>
              <Badge color="primary" style={{ position: "absolute", marginTop: 12, marginLeft: 30, zIndex: 10 }}
                badgeContent={favorites.length} />
              <Button className="icons button-animation-grow" icon color="link"
                onClick={() => isOnline("/user/favorites")}>
                <i className="now-ui-icons ui-2_favourite-28" />
              </Button>
            </Col>
            <Col>
              <Badge color="primary" style={{ position: "absolute", marginTop: 12, marginLeft: 30, zIndex: 10 }}
                badgeContent={cart.length} />
              <Button className="icons button-animation-grow" icon color="link"
                onClick={() => isOnline("/cart")}>
                <i className="now-ui-icons shopping_cart-simple" />
              </Button>
            </Col>
            <Col>
              <Button className="icons button-animation-grow" icon color="link">
                <i className="now-ui-icons ui-1_bell-53" />
              </Button>
            </Col>
          </>}

        &nbsp; &nbsp; &nbsp; &nbsp;

        {userInfo.id ?
          <Col>
            <UncontrolledDropdown>
              <DropdownToggle tag="a" className="button-dropdown-mini">
                <img className="user-avatar-mini" src={userInfo.image} alt="Avatar" />
              </DropdownToggle>
              <DropdownMenu right style={{ background: "white" }}>
                <DropdownItem onClick={() => redirectToPage("/user/my-data")}>Minha conta</DropdownItem>
                <DropdownItem onClick={() => redirectToPage("/user/orders")}>Meus pedidos</DropdownItem>
                {screenWidth > 540 ? null :
                  <>
                    <DropdownItem onClick={() => redirectToPage("/cart")}>Meu carrinho</DropdownItem>
                    <DropdownItem onClick={() => redirectToPage("/user/favorites")}>Favoritos</DropdownItem>
                  </>}
                <DropdownItem onClick={() => logout()}>Sair</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
          :
          <Col>
            <UncontrolledDropdown>
              <DropdownToggle tag="a" className="button-dropdown-mini">
                <img className="user-avatar-mini" src={image} alt="Avatar" />
              </DropdownToggle>
              <DropdownMenu right style={{ background: "white" }}>
                <DropdownItem header disabled className="text-left"> Bem-vindo a Central Modas </DropdownItem>
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
      </Row>
    )
  }

  const renderUserOptions = () => {
    return (
      <Nav navbar>
        <NavItem>
          <NavLink className="button-dropdown-mini" href="/">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="button-dropdown-mini">
            Ofertas do dia
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="button-dropdown-mini">
            Contato
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="button-dropdown-mini">
            Ajuda
          </NavLink>
        </NavItem>
      </Nav>
    )
  }

  return (
    <div>
      <Navbar className="header-style">
        <Button onClick={toggleNavbar} className="icons button-animation-grow" icon color="link">
          <i className="now-ui-icons text_align-center" />
        </Button>

        {screenWidth < 800 ? null : <> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </>}


        <Col className="mr-2">
          <AutoCompleteInput
            suggestions={autoCompleteSuggestions}
            handleSearch={(e, text) => search(e, text)}
          />
        </Col>

        {screenWidth < 800 ? null : <> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </>}

        <div>
          {renderUserInfo()}
        </div>

        <Collapse isOpen={!collapsed} navbar>
          {renderUserOptions()}
        </Collapse>
      </Navbar>
    </div>
  )
}