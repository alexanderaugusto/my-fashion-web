import React from "react"
import {
  CardTitle
} from "reactstrap"
import StarRatings from 'react-star-ratings'
import { Button, CardDescription } from "../../../components"

export default function ProductInfo({ product }) {
  if (!product)
    return null
  return (
    <div>
      <CardTitle>{product.title}</CardTitle>
      <StarRatings
        rating={2.67}
        starRatedColor="#FFD700"
        starSpacing="2px"
        // changeRating={this.changeRating}
        numberOfStars={5}
        name='rating'
        starDimension="20px"
      />
      <Button
        className="btn-neutral start-rating-text"
        color="default"
      >
        {`${"74"} avaliações`}
      </Button>
      <CardDescription>
        A Bola de Society Penalty 8 IX, a primeira bola de futebol do mundo com oito gomos, chega em sua mais 
        nova versão para rolar nos gramados sintéticos, e ajudar o seu time a chegar
      </CardDescription>
    </div>
  )
}