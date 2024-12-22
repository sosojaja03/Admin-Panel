// // import React from "react";
// // import { Button, Table } from "antd";
// // import Column from "antd/es/table/Column";
// // import { EditOutlined, PlusOutlined } from "@ant-design/icons";
// // import { useNavigate } from "react-router-dom";
// // import dayjs from "dayjs";
// // import relativeTime from "dayjs/plugin/relativeTime";

// // dayjs.extend(relativeTime);

// // type User = {
// //   email: string;
// //   createdAt: string;
// //   phone: string;
// //   lastSignIn: string;
// //   id: string | number;
// // };

// // export const UserList: React.FC<{
// //   users: User[];
// // }> = ({ users }) => {
// //   const navigate = useNavigate();

// //   const handleNavigateToUserUpdate = (id: string | number) => {
// //     navigate(`/Admin/Test/Update/${id}`);
// //   };

// //   const formatDate = (dateString: string) => {
// //     const date = dayjs(dateString);
// //     const now = dayjs();

// //     // If the date is within the last 24 hours, show relative time
// //     if (now.diff(date, "day") < 1) {
// //       return date.fromNow();
// //     }

// //     // Otherwise, show formatted date and time
// //     return date.format("HH:mm - DD/MM/YYYY");
// //   };

// //   return (
// //     <Table
// //       title={() => (
// //         <div className="text-left">
// //           <Button
// //             type="primary"
// //             icon={<PlusOutlined />}
// //             onClick={() => {
// //               navigate("/Admin/Test/Create");
// //             }}
// //           >
// //             Create User
// //           </Button>
// //         </div>
// //       )}
// //       bordered
// //       rowKey="email"
// //       dataSource={users}
// //     >
// //       <Column<User> title="Email" dataIndex="email" />
// //       <Column<User>
// //         title="Created At"
// //         render={(_, record) => formatDate(record.createdAt)}
// //       />
// //       <Column<User> title="Phone" dataIndex="phone" />
// //       <Column<User>
// //         title="Last Sign-In"
// //         render={(_, record) => formatDate(record.lastSignIn)}
// //       />
// //       <Column<User>
// //         title="Actions"
// //         render={(_, record) => {
// //           return (
// //             <EditOutlined
// //               className="cursor-pointer text-xl text-red-400"
// //               onClick={() => {
// //                 handleNavigateToUserUpdate(record?.id);
// //               }}
// //             />
// //           );
// //         }}
// //       />
// //     </Table>
// //   );
// // };
// import React from "react";
// import { Button, Table } from "antd";
// import Column from "antd/es/table/Column";
// import { EditOutlined, PlusOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";

// dayjs.extend(relativeTime);

// type User = {
//   email: string;
//   createdAt: string;
//   phone: string;
//   lastSignIn: string;
//   id: string | number;
// };

// export const UserList: React.FC<{
//   users: User[];
//   onUpdate: (updateData: {
//     id: string | number;
//     email: string;
//     phone: string;
//   }) => void;
// }> = ({ users, onUpdate }) => {
//   const navigate = useNavigate();

//   const handleNavigateToUserUpdate = (id: string | number) => {
//     navigate(`/Admin/Test/Update/${id}`);
//   };

//   const formatDate = (dateString: string) => {
//     const date = dayjs(dateString);
//     const now = dayjs();

//     if (now.diff(date, "day") < 1) {
//       return date.fromNow();
//     }

//     return date.format("HH:mm - DD/MM/YYYY");
//   };

//   return (
//     <Table
//       title={() => (
//         <div className="text-left">
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={() => {
//               navigate("/Admin/Test/Create");
//             }}
//           >
//             Create User
//           </Button>
//         </div>
//       )}
//       bordered
//       rowKey="email"
//       dataSource={users}
//     >
//       <Column<User> title="Email" dataIndex="email" />
//       <Column<User>
//         title="Created At"
//         render={(_, record) => formatDate(record.createdAt)}
//       />
//       <Column<User> title="Phone" dataIndex="phone" />
//       <Column<User>
//         title="Last Sign-In"
//         render={(_, record) => formatDate(record.lastSignIn)}
//       />
//       <Column<User>
//         title="Actions"
//         render={(_, record) => (
//           <>
//             <EditOutlined
//               className="cursor-pointer text-xl text-red-400"
//               onClick={() => handleNavigateToUserUpdate(record.id)}
//             />
//             <Button
//               type="link"
//               onClick={() =>
//                 onUpdate({
//                   id: record.id,
//                   email: record.email,
//                   phone: record.phone,
//                 })
//               }
//             >
//               Update
//             </Button>
//           </>
//         )}
//       />
//     </Table>
//   );
// };
import React from "react";
import { Button, Table } from "antd";
import Column from "antd/es/table/Column";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type User = {
  email: string;
  createdAt: string;
  phone: string;
  lastSignIn: string;
  id: string | number;
};

export const UserList: React.FC<{
  users: User[];
  onUpdate: (updateData: {
    id: string | number;
    email: string;
    phone: string;
  }) => void;
}> = ({ users }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = dayjs(dateString);
    const now = dayjs();

    if (now.diff(date, "day") < 1) {
      return date.fromNow();
    }

    return date.format("HH:mm - DD/MM/YYYY");
  };

  return (
    <Table
      title={() => (
        <div className="text-left">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              navigate("/dashboard/users/create");
            }}
          >
            Create User
          </Button>
        </div>
      )}
      bordered
      rowKey="email"
      dataSource={users}
    >
      <Column<User> title="Email" dataIndex="email" />
      <Column<User>
        title="Created At"
        render={(_, record) => formatDate(record.createdAt)}
      />
      <Column<User> title="Phone" dataIndex="phone" />
      <Column<User>
        title="Last Sign-In"
        render={(_, record) => formatDate(record.lastSignIn)}
      />
      <Column<User>
        title="Actions"
        render={(_, record) => (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <EditOutlined
              className="cursor-pointer text-xl text-red-400"
              onClick={() => navigate(`/dashboard/users/Update/${record.id}`)}
            />
          </div>
        )}
      />
    </Table>
  );
};
