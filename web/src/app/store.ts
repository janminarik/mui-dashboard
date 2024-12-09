import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { settingsPanelReducer } from "../features/settings/slices/settingsPanelSlice";
import { uiSettingsReducer } from "../features/settings/slices/uiSettingsSlice";
import { navigationPanelReducer } from "../shared/slices/navigationPanelSlice";
import { userReducer } from "../shared/slices/userSlice";
import { apiCustomers } from "../features/customers";


const rootReducer = combineReducers({
    user: userReducer,
    //perzistentne reduktory
    navigationPanel: navigationPanelReducer,
    settingsPanel: settingsPanelReducer,
    uiSettings: uiSettingsReducer,
    //api
    [apiCustomers.reducerPath]: apiCustomers.reducer,


})

// Spoločná konfigurácia persist pre reduktory 
const persistConfig = {
    key: "root",
    storage,//local storage
    whitelist: ["user", "navigationPanel", "settingsPanel", "uiSettings"]
};

// Aplikácia persistReducer na kombinovaný rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);


// Konfigurácia store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }).concat(apiCustomers.middleware)
});

// Konfigurácia persistoru
export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;