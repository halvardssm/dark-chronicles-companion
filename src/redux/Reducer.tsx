import { combineReducers, Reducer } from 'redux'
import { authReducer } from './auth/AuthReducer'

const combinedReducers = combineReducers({
  authReducer,
})

export const reducer: Reducer = (state, action) => {
  return combinedReducers(state, action)
}
