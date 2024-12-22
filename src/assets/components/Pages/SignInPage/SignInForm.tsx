"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button, Form as AntdForm, Input, Alert } from "antd";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../supabase";
import { useTranslation } from "react-i18next";

// Supabase login function
const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
};

export const SignInForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: t("SignIn-SignUp-Translation.email.required") })
      .email({ message: t("SignIn-SignUp-Translation.email.invalid") }),
    password: z
      .string()
      .min(1, { message: t("SignIn-SignUp-Translation.password.required") })
      .min(6, { message: t("SignIn-SignUp-Translation.password.minLength") }),
  });

  // Define your form using React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // useMutation for login
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      console.log("User logged in:", data);
      navigate("/dashboard/users");
    },
    onError: (error: any) => {
      // Set a form-wide error if login fails
      setError("root", {
        type: "manual",
        message: error.message,
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;
    mutation.mutate({ email, password });
  };

  return (
    <AntdForm
      onFinish={handleSubmit(onSubmit)}
      layout="vertical"
      className="w-80 space-y-8"
    >
      <AntdForm.Item
        label="Email"
        validateStatus={errors.email ? "error" : ""}
        help={errors.email ? t(errors.email.message || "") : undefined}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input {...field} placeholder="Enter your email" />
          )}
        />
      </AntdForm.Item>

      <AntdForm.Item
        label="Password"
        validateStatus={errors.password ? "error" : ""}
        help={errors.password ? t(errors.password.message || "") : undefined}
      >
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input.Password {...field} placeholder="Enter your password" />
          )}
        />
      </AntdForm.Item>

      <Button
        type="primary"
        htmlType="submit"
        loading={mutation.isPending}
        className="w-full"
      >
        {mutation.isPending ? "Logging in..." : "Submit"}
      </Button>

      {errors.root && (
        <Alert
          message={t("SignIn-SignUp-Translation.login.error", {
            defaultValue: errors.root.message,
          })}
          type="error"
          showIcon
          className="mt-4"
        />
      )}

      <Button className="mt-5 w-full" onClick={() => navigate("/registration")}>
        Register
      </Button>
    </AntdForm>
  );
};
