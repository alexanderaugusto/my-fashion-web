import Home from "../pages/Home"
import ProductOverview from "../pages/ProductOverview"
import Cart from "../pages/Cart"
import Products from "../pages/Products"
import Checkout from "../pages/Checkout"
import CheckoutConfirm from "../pages/CheckoutConfirm"
import CheckoutSuccess from "../pages/CheckoutSuccess"

export default [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/product/view-:id",
    component: ProductOverview,
  },
  {
    path: "/cart",
    component: Cart
  },
  {
    path: "/products/:searchText",
    component: Products
  },
  {
    path: "/checkout",
    component: Checkout,
    exact: true
  },
  {
    path: "/checkout/confirm",
    component: CheckoutConfirm,
    exact: true
  },
  {
    path: "/checkout/confirm/:order_id",
    component: CheckoutSuccess
  }
]