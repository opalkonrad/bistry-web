import { useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Navbar from "./components/layout/navbar"
import { Login } from "./pages/Login"
import { Menu } from "./pages/Menu"
import { Orders } from "./pages/Orders"
import { RootState } from "./reducers"

export const App = () => {
  const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn)

  return (
    <>
      <BrowserRouter>
        {isLoggedIn && <Navbar /> }
        <Routes>
          <Route path="/" element={<Login />} />
          {isLoggedIn && <Route path="/orders" element={<Orders />} />}
          {isLoggedIn && <Route path="/menu" element={<Menu />} />}
        </Routes>
      </BrowserRouter>
    </>
  )
}
