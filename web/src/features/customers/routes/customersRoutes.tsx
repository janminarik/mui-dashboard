import { RouteObject } from "react-router-dom";
import { ROUTES } from "../config/routes";
import CustomersPage2 from "../pages/CustomersPage2";
import CustomerDetailPage from "../pages/CustomerDetailPage";
import CustomersPage1 from "../pages/CustomersPage1";
import CustomersPage3 from "../pages/CustomersPage3";

export const customersRoutes: RouteObject[] = [
  {
    //index: true,
    path: ROUTES.CUSTOMERS,
    element: <CustomersPage3 />,
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
