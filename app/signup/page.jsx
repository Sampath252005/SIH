"use client";
import React, { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useSession } from "next-auth/react";

const SignUp = () => {
  const [visible, setVisible] = useState(false);

  const session = useSession();
  if (session.status === "authenticated") {
    redirect("/");
  }

  const register = async (formData) => {
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      passwordRaw: formData.get("password"),
    };

    const response = await fetch("/api/storeUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const r = await response.json();
    if (!response.ok) {
      alert(r.message);
      return;
    }

    alert(r.message);
    redirect("/signin");
  };

  // ✅ Replaced "div" with a clear name
  const signinLink = (
    <div>
      <Link
        className="border border-gray-400 px-3 py-2 font-bold active:bg-gray-800 active:text-gray-100 rounded-3xl hover:bg-gray-400 hover:text-gray-900"
        href="/signin"
      >
        Already have an account? Sign In
      </Link>
    </div>
  );

  return (
    <div className="h-[90vh] flex justify-center items-center">
      <div className="border-2 border-gray-400 px-10 py-10 rounded-3xl shadow-lg bg-gray-800">
        <h1 className="text-4xl font-bold text-center text-white">Sign Up</h1>
        <form className="flex flex-col gap-4 mt-4" action={register}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="border-2 border-gray-400 px-3 py-2 rounded-3xl"
            autoComplete="name"
            required
          />
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
            Sign Up
          </button>

          {/* ✅ Render SignIn link */}
          {signinLink}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
