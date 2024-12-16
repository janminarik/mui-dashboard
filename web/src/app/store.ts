import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { apiCustomers } from "../features/customers";
import { customersReducer } from "../features/customers/slices/customersSliceV2";
import { settingsPanelReducer } from "../features/settings/slices/settingsPanelSlice";
import { uiSettingsReducer } from "../features/settings/slices/uiSettingsSlice";
import { navigationPanelReducer } from "../shared/slices/navigationPanelSlice";
import { userReducer } from "../shared/slices/userSlice";

const rootReducer = combineReducers({
  //api
  [apiCustomers.reducerPath]: apiCustomers.baseApi.reducer,
  customersList: customersReducer,
  //perzistentne reduktory
  navigationPanel: navigationPanelReducer,
  settingsPanel: settingsPanelReducer,
  uiSettings: uiSettingsReducer,
  user: userReducer,
  // [apiCustomers.reducerPath]: apiCustomers.reducer,
});

// Spoločná konfigurácia persist pre reduktory
const persistConfig = {
  key: "root",
  storage, //local storage
  whitelist: ["user", "navigationPanel", "settingsPanel", "uiSettings"],
};

// Aplikácia persistReducer na kombinovaný rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Konfigurácia store
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat([apiCustomers.baseApi.middleware]),
  reducer: persistedReducer,
  // }).concat([apiCustomers.middleware])
});

// Konfigurácia persistoru
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
