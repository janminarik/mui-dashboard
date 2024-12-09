import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";

import { RootState } from "../../app/store";
import { useAppTheme } from "./useAppTheme";



export enum NavigationPanelState {
    LargeOpen = "LARGE_OPEN",
    LargeClose = "LARGE_CLOSE",
    MediumOrSmallOpen = "MEDIUM_OR_SMALL_OPEN",
    MediumOrSmallClose = "MEDIUM_OR_SMALL_CLOSE",
}


const useNavigationPanelState = (): NavigationPanelState => {
    const theme = useAppTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
    const isOpen = useSelector((state: RootState) => state.navigationPanel.open);
    const [state, setState] = useState<NavigationPanelState>(NavigationPanelState.LargeClose);

    useEffect(() => {
        const currentState = isLarge ? (isOpen ? NavigationPanelState.LargeOpen : NavigationPanelState.LargeClose)
            : (isOpen ? NavigationPanelState.MediumOrSmallOpen : NavigationPanelState.MediumOrSmallClose);

        setState(currentState);
    }, [isOpen, isLarge])

    return state;
}

export default useNavigationPanelState;