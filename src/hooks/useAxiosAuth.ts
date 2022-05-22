import axios, { AxiosRequestHeaders } from "axios"
import jwt_decode from "jwt-decode"
import { useSelector } from "react-redux"
import environment from "../environments/environment.json"
import { RootState } from "../reducers"

interface IGoogleToken {
  email: string,
  exp: number
}

const useAxiosAuth = () => {
  const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn)

  let headers: AxiosRequestHeaders = {
    "Content-Type": "application/json"
  }

  const axiosAuth = axios.create({
    baseURL: environment.apiUri,
    headers
  })

  axiosAuth.interceptors.request.use(async req => {
    if (isLoggedIn) {
      let token = localStorage.getItem("authToken")

      if (token) {
        const user = jwt_decode<IGoogleToken>(token)

        // token expired
        if (Date.now() > user.exp * 1000 - 1000) {
          // TODO refresh token
        }
      } else {
        // TODO refresh token
      }

      req.headers = req.headers ? {
        ...req.headers,
        "Authorization": `Bearer ${token}`
      } : {
        "Authorization": `Bearer ${token}`
      }
    }

    return req
  })

  return axiosAuth
}

export default useAxiosAuth
