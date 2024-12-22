import { supabase } from "../../../../supabase";

export const getUsersListInAdmin = () => {
  return supabase.auth.admin.listUsers().then((res) => {
    console.log(res.data);
    return res.data.users as User[];
  });
};

export const updateUserInAdmin = (
  id: string,
  payload: { email: string; phone: string },
) => {
  return supabase.auth.admin.updateUserById(id, { ...payload });
};

export const createUserInAdmin = async (payload: {
  email: string;
  phone: string;
  password: string;
}) => {
  try {
    const { data, error } = await supabase.auth.admin.createUser(payload);
    console.log("Supabase Response:", { data, error });
    if (error) throw new Error(error.message);
    return { data };
  } catch (error) {
    console.error("Error in createUserInAdmin:", error);
    throw error;
  }
};

export const getSignleUserInAdmin = (id: string) => {
  return supabase.auth.admin.getUserById(id).then((res) => {
    return res.data.user;
  });
};

export type User = {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: {
    provider: string;
    providers: [string];
  };
  user_metadata: object;
  identities: null;
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
};
