import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
 } from "react-router-dom";
import SignInPage from "../Pages/SignInPage/SignInPageView/SignInPage";
import { IsUnAuthorisedGuard } from "../RouteGuard";
import { ADMIN_ROUTES } from "./Auth";
import { AuthLayout } from "../Layout/Layout";

const queryClient = new QueryClient();

export const AppRoutes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />

          {/* Authentication Routes */}
          <Route
            path="/auth"
            element={
              <IsUnAuthorisedGuard>
                <AuthLayout />
              </IsUnAuthorisedGuard>
            }
          >
            <Route path="sign-in" element={<SignInPage />} />
          </Route>

          {/* Admin Routes */}
          {ADMIN_ROUTES}

          {/* Not Found */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
