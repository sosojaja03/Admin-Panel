"use client";

import React from "react";
import { SignInForm } from "../SignInForm"; // import i18next from "i18next";

const SignInPage: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-4 text-2xl font-bold">Sign In</h1>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
