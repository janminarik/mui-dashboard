import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationPanelMenuState {
    selectedMenuItem: string | null;
    expandedSubMenu: string | null;
}

interface NavigationPanelState {
    open: boolean;
    menuState: NavigationPanelMenuState;
}

const initialState: NavigationPanelState = {
    open: true,
    menuState: {
        selectedMenuItem: null,
        expandedSubMenu: null,
    }
}

const navigationPanelSlice = createSlice({
    name: "navigationPanel",
    initialState,
    reducers: {
        toggleNavigationPanel(state: NavigationPanelState) {
            state.open = !state.open;
        },
        closeNavigationPanel(state: NavigationPanelState) {
            state.open = false;
        },
        setSelectedMenuItem(state: NavigationPanelState, action: PayloadAction<string>) {
            state.menuState.selectedMenuItem = action.payload;
        },
        toggleSubmenu(state: NavigationPanelState, action: PayloadAction<string | null>) {
            state.menuState.expandedSubMenu = action.payload;
        }
    }
})

export const { toggleNavigationPanel,
    closeNavigationPanel,
    setSelectedMenuItem,
    toggleSubmenu } = navigationPanelSlice.actions;

export const navigationPanelReducer = navigationPanelSlice.reducer;