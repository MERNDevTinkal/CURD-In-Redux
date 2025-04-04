import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../features/curdSlice"

export const store = configureStore({

  reducer: {
    user : userReducer,
  },
  devTools: true,
})