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
