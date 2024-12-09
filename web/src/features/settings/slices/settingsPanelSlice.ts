import { createSlice } from "@reduxjs/toolkit";

interface SettingsPanelState {
    open: boolean;
}

const initialState: SettingsPanelState = {
    open: false
}

const settingsPanelSlice = createSlice({
    name: "settingsPanel",
    initialState,
    reducers: {
        toggleSettingsPanel(state: SettingsPanelState) {
            state.open = !state.open;
        },
        closeSettingsPanel(state: SettingsPanelState) {
            state.open = false;
        }
    }
});

export const { toggleSettingsPanel, closeSettingsPanel } = settingsPanelSlice.actions;
export const settingsPanelReducer = settingsPanelSlice.reducer;