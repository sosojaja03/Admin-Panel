// import React from "react";
import { Button, Form, Input, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { createUserInAdmin } from "../../API";

type InitialValues = {
  email: string;
  phone: string;
  password: string;
};

const UserCreateForm: React.FC<{
  initialValues: InitialValues;
}> = ({ initialValues }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: {
    email: string;
    phone: string;
    password: string;
  }) => {
    const { email, phone, password } = values;

    try {
      const response = await createUserInAdmin({
        email,
        phone,
        password,
      });
      if (response.error) {
        throw new Error(response.error.message);
      }
      message.success("User created successfully");
      navigate("/dashboard/users");
    } catch (error: any) {
      message.error(`Error creating user: ${error.message}`);
    }
  };

  const { Item } = Form;

  return (
    <Form<InitialValues>
      initialValues={initialValues}
      form={form}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please enter an email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input placeholder="Insert new email" />
      </Item>
      <Item
        name="phone"
        label="Phone Number"
        rules={[
          { required: false, message: "Please enter a phone number" },
          {
            message: "Please enter a valid phone number",
          },
        ]}
      >
        <Input placeholder="Insert new phone number" />
      </Item>
      <Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: "Please enter a Paswword" },
          {
            message: "Please enter a valid Paswword",
          },
        ]}
      >
        <Input placeholder="Insert Paswword" />
      </Item>
      <Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Item>
    </Form>
  );
};

export default UserCreateForm;
