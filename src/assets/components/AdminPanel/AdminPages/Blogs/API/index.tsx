import { supabase } from "@/assets/components/supabase";

export const getSingleBlogInAdmin = async (id: string) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

export const updateBlogInAdmin = async (
  id: string,
  values: { title_en: string; description_en: string },
) => {
  const { error } = await supabase
    .from("blogs")
    .update({
      title_en: values.title_en,
      description_en: values.description_en,
    })
    .eq("id", id);
  if (error) throw error;
};
