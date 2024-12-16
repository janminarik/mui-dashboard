import WebIcon from "@mui/icons-material/Web";

import { NavigationMenuItem } from "../../../shared/types/commonTypes";
import { ROUTES } from "./routes";

export const menuItems: NavigationMenuItem[] = [
  {
    kind: "subheader",
    label: "Application",
  },
  {
    kind: "menuitem",
    label: "Pages",
    icon: <WebIcon />,
    subMenu: [
      { kind: "menuitem", label: "505", to: ROUTES.ERROR },
      { kind: "menuitem", label: "404", to: ROUTES.NOTFOUND },
    ],
  },
];
