import React, { useState, useEffect } from "react"
import {
  Modal,
  ModalHeader,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap"
import { Form } from "../../components"
import logo from "../../logo.png"

import "./Modal.css"

export default function ModalLoginRegister({ modalOpen, toggleModal, tab, redirect, history }) {
  const [activeTab, setActiveTab] = useState("")

  useEffect(() => {
    setActiveTab(tab)
  }, [tab])
  
  return (
    <div>
      <Modal className="card-plain" isOpen={modalOpen} toggle={() => toggleModal()}>
        <ModalHeader className="justify-content-center" toggle={() => toggleModal()}>
          <div className="header header-primary text-center">
            <div className="logo-container">
              <img src={logo} alt="logo" width="150" height="47" />
            </div>
          </div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTab === 'register' ? 'active nav-color' : ''}
                onClick={() => setActiveTab("register")}
              >
                Criar Conta
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === 'login' ? 'active nav-color' : ''}
                onClick={() => setActiveTab("login")}
              >
                Iniciar Sessão
              </NavLink>
            </NavItem>
          </Nav>
        </ModalHeader>
        <ModalBody>
          <TabContent activeTab={activeTab} className="text-center">
            <TabPane tabId="register">
              <Form type="register" toggleModal={() => toggleModal()} redirect={redirect} history={history}/>
            </TabPane>
            <TabPane tabId="login">
              <Form type="login" toggleModal={() => toggleModal()} redirect={redirect} history={history}/>
            </TabPane>
          </TabContent>
        </ModalBody>
      </Modal>
    </div>
  )
}