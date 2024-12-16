import { RouteObject } from "react-router-dom";

import { ROUTES } from "../config/routes";
import CustomerDetailPage from "../pages/CustomerDetailPage";
import CustomersPage2 from "../pages/CustomersPage2";

export const customersRoutes: RouteObject[] = [
  {
    //index: true,
    path: ROUTES.CUSTOMERS,
    element: <CustomersPage2 />,
  },
  {
    path: "customers/:id",
    element: <CustomerDetailPage />,
  },
  {
    path: ROUTES.CUSTOMER_CREATE,
    element: <CustomerDetailPage />,
  },
];
