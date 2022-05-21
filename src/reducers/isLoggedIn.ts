import { IGoogleAuthRes } from "../components/login/googleLogin"

export interface IIsLoggedInAction {
  type: string,
  payload: IGoogleAuthRes
}

const isLoggedInReducer = (state = false, action: IIsLoggedInAction) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("authToken", action.payload.credential)
      return true
    case "LOGOUT":
      localStorage.removeItem("authToken")
      return false
    default:
      return state
  }
}

export default isLoggedInReducer
