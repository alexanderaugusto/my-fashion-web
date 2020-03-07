import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Nav,
  NavItem
} from "reactstrap"
import api from "../../../services/api"
import Magnifier from "react-magnifier"

import "./ProductOverview.css"

export default function ProductView({ product }) {
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    if (product)
      setSelectedItem(product.images[0])
  }, [product])


  const isSelectedItem = (value) => {
    if (selectedItem.id === value.id)
      return "selected-item"

    return ""
  }

  const changeSelectedItem = (value) => setSelectedItem(value)

  if (!selectedItem)
    return null
    
  return (
    <Row>
      <Col md={3} xs={12}>
        <Nav vertical={true}>
          {product.images.map(value => {
            return (
              <NavItem key={value.id} className={"text-center cursor-pointer " + isSelectedItem(value)}
                onMouseEnter={() => changeSelectedItem(value)}
                onClick={() => changeSelectedItem(value)}>
                <img src={api.routes.FILES_URL + value.name} alt={value.name} width="80" height="80" />
              </NavItem>
            )
          })}
        </Nav>
      </Col>
      <Col md="auto" xs={12}>
        <div className="image-viewer text-center">
          {/* <img src={api.routes.FILES_URL + selectedItem.name} alt={selectedItem.name} width="400" height="400" /> */}
          <Magnifier src={api.routes.FILES_URL + selectedItem.name} width={400} height={400}
            zoomFactor={1} mgShape="square" mgBorderWidth={1} mgHeight={200} mgWidth={200} />
        </div>
      </Col>
    </Row>


  )
}
