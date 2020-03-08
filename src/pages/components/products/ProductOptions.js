import React, { useEffect, useState } from "react"
import { CardTitle, Card, CardBody, CardHeader, ListGroup, ListGroupItem } from "reactstrap"
import { useSelector } from "react-redux"
import { CardDescription } from "../../../components"

import "./products.css"

export default function ProductOptions() {
  const [filteredSubcategories, setFilteredSubcategories] = useState([])
  const [filteredCategory, setFilteredCategory] = useState({})

  // Redux
  const { searchText } = useSelector(state => state.productReducer)
  const { categories, subcategories, brands } = useSelector(state => state.appReducer)

  useEffect(() => {
    if (!categories.every(category => category.name !== searchText)) {
      categories.filter(category => {
        if (category.name === searchText) {
          setFilteredCategory(category)
          setFilteredSubcategories(subcategories.filter(subcategory => subcategory.category_id === category.id))
        }

        return null
      })
    }
    else if (!subcategories.every(subcategory => subcategory.name !== searchText)) {
      subcategories.filter(subcategory => {
        if (subcategory.name === searchText) {
          categories.filter(category => {
            if (category.id === subcategory.category_id) {
              setFilteredCategory(category)
              setFilteredSubcategories(subcategories.filter(subcategory => subcategory.category_id === category.id))
            }

            return null
          })
        }

        return null
      })
    }
  }, [categories, subcategories, searchText])

  return (
    <div>
      {filteredSubcategories.length > 0 &&
        <Card className="card-main">
          <CardHeader>
            <CardTitle>{filteredCategory.name}</CardTitle>
          </CardHeader>
          <CardBody>
            {filteredSubcategories.map(subcategory => {
              return (
                <CardDescription key={subcategory.id} tag="a"
                  href={"/products/" + subcategory.name}>
                  {subcategory.name}
                </CardDescription>
              )
            })}
          </CardBody>
        </Card>
      }

      <Card className="card-main">
        <CardBody>
          {categories.map(category => {
            return (
              <CardDescription key={category.id} tag="a" fontSize={20} href={"/products/" + category.name}
                color="black">
                {category.name}
              </CardDescription>
            )
          })}
        </CardBody>
      </Card>

      <Card className="card-main">
        <CardBody>

        </CardBody>
      </Card>

      <Card className="card-main">
        <CardHeader>
          <CardTitle>Filtrar por marca</CardTitle>
        </CardHeader>
        <CardBody>
          <ListGroup className="list-group-brand">
            {brands.map(brand => {
              return (
                <ListGroupItem key={brand.id}>
                  <CardDescription tag="a" href={"/products/" + brand.name} marginBottom={0}>{brand.name}</CardDescription>
                </ListGroupItem>
              )
            })}
          </ListGroup>
        </CardBody>
      </Card>

    </div>
  )
}