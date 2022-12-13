import { configureStore } from '@reduxjs/toolkit';
import { userInfoSlice, loginStatusSlice, todoInfoSlice } from './slices';

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice.reducer,
    loginStatus: loginStatusSlice.reducer,
    todoInfo: todoInfoSlice.reducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {userInfo: userInfoState, loginStatus: loginStatusState, todoInfo: todoInfoState}
export type AppDispatch = typeof store.dispatch