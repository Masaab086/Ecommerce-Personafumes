import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { Admin } from "model/admin.modal";
import storage from "../storage/storage";

export type CurrentAdmin = null | Admin;
export type UserLoading = 'idle' | 'loading' | 'loaded';

interface AdminState {
  currentAdmin: CurrentAdmin;
  userLoading: UserLoading;
}

const initialState: AdminState = {
  currentAdmin: null as CurrentAdmin,
  userLoading: 'idle'
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState: (state: AdminState, action: PayloadAction<AdminState>): void => {
      state.currentAdmin = action.payload.currentAdmin;
      state.userLoading = action.payload.userLoading;
    },
    setCurrentUser: (state: AdminState, action: PayloadAction<{ currentAdmin: CurrentAdmin }>): void => {
      state.currentAdmin = action.payload.currentAdmin
    },
    setUserLoading: (state: AdminState, action: PayloadAction<AdminState>): void => {
      state.userLoading = action.payload.userLoading
    }
  }
})

export const adminActions = authSlice.actions;

const persistedReducer = persistReducer({
  key: 'admin',
  storage
},
  authSlice.reducer
)


export default persistedReducer;