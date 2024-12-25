import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsersListInAdmin, updateUserInAdmin, User } from "../../API";
import { UserList } from "../../Components/List";
import { mappedUsersListForAdmin } from "../../utils";
import { useGetUsersListInAdmin } from "@/assets/components/query/Admin/Users";

const UserListView = () => {
  const queryClient = useQueryClient();

  const { data: users } = useGetUsersListInAdmin({
    queryOptions: { select: mappedUsersListForAdmin },
  });
  // const { data: usersForDropdown } = useGetUsersListInAdmin({
  //   queryOptions: { select: mappedUsersListForDropdown },
  // });

  //-----------------------------------------------------------------------------------
  // Fetch users using `useQuery`
  // const {
  //   data: users = [],
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["usersList"],
  //   queryFn: getUsersListInAdmin,
  //   select: (users: any) => mappedUsersListForAdmin(users),
  // });


  //-----------------------------------------------------------------------------------
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
  // if (isLoading) return <p>Loading users...</p>;
  // if (isError) return <p>Error loading users!</p>;

  return (
    <>
      {/* damatebiti magaliti tu ratomaa kai tipizireba da misgan uitility finqciis gaketeba
       <div className="mb-4 w-full">
        <Select className="w-full" options={usersForDropdown} />{" "}
      </div> */}
      <UserList users={users || []} onUpdate={mutation.mutate} />
    </>
  );
};

export default UserListView;
