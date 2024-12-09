
import { useEffect, useState } from "react";

import { useAppTheme } from "./useAppTheme";
import useNavigationPanelState, { NavigationPanelState } from "./useNavigationPanelState";


const useNavigationPanelResponsiveWidth = (): number | null => {
    const theme = useAppTheme();
    const state = useNavigationPanelState();
    const [width, setWidth] = useState<number | null>(null);

    useEffect(() => {
        switch (state) {
            case NavigationPanelState.LargeOpen:
                setWidth(theme.custom.navigationPanelWidth ?? null);
                break;
            case NavigationPanelState.LargeClose:
                setWidth(theme.custom.closeNavigationPanelWidth ?? null);
                break;
            case NavigationPanelState.MediumOrSmallOpen:
                setWidth(theme.custom.navigationPanelWidth ?? null);
                break;
            case NavigationPanelState.MediumOrSmallClose:
                setWidth(null);
                break;
            default:
                break;
        }
    }, [state, theme.custom.navigationPanelWidth, theme.custom.closeNavigationPanelWidth])

    return width;
}

export default useNavigationPanelResponsiveWidth;

