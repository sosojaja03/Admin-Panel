import React from "react";
import { Button, Form, Input, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

type BlogInitialValues = {
  title_en: string;
  description_en: string;
};

const BlogUpdateForm: React.FC<{
  initialValues: BlogInitialValues;
  onSubmit: (values: BlogInitialValues) => Promise<void>;
}> = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onFinish = async (values: BlogInitialValues) => {
    try {
      await onSubmit(values);
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
      message.success("Blog updated successfully");
      navigate("/dashboard/blogs");
    } catch (error) {
      message.error("Failed to update blog");
    }
  };

  const { Item } = Form;

  return (
    <Form<BlogInitialValues>
      initialValues={initialValues}
      form={form}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Item
        name="title_en"
        label="Title"
        rules={[{ required: true, message: "Please enter the blog title" }]}
      >
        <Input placeholder="Enter new title" />
      </Item>
      <Item
        name="description_en"
        label="Description"
        rules={[
          { required: true, message: "Please enter the blog description" },
        ]}
      >
        <Input.TextArea placeholder="Enter new description" rows={4} />
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

export default BlogUpdateForm;
