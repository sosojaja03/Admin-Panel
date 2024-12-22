import React, { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UseAuthContext } from "../context/hooks/AuthContextHook";
export const IsUnAuthorisedGuard: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { user } = UseAuthContext();

  if (user) {
    // If user exists, redirect to dashboard
    return <Navigate to="/dashboard/users" />;
  }

  return children || <Outlet />; // Allow access to sign-in page
};

export const IsAuthorisedGuard: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { user } = UseAuthContext();

  if (!user) {
    // If no user, redirect to sign-in
    return <Navigate to="/auth/sign-in" />;
  }

  return children || <Outlet />; // Allow access to protected routes
};
