import AdminLayout from "@/assets/components/Layout/admin/AdminLayout";
import { IsAuthorisedGuard } from "@/assets/components/RouteGuard";
import { lazy, Suspense } from "react";
import { Navigate, Route } from "react-router-dom";
import { ADMIN_PATHS } from "../index.enum";

const UsersListView = lazy(
  () => import("@/assets/components/AdminPanel/AdminPages/Users/View/List"),
);
const UserCreateView = lazy(
  () => import("@/assets/components/AdminPanel/AdminPages/Users/View/Create"),
);
const UserUpdateView = lazy(
  () => import("@/assets/components/AdminPanel/AdminPages/Users/View/Update"),
);

export const USER_ROUTES = [
  <Route
    path="/dashboard"
    element={
      <IsAuthorisedGuard>
        <AdminLayout />
      </IsAuthorisedGuard>
    }
  >
    {/* Define each route explicitly */}
    <Route index element={<Navigate to="users" replace />} />
    <Route
      path={ADMIN_PATHS.USER_LIST}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <UsersListView />
        </Suspense>
      }
    />
    <Route
      path={ADMIN_PATHS.USER_CREATE}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <UserCreateView />
        </Suspense>
      }
    />
    <Route
      path={ADMIN_PATHS.USER_UPDATE + "/:id"}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <UserUpdateView />
        </Suspense>
      }
    />
  </Route>,
];
