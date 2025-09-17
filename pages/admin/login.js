import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Button from "../../components/Button";
import Header from "../../components/Header";
import Cursor from "../../components/Cursor";
import data from "../../data/portfolio.json";
import { isRequestAuthenticated } from "../../utils/auth";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.message || "Unable to login");
      }

      router.replace("/admin");
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>Admin Login</title>
      </Head>
      <Header />
      <main className="flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-xl border border-slate-200 p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          <h1 className="text-3xl font-semibold">Admin Access</h1>
          <p className="mt-2 text-sm opacity-70">
            Enter the administrator credentials to edit your portfolio data.
          </p>
          <label className="mt-6 block text-sm font-medium opacity-80">
            Username
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 bg-transparent p-2 focus:border-black focus:outline-none dark:border-slate-700"
              type="text"
              autoComplete="username"
              required
            />
          </label>
          <label className="mt-4 block text-sm font-medium opacity-80">
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 bg-transparent p-2 focus:border-black focus:outline-none dark:border-slate-700"
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          {error && (
            <p className="mt-4 text-sm text-red-500" role="alert">
              {error}
            </p>
          )}
          <div className="mt-6 flex justify-end">
            <Button
              type="primary"
              classes={`w-full justify-center ${isSubmitting ? "opacity-70" : ""}`}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export const getServerSideProps = async ({ req }) => {
  if (isRequestAuthenticated(req.cookies)) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default Login;
