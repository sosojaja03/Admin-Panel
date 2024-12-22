import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BlogUpdateForm from "../../Components/UpdateBlog/UpdateBlogForm";
import { getSingleBlogInAdmin, updateBlogInAdmin } from "../../API";

export const BlogUpdateView: React.FC = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Fetch the initial blog data
  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getSingleBlogInAdmin(id as string),
    enabled: !!id,
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (values: { title_en: string; description_en: string }) =>
      updateBlogInAdmin(id as string, values),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", id] });
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <BlogUpdateForm
      initialValues={blog}
      onSubmit={updateMutation.mutateAsync}
    />
  );
};
