import { configureStore, combineReducers, ThunkAction, Action } from "@reduxjs/toolkit";
import type { Reducer } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import logger from "redux-logger";
import _ from "lodash";
import { batchedSubscribe } from "redux-batched-subscribe";
import { useDispatch } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";

import { apiSlice } from "@api/apiSlice";
import authReducer from "@auth/slices/auth.slice";
import settingsSliceReducer from "@dashboard/pages/Settings/slices/settings.slice";
import preloaderReducer from "@components/preloader/slices/preloader.slice";

const persistConfig = {
  key: "rootApp",
  version: 1,
  storage,
  blacklist: ["auth"],
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  appSettings: settingsSliceReducer,
  auth: authReducer,
  preloader: preloaderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const debounceNotify = _.debounce((notify:any) => notify());

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(apiSlice.middleware)
      // .concat(logger)
      ,
  devTools: process.env.NODE_ENV !== "production",
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers({
      autoBatch: false,
    }).concat(batchedSubscribe(debounceNotify)),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

setupListeners(store.dispatch);

// Additional types for Thunk support
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;