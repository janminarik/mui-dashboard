import { RouteObject } from "react-router-dom";

import LoginPage from "../pages/LoginPage";

export const ROUTES = {
  LOGIN: "/login",
};

export const authRoutes: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
];
