import { useEffect, useState } from "react";
import "./App.css";
import { UseAuthContext } from "./assets/components/context/hooks/AuthContextHook";
import { supabase } from "./assets/components/supabase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./assets/components/Layout/Layout";
// import { AuthGuard } from "./assets/components/RouteGuards/AuthGuard";
import SignInPage from "./assets/components/Pages/SignInPage/SignInPageView/SignInPage";
import AdminLayout from "./assets/components/Layout/admin/AdminLayout";
import { UserCreateView } from "./assets/components/AdminPanel/AdminPages/Users/View/Create";
import { UserUpdateView } from "./assets/components/AdminPanel/AdminPages/Users/View/Update";
import { UserListView } from "./assets/components/AdminPanel/AdminPages/Users/View/List";
import { BlogView } from "./assets/components/AdminPanel/AdminPages/Blogs/Components/ListBlog/Blog";
import CreateBlogForm from "./assets/components/AdminPanel/AdminPages/Blogs/Components/CreateBlog/CreateBlog";
import { BlogUpdateView } from "./assets/components/AdminPanel/AdminPages/Blogs/View/Update";
import {
  IsAuthorisedGuard,
  IsUnAuthorisedGuard,
} from "./assets/components/RouteGuard";

const queryClient = new QueryClient();

function App() {
  const { handleSetUser } = UseAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSetUser(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSetUser(session);
    });

    return () => subscription.unsubscribe();
  }, [handleSetUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // return (
  //   <QueryClientProvider client={queryClient}>
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/" element={<Layout />}>
  //           <Route
  //             path="sign-in"
  //             element={
  //               // <AuthGuard>
  //               <SignInPage />
  //             }
  //           ></Route>
  //         </Route>
  //         {/* admin */}
  //         <Route path="Admin" element={<AdminLayout />}>
  //           <Route path="Test" element={<UserListView />} />
  //           <Route path="Test/Create" element={<UserCreateView />} />
  //           <Route path="Test/Update/:id" element={<UserUpdateView />} />
  //           <Route path="Blogs" element={<BlogView />} />
  //           <Route path="Blogs/Create" element={<CreateBlogForm />} />
  //           <Route path="Blogs/Update/:id" element={<BlogUpdateView />} />
  //         </Route>
  //       </Routes>
  //     </BrowserRouter>
  //   </QueryClientProvider>
  // );

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
                <Layout />
              </IsUnAuthorisedGuard>
            }
          >
            <Route path="sign-in" element={<SignInPage />} />
          </Route>

          {/* Admin Routes */}
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
            <Route path="users" element={<UserListView />} />
            <Route path="users/create" element={<UserCreateView />} />
            <Route path="users/update/:id" element={<UserUpdateView />} />
            <Route path="blogs" element={<BlogView />} />
            <Route path="blogs/create" element={<CreateBlogForm />} />
            <Route path="blogs/update/:id" element={<BlogUpdateView />} />
          </Route>

          {/* Not Found */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
