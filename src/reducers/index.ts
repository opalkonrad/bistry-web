import { combineReducers } from "@reduxjs/toolkit"
import isLoggedInReducer from "./isLoggedIn"

const reducers = combineReducers({
  isLoggedIn: isLoggedInReducer
})

export default reducers
export type RootState = ReturnType<typeof reducers>
