import axios, { AxiosRequestHeaders } from "axios"
import { environment } from "./environments/environment"

let headers: AxiosRequestHeaders = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("authToken")}`
}

const axiosAuth = axios.create({
  baseURL: environment.apiUri,
  headers
})

export default axiosAuth
