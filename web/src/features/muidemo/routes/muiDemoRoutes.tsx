import React from "react";
import { RouteObject } from "react-router-dom";

import ErrorBoundary from "../../../shared/components/ErrorBoundary";
import SuspenseWrapper from "../../../shared/components/SuspenseWrapper";
import ErrorPage from "../../../shared/pages/ErrorPage";
import { ROUTES } from "../config/routes";
import DemoMUIPage from "../pages/DemoMUIPage";

const LazyDemoPage = React.lazy(() => import("../pages/DemoLazyPage"));

export const muiDemoRoutes: RouteObject[] = [
  {
    element: <DemoMUIPage />,
    index: true,
  },
  {
    element: (
      <ErrorBoundary fallback={<ErrorPage />}>
        <SuspenseWrapper>
          <LazyDemoPage />
        </SuspenseWrapper>
      </ErrorBoundary>
    ),
    path: ROUTES.MUI_LAZY_DEMO,
  },
];
