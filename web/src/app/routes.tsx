import { createBrowserRouter, RouteObject } from "react-router-dom";

import { authRoutes } from "../features/auth/routes/authRoutes";
import { menuItems as customersMenuItem } from "../features/customers/config/menuItems";
import { customersRoutes } from "../features/customers/routes/customersRoutes";
import { menuItems as demoMenuItems } from "../features/demo/config/menuItems";
import { demoRoutes } from "../features/demo/routes/demoRoutes";
import { menuItems as muiDemoMenuItems } from "../features/muidemo/config/menuItems";
import { muiDemoRoutes } from "../features/muidemo/routes/muiDemoRoutes";
import SettingsPanel from "../features/settings/components/SettingsPanel";
import Header from "../shared/components/Layout/Header";
import MainLayout from "../shared/components/Layout/MainLayout";
import NavigationPanel from "../shared/components/Navigation/NavigationPanel";
import ProtectedRoute from "../shared/components/ProtectedRoute";
import ErrorPage from "../shared/pages/ErrorPage";
import NotFoundPage from "../shared/pages/NotFoundPage";
import { NavigationMenuItem } from "../shared/types/MenuItem";

const navigationMenuItems: NavigationMenuItem[] = [
  ...muiDemoMenuItems,
  ...demoMenuItems,
  ...customersMenuItem,
];

const dashboardRoutes: RouteObject[] = [
  ...muiDemoRoutes,
  ...demoRoutes,
  ...customersRoutes,
];

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      ...authRoutes,
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: (
              <MainLayout
                menuItems={navigationMenuItems}
                Header={Header}
                NavigationPanel={NavigationPanel}
                SettingsPanel={SettingsPanel}
              />
            ),
            children: [...dashboardRoutes],
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
