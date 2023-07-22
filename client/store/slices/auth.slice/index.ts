import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "../storage/storage";

type StringOrNull = string | null;
export type JWT = StringOrNull

interface AuthState {
    jwt: JWT;
}

const initialState: AuthState = {
    jwt: null as JWT
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setJWT: (state: AuthState, action: PayloadAction<JWT>): void => {
            state.jwt = action.payload;
        }
    }
})

export const authActions = authSlice.actions;

const persistedReducer = persistReducer({
    key: 'auth',
    storage
},
    authSlice.reducer
)

export default persistedReducer;