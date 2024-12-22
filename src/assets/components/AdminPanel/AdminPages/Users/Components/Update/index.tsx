// import React from "react";
// import { Button, Form, Input, message, Space } from "antd";
// import { useNavigate, useParams } from "react-router-dom";
// import { updateUserInAdmin } from "../../API";

// type InitialValues = {
//   email: string;
//   phone: string;
// };
// const UserUpdateForm: React.FC<{
//   initialValues: InitialValues;
// }> = ({ initialValues }) => {
//   const { id } = useParams();
//   const [form] = Form.useForm();
//   const navigate = useNavigate();

//   const onFinish = (values: { email: string; phone: string }) => {
//     updateUserInAdmin(id as string, values);
//     message.success("User updated successfully");
//     navigate("/Admin/Test");
//   };

//   const { Item } = Form;

//   return (
//     <Form<InitialValues>
//       initialValues={initialValues}
//       form={form}
//       layout="vertical"
//       onFinish={onFinish}
//       autoComplete="off"
//     >
//       <Item
//         name="email"
//         label="Email"
//         rules={[{ required: true }, { type: "string", min: 6 }]}
//       >
//         <Input placeholder="insert new emal" />
//       </Item>
//       <Item
//         name="phone"
//         label="Phone Number"
//         rules={[{ required: true }, { type: "string", min: 6 }]}
//       >
//         <Input placeholder="insert new phone number" />
//       </Item>
//       <Item>
//         <Space>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Space>
//       </Item>
//     </Form>
//   );
// };

// esaa swori  export default UserUpdateForm;

import React from "react";
import { Button, Form, Input, message, Space } from "antd";
import { useNavigate } from "react-router-dom";

type InitialValues = {
  email: string;
  phone: string;
};

const UserUpdateForm: React.FC<{
  initialValues: InitialValues;
  onSubmit: (values: { email: string; phone: string }) => void;
}> = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: { email: string; phone: string }) => {
    onSubmit(values);
    message.success("User updated successfully");
    navigate("/dashboard/users");
  };

  const { Item } = Form;

  return (
    <Form form={form} initialValues={initialValues} onFinish={onFinish}>
      <Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please input the email!" }]}
      >
        <Input />
      </Item>
      <Item
        name="phone"
        label="Phone"
        rules={[{ required: true, message: "Please input the phone number!" }]}
      >
        <Input />
      </Item>
      <Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Space>
      </Item>
    </Form>
  );
};

export default UserUpdateForm;
