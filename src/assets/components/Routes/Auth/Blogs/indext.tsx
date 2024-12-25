import AdminLayout from "@/assets/components/Layout/admin/AdminLayout";
import { IsAuthorisedGuard } from "@/assets/components/RouteGuard";
import { lazy, Suspense } from "react";
import { Navigate, Route } from "react-router-dom";
import { ADMIN_PATHS } from "../index.enum";

const BlogView = lazy(
  () =>
    import(
      "@/assets/components/AdminPanel/AdminPages/Blogs/Components/ListBlog/Blog"
    ),
);
const CreateBlogForm = lazy(
  () =>
    import(
      "@/assets/components/AdminPanel/AdminPages/Blogs/Components/CreateBlog/CreateBlog"
    ),
);
const BlogUpdateView = lazy(
  () => import("@/assets/components/AdminPanel/AdminPages/Blogs/View/Update"),
);

export const BLOGS_ROUTES = [
  <Route
    path="/dashboard"
    element={
      <IsAuthorisedGuard>
        <AdminLayout />
      </IsAuthorisedGuard>
    }
  >
    {/* Define each route explicitly */}
    <Route index element={<Navigate to="blogs" replace />} />
    <Route
      path={ADMIN_PATHS.BLOGS_LIST}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <BlogView />
        </Suspense>
      }
    />
    <Route
      path={ADMIN_PATHS.BLOGS_CREATE}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <CreateBlogForm />
        </Suspense>
      }
    />
    <Route
      path={ADMIN_PATHS.BLOGS_UPDATE + "/:id"}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <BlogUpdateView />
        </Suspense>
      }
    />
  </Route>,
];
