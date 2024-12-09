import { RouteObject } from "react-router-dom";

import ErrorPage from "../../../shared/pages/ErrorPage";
import NotFoundPage from "../../../shared/pages/NotFoundPage";
import { ROUTES } from "../config/routes";

export const demoRoutes: RouteObject[] = [
  {
    path: ROUTES.ERROR,
    element: <ErrorPage />,
  },
  {
    path: ROUTES.NOTFOUND,
    element: <NotFoundPage />,
  },
];
