import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { RootState } from "../../app/store";
import Loader from "./Loader";

function ProtectedRoute() {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuth);
  return isAuthenticated ? (
    <Suspense fallback={<Loader message="Loading content..." />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;
