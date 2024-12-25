import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import Column from "antd/es/table/Column";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/assets/components/ui/input";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useForm, Controller } from "react-hook-form";
import { supabase } from "@/assets/components/supabase";

dayjs.extend(relativeTime);

type Blog = {
  id: number;
  title_en: string | null;
  description_en: string | null;
  created_at: string;
  user_id: string | null;
};

type BlogsFilterFormValues = {
  searchText: string;
};

// Debounce custom hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Fetch blogs from Supabase
const fetchBlogs = async (searchText?: string): Promise<Blog[]> => {
  if (!searchText || searchText.trim() === "") {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Blog[];
  }

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .or(`title_en.ilike.%${searchText}%, description_en.ilike.%${searchText}%`)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Blog[];
};

const BlogView: React.FC = () => {
  const navigate = useNavigate();

  const { control, watch } = useForm<BlogsFilterFormValues>({
    defaultValues: {
      searchText: "",
    },
  });

  const watchedSearchText = watch("searchText");
  const debouncedSearchText = useDebounce(watchedSearchText, 500);

  // Fetch blogs using React Query
  const {
    data: blogs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs", debouncedSearchText],
    queryFn: () => fetchBlogs(debouncedSearchText),
    staleTime: 0, // Refetch immediately when accessing this route
  });

  const handleNavigateToBlogUpdate = (id: number) => {
    navigate(`/dashboard/blogs/update/${id}`);
  };

  const formatBlogDate = (dateString: string) => {
    const blogDate = dayjs(dateString);
    const now = dayjs();

    if (now.diff(blogDate, "day") < 1) {
      return blogDate.fromNow();
    }

    return blogDate.format("HH:mm - DD/MM/YYYY");
  };

  return (
    <div className="flex flex-col gap-y-6">
      {/* Search Input */}
      <div className="mb-4 flex justify-center">
        <Controller
          control={control}
          name="searchText"
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              placeholder="Search blogs by title or description..."
            />
          )}
        />
      </div>

      {/* Blog Table */}
      <Table
        title={() => (
          <div className="text-left">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                navigate("/dashboard/blogs/create");
              }}
            >
              Create Blog
            </Button>
          </div>
        )}
        bordered
        rowKey="id"
        dataSource={blogs}
        loading={isLoading}
        locale={{
          emptyText: error
            ? `Error: ${error.message}`
            : isLoading
              ? "Loading blogs..."
              : "No blogs found",
        }}
      >
        <Column<Blog> title="Title" dataIndex="title_en" />
        <Column<Blog> title="Description" dataIndex="description_en" />
        <Column<Blog>
          title="Created At"
          render={(_, record) => formatBlogDate(record.created_at)}
        />
        <Column<Blog>
          title="Actions"
          render={(_, record) => (
            <EditOutlined
              className="cursor-pointer text-xl text-red-400"
              onClick={() => handleNavigateToBlogUpdate(record.id)}
            />
          )}
        />
      </Table>
    </div>
  );
};

export default BlogView;

// import React, { useEffect } from "react";
// import { Button, Table } from "antd";
// import Column from "antd/es/table/Column";
// import { EditOutlined, PlusOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { Input } from "@/assets/components/ui/input";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import { useForm, Controller } from "react-hook-form";
// import { useState } from "react";
// import { supabase } from "@/assets/components/supabase";

// dayjs.extend(relativeTime);

// type Blog = {
//   id: number;
//   title_en: string | null;
//   description_en: string | null;
//   created_at: string;
//   user_id: string | null;
// };

// type BlogsFilterFormValues = {
//   searchText: string;
// };

// // Debounce custom hook
// const useDebounce = (value: string, delay: number) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// };

// // Fetch blogs from Supabase
// const fetchBlogs = async (searchText?: string): Promise<Blog[]> => {
//   if (!searchText || searchText.trim() === "") {
//     const { data, error } = await supabase
//       .from("blogs")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) throw error;
//     return data as Blog[];
//   }

//   const { data, error } = await supabase
//     .from("blogs")
//     .select("*")
//     .or(`title_en.ilike.%${searchText}%, description_en.ilike.%${searchText}%`)
//     .order("created_at", { ascending: false });

//   if (error) throw error;
//   return data as Blog[];
// };

// // Main BlogView Component
// export const BlogView: React.FC = () => {
//   const navigate = useNavigate();

//   const { control, watch } = useForm<BlogsFilterFormValues>({
//     defaultValues: {
//       searchText: "",
//     },
//   });

//   const watchedSearchText = watch("searchText");
//   const debouncedSearchText = useDebounce(watchedSearchText, 500);

//   // Fetch blogs using React Query
//   const {
//     data: blogs = [],
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["blogs", debouncedSearchText],
//     queryFn: () => fetchBlogs(debouncedSearchText),
//     staleTime: Infinity,
//   });

//   const handleNavigateToBlogUpdate = (id: number) => {
//     navigate(`/dashboard/blogs/update/${id}`);
//   };

//   const formatBlogDate = (dateString: string) => {
//     const blogDate = dayjs(dateString);
//     const now = dayjs();

//     if (now.diff(blogDate, "day") < 1) {
//       return blogDate.fromNow();
//     }

//     return blogDate.format("HH:mm - DD/MM/YYYY");
//   };

//   return (
//     <div className="flex flex-col gap-y-6">
//       {/* Search Input */}
//       <div className="mb-4 flex justify-center">
//         <Controller
//           control={control}
//           name="searchText"
//           render={({ field: { onChange, value } }) => (
//             <Input
//               onChange={onChange}
//               value={value}
//               placeholder="Search blogs by title or description..."
//             />
//           )}
//         />
//       </div>

//       {/* Blog Table */}
//       <Table
//         title={() => (
//           <div className="text-left">
//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               onClick={() => {
//                 navigate("/dashboard/blogs/create");
//               }}
//             >
//               Create Blog
//             </Button>
//           </div>
//         )}
//         bordered
//         rowKey="id"
//         dataSource={blogs}
//         loading={isLoading}
//         locale={{
//           emptyText: error
//             ? `Error: ${error.message}`
//             : isLoading
//               ? "Loading blogs..."
//               : "No blogs found",
//         }}
//       >
//         <Column<Blog> title="Title" dataIndex="title_en" />
//         <Column<Blog> title="Description" dataIndex="description_en" />
//         <Column<Blog>
//           title="Created At"
//           render={(_, record) => formatBlogDate(record.created_at)}
//         />
//         <Column<Blog>
//           title="Actions"
//           render={(_, record) => (
//             <EditOutlined
//               className="cursor-pointer text-xl text-red-400"
//               onClick={() => handleNavigateToBlogUpdate(record.id)}
//             />
//           )}
//         />
//       </Table>
//     </div>
//   );
// };
