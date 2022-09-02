import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/reducer/auth'
import cartReducer from '../redux/reducer/cart'

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer, 
  },
})