import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { User } from "../../../model/user.model";
import storage from "../storage/storage";

export type CurrentUser = null | User;
export type UserLoading = 'idle' | 'loading' | 'loaded';

interface UserState {
  currentUser: CurrentUser;
  userLoading: UserLoading;
}

const initialState: UserState = {
  currentUser: null as CurrentUser,
  userLoading: 'idle'
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState: (state: UserState, action: PayloadAction<UserState>): void => {
      state.currentUser = action.payload.currentUser;
      state.userLoading = action.payload.userLoading;
    },
    setCurrentUser: (state: UserState, action: PayloadAction<{ currentUser: User }>): void => {
      state.currentUser = action.payload.currentUser
    },
    setUserLoading: (state: UserState, action: PayloadAction<UserState>): void => {
      state.userLoading = action.payload.userLoading
    },
    setUserAddress: (state: UserState, action: PayloadAction<{ address: string }>) => {
      if (state.currentUser)
        state.currentUser = { ...state.currentUser, shippingAddress: action.payload.address }
    }

  }
})

export const userActions = authSlice.actions;

const persistedReducer = persistReducer({
  key: 'user',
  storage
},
  authSlice.reducer
)


export default persistedReducer;