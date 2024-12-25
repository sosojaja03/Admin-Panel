// esaa swori
// import { useParams } from "react-router-dom";
// import UserUpdateForm from "../../Components/Update";
// import { useEffect, useState } from "react";
// import { getSignleUserInAdmin } from "../../API";
// import { UserUpdateFormSkeleton } from "../../Components/Update/skeleton";

// export const UserUpdateView = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState<{ email: string; phone: string }>({
//     email: "",
//     phone: "",
//   });

//   const [isLoading, setLoading] = useState(true);

//   useEffect(() => {
//     getSignleUserInAdmin(id as string)
//       .then((res) => {
//         setUser({ email: res?.email || "", phone: res?.phone || "" });
//       })
//       .finally(() => {
//         setTimeout(() => {
//           setLoading(false);
//         }, 2000);
//       });
//   }, []);
//   return isLoading ? (
//     <UserUpdateFormSkeleton />
//   ) : (
//     <UserUpdateForm initialValues={user} />
//   );
// };

import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UserUpdateForm from "../../Components/Update";
import { getSignleUserInAdmin, updateUserInAdmin } from "../../API";
import { UserUpdateFormSkeleton } from "../../Components/Update/skeleton";

const UserUpdateView = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Fetch single user
  const { data: user, isLoading } = useQuery({
    queryKey: ["singleUser", id],
    queryFn: () => getSignleUserInAdmin(id as string),
    enabled: !!id,
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: (updatedData: { email: string; phone: string }) =>
      updateUserInAdmin(id as string, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usersList"] }); // Refresh the users list
    },
  });

  // Handle form submission
  const handleUpdate = (values: { email: string; phone: string }) => {
    updateUserMutation.mutate(values);
  };

  return isLoading ? (
    <UserUpdateFormSkeleton />
  ) : (
    <UserUpdateForm
      initialValues={{
        email: user?.email || "",
        phone: user?.phone || "",
      }}
      onSubmit={handleUpdate}
    />
  );
};

export default UserUpdateView;

// import { useParams } from "react-router-dom";
// import UserUpdateForm from "../../Components/Update";
// import { UserUpdateFormSkeleton } from "../../Components/Update/skeleton";
// import {
//   useUserQuery,
//   useUsersQuery,
// } from "@/assets/components/AdminPanel/AdminPanel";

// export const UserUpdateView = () => {
//   const { id } = useParams();
//   const { updateUser, isUpdating } = useUsersQuery();
//   const { data: user, isLoading, error } = useUserQuery(id as string);

//   const handleSubmit = async (values: { email: string; phone: string }) => {
//     if (id) {
//       updateUser(
//         { id, payload: values },
//         {
//           onSuccess: () => {
//             // Handle success (e.g., show notification, redirect)
//           },
//           onError: (error) => {
//             // Handle error
//             console.error("Update failed:", error);
//           },
//         },
//       );
//     }
//   };

//   if (isLoading) return <UserUpdateFormSkeleton />;

//   if (error) {
//     return (
//       <div className="text-red-500">Error loading user: {error.message}</div>
//     );
//   }

//   return (
//     <UserUpdateForm
//       initialValues={{
//         email: user?.email || "",
//         phone: user?.phone || "",
//       }}
//       onSubmit={handleSubmit}
//       isSubmitting={isUpdating}
//     />
//   );
// };
