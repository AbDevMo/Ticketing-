"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { set } from "mongoose";

const Login = () => {
  const router = useRouter();
  const [err, setErr] = useState("");
  const [Loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    // Call NextAuth credentials provider
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.error) {
      setErr(res.error);
      setLoading(false);
    } else {
      router.push("/"); // redirect to dashboard
    }

    console.log("Login form submitted");
  };

  return (
    <div className="p-5 flex flex-col items-center justify-center">
      <h1>Login Page</h1>
      {/* Add your login form or authentication logic here */}
      <form
        className="flex flex-col gap-3 w-1/2"
        method="POST"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit" className="btn" disabled={Loading}>
          Login
        </button>
      </form>

      <p className="mt-4">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-blue-500 underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
