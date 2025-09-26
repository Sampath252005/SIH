"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import malelogo from "@/public/male_profile.png"; // move image to /public

export default function ProfilePage({ showProfile, onCloseProfile }) {
  const router = useRouter();

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  // Load profile from localStorage
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    if (storedProfile) {
      setProfile(storedProfile);
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Save profile to localStorage
  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile saved successfully!");
  };

  // Logout -> clear profile and redirect
  const handleLogout = () => {
    localStorage.removeItem("profile");
    setProfile({ fullName: "", email: "", phone: "" });
    router.push("/"); // Next.js redirect
  };

  return (
    <>
      {showProfile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onCloseProfile}
        />
      )}
      <div
        className={`fixed top-0 right-0 w-full max-w-sm md:max-w-lg lg:max-w-md h-full bg-green-300 shadow-lg text-black z-50 transform ${
          showProfile ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 overflow-y-auto`}
      >
        <div className="flex flex-col gap-6 items-center bg-green-300 p-6 md:p-10 min-h-full">
          {/* Profile Image */}
          <div className="flex justify-center w-full">
            <Image
              src={malelogo}
              alt="user"
              width={128}
              height={128}
              className="rounded-full"
              priority
            />
          </div>

          {/* Full Name */}
          <div className="w-full">
            <label className="block text-lg md:text-2xl font-bold mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              className="w-full min-h-[40px] font-medium text-black p-2 rounded-md"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="w-full">
            <label className="block text-lg md:text-2xl font-bold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full min-h-[40px] font-medium text-black p-2 rounded-md"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone Number */}
          <div className="w-full">
            <label className="block text-lg md:text-2xl font-bold mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full min-h-[40px] font-medium text-black p-2 rounded-md"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-7 w-full justify-center mt-4">
            <button
              className="bg-green-500 text-black px-4 py-2 rounded-lg shadow-md hover:bg-green-400 w-full md:w-auto"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-red-700 text-black px-4 py-2 rounded-lg shadow-md hover:bg-red-500 w-full md:w-auto"
              onClick={handleLogout}
            >
              Log Out
            </button>
            <button
              className="bg-blue-700 text-black px-4 py-2 rounded-lg shadow-md hover:bg-blue-500 w-full md:w-auto font-bold"
              onClick={() => onCloseProfile(true)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
