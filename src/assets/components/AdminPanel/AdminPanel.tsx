// import { Table } from "antd";

// const { Column } = Table;

// const Test = () => {
//   return (
//     <Table bordered rowKey="email" dataSource={[]}>
//       <Column title="Email" dataIndex="email" />
//       <Column title="Created At" dataIndex="createdAt" />
//       <Column title="Phone" dataIndex="phone" />
//       <Column title="Last Sign-In" dataIndex="lastSignIn" />
//     </Table>
//   );
// };

// export default Test;

// // hooks/useUsersQuery.ts
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   getUsersListInAdmin,
//   createUserInAdmin,
//   updateUserInAdmin,
//   getSignleUserInAdmin,
// } from "../AdminPanel/AdminPages/Users/API/index";
// import { mappedUsersListForAdmin } from "./AdminPages/Users/utils";

// export const USERS_QUERY_KEY = ["users"];
// export const USER_DETAIL_KEY = ["user"];

// export const useUsersQuery = () => {
//   const queryClient = useQueryClient();

//   // Query for fetching users list
//   const {
//     data: users = [],
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: USERS_QUERY_KEY,
//     queryFn: async () => {
//       const data = await getUsersListInAdmin();
//       return mappedUsersListForAdmin(data);
//     },
//   });

//   // Mutation for creating user
//   const createUserMutation = useMutation({
//     mutationFn: ({ email, phone }: { email: string; phone: string }) =>
//       createUserInAdmin(email, phone),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
//     },
//   });

//   // Mutation for updating user
//   const updateUserMutation = useMutation({
//     mutationFn: ({
//       id,
//       payload,
//     }: {
//       id: string;
//       payload: { email: string; phone: string };
//     }) => updateUserInAdmin(id, payload),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
//     },
//   });

//   return {
//     users,
//     isLoading,
//     error,
//     createUser: createUserMutation.mutate,
//     updateUser: updateUserMutation.mutate,
//     isCreating: createUserMutation.isPending,
//     isUpdating: updateUserMutation.isPending,
//     createError: createUserMutation.error,
//     updateError: updateUserMutation.error,
//   };
// };

// // Hook for single user
// export const useUserQuery = (id: string) => {
//   return useQuery({
//     queryKey: [...USER_DETAIL_KEY, id],
//     queryFn: () => getSignleUserInAdmin(id),
//     enabled: !!id,
//   });
// };
