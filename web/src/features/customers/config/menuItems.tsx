import { NavigationMenuItem } from "../../../shared/types/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import { ROUTES } from "./routes";

export const menuItems: NavigationMenuItem[] = [
  {
    kind: "subheader",
    label: "Customers",
  },
  {
    kind: "menuitem",
    label: "Customer",
    icon: <PersonIcon />,
    to: ROUTES.CUSTOMERS,
  },
];
