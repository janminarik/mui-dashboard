import { RouteObject } from "react-router-dom";
import { ROUTES } from "../config/routes";
import CustomersPage from "../pages/CustomersPage";
import CustomerDetailPage from "../pages/CustomerDetailPage";

export const customersRoutes: RouteObject[] = [
  {
    //index: true,
    path: ROUTES.CUSTOMERS,
    element: <CustomersPage />,
  },
  {
    path: "customers/:id",
    element: <CustomerDetailPage />,
  },
];
