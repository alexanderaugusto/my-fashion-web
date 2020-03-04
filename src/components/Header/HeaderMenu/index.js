import React, { useState, useEffect } from "react"
import HeaderBig from "./HeaderBig"
import HeaderMini from "./HeaderMini"
import { getCategories, getSubcategoires, getBrands } from "../../../redux/actions/appAction"
import { useDispatch } from "react-redux"

import "../Header.css"

export default function HeaderMenu({ history, onBtnClick }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  // Redux
  const dispatch = useDispatch()
  
  // Set screen width
  useEffect(() => {
    function handleResize() {
      const { innerWidth: width } = window;
      setScreenWidth(width)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getSubcategoires())
    dispatch(getBrands())
  }, [dispatch])

  function logout() {
    localStorage.clear()
    history.push("/")
    window.location.reload();
  }

  // when user click in cart or something that need to authentication call this function
  function isOnline(route) {
    if (JSON.parse(localStorage.getItem("user-token"))) {
      redirectToPage(route)
    } else {
      onBtnClick("login", route)
    }
  }

  function redirectToPage(pathname) { history.push(pathname) }

  function search(text) {
    history.push(`/products/${text}`)
    window.location.reload()
  }

  if (screenWidth > 1011)
    return (
      <HeaderBig onBtnClick={(param) => onBtnClick(param)}
        logout={() => logout()}
        isOnline={(route) => isOnline(route)}
        redirectToPage={(pathname) => redirectToPage(pathname)}
        search={(text) => search(text)}
        screenWidth={screenWidth}
      />
    )

  return (
    <HeaderMini onBtnClick={(param) => onBtnClick(param)}
      logout={() => logout()}
      isOnline={(route) => isOnline(route)}
      redirectToPage={(pathname) => redirectToPage(pathname)}
      search={(text) => search(text)}
      screenWidth={screenWidth} />
  )
}
