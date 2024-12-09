import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Language } from "../../../shared/types/Language";
import { ThemeName } from "../../../shared/types/ThemeName";


interface UiSettings {
    theme: ThemeName;
    language: Language | null,
}

const initialState: UiSettings = {
    theme: ThemeName.Dark,
    language: null,
}

const uiSettingsSlice = createSlice({
    name: "uiSettings",
    initialState,
    reducers: {
        setTheme(state: UiSettings, actions: PayloadAction<ThemeName>) {
            state.theme = actions.payload;
        },
        setLanguage(state: UiSettings, actions: PayloadAction<Language>) {
            state.language = actions.payload;
        }
    }
})

export const { setTheme, setLanguage } = uiSettingsSlice.actions;
export const uiSettingsReducer = uiSettingsSlice.reducer;