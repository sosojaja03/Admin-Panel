import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsersListInAdmin, updateUserInAdmin } from "../../API";
import { UserList } from "../../Components/List";
import { mappedUsersListForAdmin } from "../../utils";

const UserListView = () => {
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

export default UserListView;
