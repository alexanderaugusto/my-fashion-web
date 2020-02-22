import { getDayAndMonth, inputValidation, getDate } from "./functions"

const categories = [
  "Beleza",
  "Calçados",
  "Equipamentos",
  "Esporte e Lazer",
  "Infantil",
  "Moda",
  "Roupas",
]

const subCategories = [
  {
    title: "Beleza",
    views: [

    ]
  },
  {
    title: "Calçados",
    views: [
      {
        title: "Tipo",
        views: [
          "Botas",
          "Chinelos",
          "Chuteira",
          "Sandálias",
          "Sapatilhas",
          "Sapatênis",
          "Tênis"
        ]
      },
      {
        title: "Gênero",
        views: [
          "Masculino",
          "Feminino",
          "Unisex"
        ]
      },
      {
        title: "Marcas",
        views: [
          "Mizuno",
          "Mormaii",
          "Nike",
          "Olimpikus",
        ]
      }
    ]
  },
  {
    title: "Equipamentos",
    views: [

    ]
  },
  {
    title: "Esporte e Lazer",
    views: [

    ]
  },
  {
    title: "Infantil",
    views: [

    ]
  },
  {
    title: "Moda",
    views: [

    ]
  },
  {
    title: "Roupas",
    views: [

    ]
  }
]

const autoCompleteSuggestions = [
  "Tênis",
  "Camiseta",
  "Tênis Masculino",
  "Tênis Feminino",
  "Nike",
  "Mizuno",
  "Camisa",
  "Tênis nike",
  "Sapatenis",
  "Sandalia"
]

const slideImages = [
  require("../assets/img/slide/img1.jpg"),
  require("../assets/img/slide/img2.jpg"),
  require("../assets/img/slide/img3.jpg")
]

export {
  categories,
  subCategories,
  slideImages,
  getDayAndMonth,
  inputValidation,
  autoCompleteSuggestions,
  getDate
}