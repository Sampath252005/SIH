"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const SignIn = () => {
  const [visible, setVisible] = useState(false);

  const session = useSession();
  if (session.status === "authenticated") {
    redirect("/");
  }

  const login = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        email,
        password,
      });

      if (res.error) {
        if (res.error === "CredentialsSignin") {
          alert("Invalid Email or Password");
        } else {
          alert("Unable to Sign In");
        }
        return;
      }
    } catch (error) {
      console.error("Error signing in:", error);
      return;
    }

    redirect("/");
  };

  const signupLink = (
    <div>
      <Link
        className="border border-gray-400 px-3 py-2 font-bold active:bg-gray-800 active:text-gray-100 rounded-3xl hover:bg-gray-400 hover:text-gray-900"
        href="/signup"
      >
        Sign Up
      </Link>
    </div>
  );

  return (
    <div className="h-[90vh] flex justify-center items-center">
      <div className="border-2 border-gray-400 px-10 py-10 rounded-3xl shadow-lg bg-gray-800">
        <h1 className="text-4xl font-bold text-center text-white">Sign In</h1>
        <form className="flex flex-col gap-4 mt-4" action={login}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border-2 border-gray-400 px-3 py-2 rounded-3xl"
            autoComplete="email"
            required
          />

          <div className="flex gap-3 items-center">
            <input
              type={visible ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="border-2 border-gray-400 px-3 py-2 rounded-3xl flex-1"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setVisible(!visible)}
              className="text-gray-400 hover:text-gray-200"
            >
              {visible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="border border-gray-400 px-3 py-2 font-bold active:bg-gray-800 active:text-gray-100 rounded-3xl hover:bg-gray-400 hover:text-gray-900"
          >
            Sign In
          </button>

          {/* ✅ Correct way to render signup link */}
          {signupLink}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
