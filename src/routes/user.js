import UserData from "../pages/UserData"
import UserFavorites from "../pages/UserFavorites"
import UserOrders from "../pages/UserOrders"

export default [
  {
    path: "/user/my-data",
    component: UserData,
    sidebar: {
      icon: "users_single-02",
      text: "Meus dados"
    }
  },
  {
    path: "/user/favorites",
    component: UserFavorites,
    sidebar: {
      icon: "ui-2_favourite-28",
      text: "Favoritos"
    }
  },
  {
    path: "/user/orders",
    component: UserOrders,
    sidebar: {
      icon: "shopping_bag-16",
      text: "Meus pedidos"
    }
  },
]