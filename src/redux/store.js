import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/reducer/auth'

export default configureStore({
  reducer: {
    auth: authReducer,
  },
})