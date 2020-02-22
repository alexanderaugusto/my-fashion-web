import React, { useState } from "react"
import { categories, subCategories } from "../../constants"
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CardTitle,
  CardHeader,
  CardBody,
  Row,
  Col
} from "reactstrap"
import CardDescription from "../CardElements/CardDescription"

import "./Dropdown.css"

export default function CategoryDropdown() {
  const [dropCategory, setDropCategory] = useState(false)
  const [subCategoryIndex, setSubCategoryIndex] = useState(false)

  function closeMenu() {
    setDropCategory(false)
    setSubCategoryIndex(false)
  }

  return (
    <div>
      <Dropdown isOpen={dropCategory} toggle={() => setDropCategory(prevState => !prevState)}
        style={{ width: "80%" }}>
        <DropdownToggle tag="a" className="button-dropdown nav-link" caret>
          <i className="now-ui-icons text_align-center" style={{ marginRight: 5 }} />
          Categorias
        </DropdownToggle>
        <Row onMouseLeave={() => closeMenu()}>
          <Col>
            <DropdownMenu right>
              {categories.map((value, index) => {
                return (
                  <DropdownItem key={index} onMouseEnter={() => setSubCategoryIndex(index)}>
                    {value}
                  </DropdownItem>
                )
              })}
            </DropdownMenu>
          </Col>
          <Col>
            {subCategoryIndex === false ? null :
              <DropdownMenu className="sub-category-menu">
                <CardHeader>
                  <CardTitle>{subCategories[subCategoryIndex].title}</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    {subCategories[subCategoryIndex].views.map((value, index) => {
                      return (
                        <Col key={index} lg={4} xs={12}>
                          <CardDescription color="black" fontWeight="bold">{value.title}</CardDescription>
                          {value.views.map((value2, index2) => {
                            return (
                              <CardDescription tag="a" href=" #" key={index2}>{value2}</CardDescription>
                            )
                          })}
                        </Col>
                      )
                    })}
                  </Row>
                </CardBody>
              </DropdownMenu>}
          </Col>
        </Row>
      </Dropdown>
    </div>
  )
}