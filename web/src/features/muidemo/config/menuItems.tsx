import DashboardIcon from "@mui/icons-material/Dashboard";

import { NavigationMenuItem } from "../../../shared/types/commonTypes";
import { ROUTES } from "./routes";

export const menuItems: NavigationMenuItem[] = [
  {
    kind: "subheader",
    label: "Material UI Demo",
  },
  {
    icon: <DashboardIcon />,
    kind: "menuitem",
    label: "MUI",
    to: "/",
  },
  {
    icon: <DashboardIcon />,
    kind: "menuitem",
    label: "MUI Lazy",
    to: ROUTES.MUI_LAZY_DEMO,
  },
];
