import { RouteObject } from "react-router-dom";

import ErrorPage from "../../../shared/pages/ErrorPage";
import NotFoundPage from "../../../shared/pages/NotFoundPage";
import { ROUTES } from "../config/routes";

export const demoRoutes: RouteObject[] = [
  {
    element: <ErrorPage />,
    path: ROUTES.ERROR,
  },
  {
    element: <NotFoundPage />,
    path: ROUTES.NOTFOUND,
  },
];
