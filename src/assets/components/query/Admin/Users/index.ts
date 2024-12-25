import {
  getUsersListInAdmin,
  User,
} from "@/assets/components/AdminPanel/AdminPages/Users/API";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useUserQueryKeys } from "./hooks/useUserQueryKeys";

//rom mewwros <T> awitlebs yvelafers
export const useGetUsersListInAdmin = <T = User[]>({
  queryOptions,
}: {
  queryOptions?: Omit<UseQueryOptions<User[], any, T>, "queryKey">;
} = {}): UseQueryResult<T, any> => {
  {
    /*for example amas sheidzleba vaketebdet imitom rom dinamiurad sheicvalos ena backidan da ara statikurad fronthsi */
  }
  const { LIST } = useUserQueryKeys();

  return useQuery<User[], any, T>({
    queryKey: [LIST],
    queryFn: getUsersListInAdmin,

    ...queryOptions,
  });
};
