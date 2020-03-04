import React, { useState } from "react"
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Row,
  Col,
  Nav,
  NavItem
} from "reactstrap"
import { CardDescription, Avatar } from "../../components"
import { useSelector } from "react-redux"

import "./Dropdown.css"

export default function CategoryDropdown() {
  const [selectedCategory, setSelectedCategory] = useState(1)

  // Redux
  const { categories, subcategories } = useSelector(state => state.appReducer)

  return (
    <div>
      <UncontrolledDropdown>
        <DropdownToggle tag="a" className="button-dropdown nav-link" caret>
          <i className="now-ui-icons text_align-center" style={{ marginRight: 5 }} />
          Categorias
        </DropdownToggle>
        <DropdownMenu style={{ width: "400%" }} className="text-center">
          <Nav>
            {categories.map((category, index) => {
              return (
                <NavItem key={index} className="button-animation-grow"
                  onMouseEnter={() => setSelectedCategory(category.id)}
                  onClick={() => setSelectedCategory(category.id)}>
                  <Avatar key={index} icon={category.image} background={category.background} />
                </NavItem>
              )
            })}
          </Nav>

          <br /> <br />

          <Row>
            {subcategories.map((subCategory, index) => {
              if (subCategory.category_id === selectedCategory)
                return (
                  <Col key={index} lg={4} xs={12}>
                    <CardDescription tag="a" href={"/products/" + subCategory.name} key={index}>{subCategory.name}</CardDescription>
                  </Col>
                )

              return null
            })}
          </Row>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div >
  )
}