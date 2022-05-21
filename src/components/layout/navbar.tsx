import { Header } from "antd/lib/layout/layout"
import Menu from "antd/lib/menu"
import React from "react"
import { Link, useLocation } from "react-router-dom"

const items = [
  {
    key: "orders",
    label: (
      <Link to="/orders">Zamówienia</Link>
    )
  },
  {
    key: "menu",
    label: (
      <Link to="/menu">Menu</Link>
    )
  }
]

const Navbar = () => {
  return (
    <>
      <Header>
        <Menu
          selectedKeys={[useLocation().pathname.substring(1)]}
          theme="dark"
          mode="horizontal"
          items={items} />
      </Header>
    </>
  )
}

export default Navbar
