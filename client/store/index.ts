import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import authReducer from './slices/auth.slice/index';
import userReducer from './slices/user.slice/index'
import bagReducer from './slices/bag.slice/index';
import adminReducer from './slices/admin.slice'
import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    bag: bagReducer,
    admin: adminReducer
  },
  middleware: (getDefaultMiddleware): MiddlewareArray<[any]> => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})

export default store;

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;