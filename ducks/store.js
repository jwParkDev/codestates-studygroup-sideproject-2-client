import { configureStore } from '@reduxjs/toolkit';
import { userInfoSlice, loginStatusSlice, todoInfoSlice } from './slices';

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice.reducer,
    loginStatus: loginStatusSlice.reducer,
    todoInfo: todoInfoSlice.reducer,
  }
})