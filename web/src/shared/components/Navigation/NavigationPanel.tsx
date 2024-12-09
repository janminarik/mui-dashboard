import { useDispatch, useSelector } from "react-redux";
import HiveIcon from "@mui/icons-material/Hive";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";

import { AppDispatch, RootState } from "../../../app/store";
import { useAppTheme } from "../../hooks/useAppTheme";
import useNavigationPanelResponsiveWidth from "../../hooks/useNavigationPanelResponsiveWidth";
import { closeNavigationPanel } from "../../slices/navigationPanelSlice";
import { NavigationMenuItem } from "../../types/MenuItem";
import Sidebar, { SidebarProps } from "../Layout/Sidebar";
import NavigationMenu from "./NavigationMenu";

export interface NavigationPanelProps extends SidebarProps {
  menuItems: NavigationMenuItem[];
}

function AppLogo() {
  const theme = useAppTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const appBarHeight = isMobile
    ? theme.mixins.toolbar?.minHeight || 48
    : theme.mixins.toolbar.minHeight || 64;

  return (
    <Box
      sx={{
        height: appBarHeight,
        display: "flex",
        alignItems: "center",
        my: 1,
      }}
    >
      {/* Temp */}
      <List
        sx={{
          width: "100%",
          overflowX: "hidden",
        }}
        disablePadding
      >
        <ListItemButton>
          <ListItemIcon>
            <HiveIcon
              sx={{
                fontSize: theme.typography.h4.fontSize,
                ml: -0.5,
              }}
            />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ variant: "h5" }}>
            Hive
          </ListItemText>
        </ListItemButton>
      </List>
    </Box>
  );
}

function NavigationPanel({ menuItems, ...rest }: NavigationPanelProps) {
  const open = useSelector((state: RootState) => state.navigationPanel.open);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useAppTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const width = useNavigationPanelResponsiveWidth();

  const handleClose = () => {
    dispatch(closeNavigationPanel());
  };

  return (
    <Sidebar
      mode={isLarge ? "persistent" : "temporary"}
      anchor="left"
      open={isLarge || open}
      onClose={handleClose}
      {...rest}
      content={
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "stretch",
            alignItems: "stretch",
            width: width,
          }}
        >
          <AppLogo />
          <NavigationMenu menuItems={menuItems} />
        </Box>
      }
    ></Sidebar>
  );
}

export default NavigationPanel;
