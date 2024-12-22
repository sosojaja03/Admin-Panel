// import { useState, useEffect } from "react";
// import { getUsersListInAdmin } from "../../API";
// import { UserList } from "../../Components/List";
// import { mappedUsersListForAdmin } from "../../utils";

// export const UserListView = () => {
//   const [users, setUsers] = useState<
//     {
//       email: string;
//       createdAt: string;
//       phone: string;
//       lastSignIn: string;
//       id: string | number;
//     }[]
//   >([]);

//   useEffect(() => {
//     getUsersListInAdmin().then((users) => {
//       const mappedUsers = mappedUsersListForAdmin(users);

//       setUsers(mappedUsers);
//       console.log("State Users:", mappedUsers); // Debug here
//     });
//   }, []);
//   return <UserList users={users} />;
// };

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsersListInAdmin, updateUserInAdmin } from "../../API";
import { UserList } from "../../Components/List";
import { mappedUsersListForAdmin } from "../../utils";

export const UserListView = () => {
  const queryClient = useQueryClient();

  // Fetch users using `useQuery`
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["usersList"],
    queryFn: getUsersListInAdmin,
    select: (users: any) => mappedUsersListForAdmin(users),
  });

  // Mutate user data
  const mutation = useMutation({
    mutationFn: (updateData: {
      id: string | number;
      email: string;
      phone: string;
    }) =>
      updateUserInAdmin(String(updateData.id), {
        email: updateData.email,
        phone: updateData.phone,
      }),
    onSuccess: () => {
      // Refetch user list after updating
      queryClient.invalidateQueries({ queryKey: ["usersList"] });
    },
  });

  // Show loader or error state
  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users!</p>;

  return <UserList users={users} onUpdate={mutation.mutate} />;
};

// // views/UserListView.tsx
// import { UserList } from "../../Components/List";
// import { useUsersQuery } from "@/assets/components/AdminPanel/AdminPanel";

// export const UserListView = () => {
//   const { users, isLoading, error } = useUsersQuery();

//   if (error) {
//     return (
//       <div className="text-red-500">
//         Error loading users:{" "}
//         {error instanceof Error ? error.message : "Unknown error"}
//       </div>
//     );
//   }

//   if (isLoading) {
//     return <div>Loading...</div>; // Consider adding a proper loading skeleton
//   }

//   return <UserList users={users} />;
// };
