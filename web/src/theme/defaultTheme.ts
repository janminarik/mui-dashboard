import { createTheme, Theme } from "@mui/material";

import { ThemeName } from "../shared/types/ThemeName";
import { CustomThemeAttributes } from "./customThemeAttributes";


declare module "@mui/material/styles" {
    interface Theme {
        custom: CustomThemeAttributes;
    }

    // Umožňuje získať prístup k vlastným hodnotám pri použití `theme.palette`.
    interface ThemeOptions {
        custom?: {
            navigationPanelWidth?: number;
            closeNavigationPanelWidth?: number;
            settingsPanelWidth?: number;
        };
    }
}


export const getTheme = (mode: ThemeName): Theme => {
    return createTheme({
        palette: {
            mode: mode
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        margin: 0,
                        padding: 0
                    },
                    "*": {
                        boxSizing: "border-box"
                    }
                }
            },
            MuiContainer: {
                styleOverrides: {
                    root: {
                    }
                }
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        ...(mode === "light") && { background: "#fff" }
                    }
                }
            },
            MuiTypography: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        color: theme.palette.text.primary
                    })
                }
            },
            MuiSvgIcon: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        color: theme.palette.mode === "light" ? "#545454" : "inherit"
                    })
                }
            }
        },
        custom: {
            navigationPanelWidth: 250,
            closeNavigationPanelWidth: 60,
            settingsPanelWidth: 350,
        }
    })
}