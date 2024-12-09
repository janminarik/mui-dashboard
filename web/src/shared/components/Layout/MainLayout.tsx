import { ElementType, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Container, styled, Theme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { useAppTheme } from "../../hooks/useAppTheme";
import useNavigationPanelResponsiveWidth from "../../hooks/useNavigationPanelResponsiveWidth";
import { NavigationMenuItem } from "../../types/MenuItem";
import Loader from "../Loader";
import { NavigationPanelProps } from "../Navigation/NavigationPanel";

const Offset = styled("div")(({ theme }: { theme: Theme }) => ({
  ...theme.mixins.toolbar,
  height: theme.mixins.toolbar.minHeight,
}));

export interface MainLayoutProps {
  menuItems: NavigationMenuItem[];
  NavigationPanel: ElementType<NavigationPanelProps>;
  Header: ElementType;
  SettingsPanel: ElementType;
}

const sidebarGridSx = {
  flex: 0,
  flexShrink: 0,
  size: { lg: "auto" },
  display: { xs: "none", md: "none", lg: "flex" },
};

function MainLayout({
  menuItems,
  NavigationPanel,
  Header,
  SettingsPanel,
}: MainLayoutProps) {
  const theme = useAppTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const navigationPanelWidth = useNavigationPanelResponsiveWidth();

  return (
    <Container
      component="main"
      role="main"
      maxWidth={false}
      disableGutters
      sx={{
        background: theme.palette.background.default,
        height: "100vh",
      }}
    >
      <Grid
        container
        sx={{
          flex: 1,
          flexDirection: "row",
          background: theme.palette.background.default,
        }}
      >
        {/* NavigationPanel */}
        <Grid
          sx={{
            flex: 0,
            flexShrink: 0,
            size: { lg: "auto" },
            display: { xs: "flex", md: "flex", lg: "flex" },
          }}
        >
          <NavigationPanel menuItems={menuItems} />
        </Grid>

        {/* Header & Content */}
        <Grid
          container
          sx={{
            flex: 1,
            direction: "column",
            marginLeft: isLarge ? `${navigationPanelWidth}px` : 0,
            transition: theme.transitions.create(["margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Grid>
            <Header />
          </Grid>

          {/* Content */}
          {/* bgcolor={theme.palette.background.default} */}
          <Grid sx={{ width: "100%" }}>
            <Offset />
            <Suspense fallback={<Loader message="Loading content..." />}>
              <Outlet />
            </Suspense>
          </Grid>
        </Grid>

        {/* Sidebar */}
        <Grid sx={sidebarGridSx}>
          <SettingsPanel />
        </Grid>
      </Grid>
    </Container>
  );
}

export default MainLayout;
