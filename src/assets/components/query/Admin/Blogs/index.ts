import { Blog } from "@/assets/components/AdminPanel/AdminPages/Blogs/Components/ListBlog/Blog";
import { fetchBlogs } from "@/assets/components/AdminPanel/AdminPages/Blogs/Components/ListBlog/Blog";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useBlogsQueryKeys } from "./hooks/useBlogsQueryKeys";

//rom mewwros <T> awitlebs yvelafers
export const useGetBlogsListInAdmin = <T = Blog[]>({
  queryOptions,
}: {
  queryOptions?: Omit<UseQueryOptions<Blog[], any, T>, "queryKey">;
} = {}): UseQueryResult<T, any> => {
  {
    /*for example amas sheidzleba vaketebdet imitom rom dinamiurad sheicvalos ena backidan da ara statikurad fronthsi */
  }
  const { LIST } = useBlogsQueryKeys();

  return useQuery<Blog[], any, T>({
    queryKey: [LIST],
    queryFn: fetchBlogs,
    ...queryOptions,
  });
};
