import React, { useState, useEffect } from "react"
import { Route, Switch } from "react-router-dom"
import { HeaderMenu, HeaderCheckout, ModalLoginRegister, ScreenLoader, Alert } from "../components"
import { useSelector, useDispatch } from "react-redux"
import { getUser } from "../redux/actions/userAction"

import routes from "../routes"

import "./pages.css"

export default function PagesLayout({ history, match }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [tab, setTab] = useState("")
  const [redirect, setRedirect] = useState("")

  // Redux
  const { isCheckout } = useSelector(state => state.checkoutReducer)
  const { loading, alert } = useSelector(state => state.appReducer)
  const dispatch = useDispatch()

  useEffect(() => { dispatch(getUser()) }, [dispatch])

  useEffect(() => {
    const userSidebar = document.getElementById("user-options-sidebar")

    if (userSidebar) {
      window.addEventListener("scroll", () => {
        if (window.pageYOffset <= 138) {
          userSidebar.style.marginTop = 138 - window.pageYOffset + "px"
        } else {
          userSidebar.style.marginTop = "0px"
        }
      }, false)
    }else{
      window.removeEventListener("scroll", () => null, false)
    }
  })

  // Toggle modal of register and login
  function toggleModal(tab, redirect) {
    setModalOpen(!modalOpen)
    setTab(tab)
    setRedirect(redirect)
  }

  return (
    <div>
      {!isCheckout ?
        <HeaderMenu history={history} onBtnClick={(tab, redirect) => toggleModal(tab, redirect)} />
        :
        <HeaderCheckout history={history} />
      }

      <ModalLoginRegister modalOpen={modalOpen} toggleModal={() => toggleModal()} tab={tab} redirect={redirect} history={history} />

      <ScreenLoader isLoading={loading} />

      {!alert.open ? null : <Alert isOpen={alert.open} type={alert.type} message={alert.message} />}

      <div className="pages-body">
        <Switch>
          {routes.map((prop, key) => {
            return (
              <Route
                path={prop.path}
                component={prop.component}
                exact={prop.exact}
                key={key}
              />
            )
          })}
        </Switch>
      </div>
    </div>
  )
}