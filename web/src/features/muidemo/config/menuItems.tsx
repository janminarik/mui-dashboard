import DashboardIcon from "@mui/icons-material/Dashboard";

import { ROUTES } from "./routes";
import { NavigationMenuItem } from "../../../shared/types/commonTypes";

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
