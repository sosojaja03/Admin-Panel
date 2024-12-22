import { Form, Skeleton, Space } from "antd";

export const UserUpdateFormSkeleton = () => {
  return (
    <Form>
      <Space direction="vertical" size="large">
        <Skeleton.Input />
        <Skeleton.Input />
        <Skeleton.Button />
      </Space>
    </Form>
  );
};
