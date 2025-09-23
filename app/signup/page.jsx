"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Signup = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    // Call your API to create the user
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Signup failed");
      setLoading(false);
      return;
    }

    // Auto-login after signup
    const loginRes = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (loginRes.error) {
      setError(loginRes.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="p-5 flex flex-col items-center justify-center">
      <h1 className="text-xl mb-4">Sign Up</h1>
      <form
        className="flex flex-col gap-3 w-1/2"
        method="POST"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        {error && <p className="text-red-500">{error}</p>}

        <button type="submit" className="btn" disabled={Loading}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
