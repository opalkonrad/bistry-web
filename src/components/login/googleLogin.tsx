import { Layout } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { logIn } from "../../actions/isLoggedIn"
import { environment } from "../../environments/environment"
import useScript from "../../hooks/useScript"
import { RootState } from "../../reducers"
import "./googleLogin.css"

declare const window: Window &
  typeof globalThis & {
    google: any
  }

export interface IGoogleAuthRes {
  clientId: string,
  credential: string,
  selectedBy: string
}

export const GoogleLogin = () => {
  const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn)
  const dispatch = useDispatch()

  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id: environment.googleOAuthClientId,
      callback: (res: IGoogleAuthRes) => {
        dispatch(logIn(res))
      }
    })
    if (!isLoggedIn) {
      window.google.accounts.id.prompt()
    }
  })

  return (
    <>
      <Layout>
        <div className="welcomeText">
          {!isLoggedIn ? (
            <>
              <h1>Welcome to Bistry Admin Panel!</h1>
              <h4>In order to use the administration panel, you must first log in.</h4>
            </>
          ) : (
            <h1>Hello Admin!</h1>
          )}
        </div>
      </Layout>
    </>
  )
}
