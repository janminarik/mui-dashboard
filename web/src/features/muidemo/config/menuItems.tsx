import DashboardIcon from "@mui/icons-material/Dashboard";

import { NavigationMenuItem } from "../../../shared/types/MenuItem";
import { ROUTES } from "./routes";

export const menuItems: NavigationMenuItem[] = [
  {
    kind: "subheader",
    label: "Material UI Demo",
  },
  {
    kind: "menuitem",
    label: "MUI",
    icon: <DashboardIcon />,
    to: "/",
  },
  {
    kind: "menuitem",
    label: "MUI Lazy",
    icon: <DashboardIcon />,
    to: ROUTES.MUI_LAZY_DEMO,
  },
];
