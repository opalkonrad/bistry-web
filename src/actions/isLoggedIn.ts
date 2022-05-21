import { IGoogleAuthRes } from "../components/login/googleLogin"
import { IIsLoggedInAction } from "../reducers/isLoggedIn"

const logIn = (response: IGoogleAuthRes) => {
  return {
    type: "LOGIN",
    payload: response
  } as IIsLoggedInAction
}

const logOut = () => {
  return {
    type: "LOGOUT"
  } as IIsLoggedInAction
}

export { logIn, logOut }
