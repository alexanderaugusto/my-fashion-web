import React, { useState } from "react"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { CardDescription, Button } from "../../components"
import { useSelector } from "react-redux"
import userRoutes from "../../routes/user"

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import "./Sidebar.css"

export default function UserOptions({ activeRoute, history }) {
  const [toggle, setToggle] = useState(false)

  // Redux
  const { data } = useSelector(state => state.userReducer)

  const componentToggle = (e) => {
    const icon = !toggle ? "text_align-center" : "ui-1_simple-remove"

    return (
      <div className="toggle-container">
        <Nav>
          <NavItem>
            <NavIcon>
              <Button className="icons default-color" icon color="link" onClick={() => setToggle(!toggle)}
                onMouseEnter={() => !toggle ? e.onClick() : null}>
                <i className={"now-ui-icons " + icon} />
              </Button>
            </NavIcon>
            <NavText>
              <CardDescription fontSize={18} color="grey" marginBottom={-30}>Minha Conta</CardDescription>
              <CardDescription fontSize={14} color="grey">{data.name}</CardDescription>
            </NavText>
          </NavItem>
        </Nav>
      </div>
    )
  }

  function isActive(route) { return route === activeRoute }

  return (
    <div className="user-options-main" onMouseLeave={() => setToggle(false)}>
      <SideNav
        id="user-options-sidebar"
        onSelect={(selected) => {
          // Add your code here
        }}
        className="side-nav"
        expanded={toggle}
        onToggle={e => setToggle(e)}
      >
        <Toggle componentClass={componentToggle} />

        <Nav style={{ marginTop: 50 }}>
          {userRoutes.map((page, index) => {
            const { icon, text } = page.sidebar
            const navClass = isActive(page.path) ? "nav-active" : "nav"

            return (
              <NavItem key={index} eventKey={page.path} style={{ backgroundColor: "white" }}
                onClick={() => history.push(page.path)} onMouseEnter={() => !toggle ? setToggle(true) : null}>
                <NavIcon>
                  <i className={`now-ui-icons ${icon} ${navClass}`} style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                  <span className={navClass}>{text}</span>
                </NavText>
              </NavItem>
            )
          })}
          
        </Nav>
      </SideNav>
    </div>
  )
}