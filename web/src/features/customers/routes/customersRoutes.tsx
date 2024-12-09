import { RouteObject } from "react-router-dom";
import { ROUTES } from "../config/routes";
import CustomersPage from "../pages/CustomersPage";

export const customersRoutes: RouteObject[] = [
  {
    //index: true,
    path: ROUTES.CUSTOMERS,
    element: <CustomersPage />,
  },
];
