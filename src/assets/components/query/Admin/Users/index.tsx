import {
  getUsersListInAdmin,
  User,
} from "@/assets/components/AdminPanel/AdminPages/Users/API";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

export const useGetUsersListInAdmin = ({
  queryOptions,
}: {
  queryOptions?: Omit<UseQueryOptions<User[], any, any>, "queryKey">;
} = {}): UseQueryResult<User[], any> => {
  return useQuery<User[], any>({
    queryKey: ["usersList"],
    queryFn: getUsersListInAdmin,
    select: (users) => {
      return users.map((user) => user?.id);
    },
    ...queryOptions,
  });
};
