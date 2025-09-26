"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  FlaskConicalIcon,
  ClipboardMinus,
  Settings,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button (Always Visible) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4  z-50 ${isOpen?'bg-black left-50':'bg-gray-800 left-4'} text-white p-2 rounded-lg`}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } w-64 bg-gray-800 p-4 flex flex-col h-screen transition-transform duration-300 fixed top-0 left-0 z-40`}
      >
        <h1 className="text-2xl  font-bold text-white mb-6 ">RailFlow AI</h1>

        <nav className="flex flex-col gap-3">
          <span className="flex space-x-3 items-center cursor-pointer p-2 rounded-2xl hover:bg-black">
            <LayoutDashboard size={18} />
            <Link href="/" className="hover:text-blue-400">Dashboard</Link>
          </span>
          <span className="flex space-x-3 items-center cursor-pointer p-2 rounded-2xl hover:bg-black">
            <FlaskConicalIcon size={18} />
            <Link href="/simulation" className="hover:text-blue-400">Simulation</Link>
          </span>
          <span className="flex space-x-3 items-center cursor-pointer p-2 rounded-2xl hover:bg-black">
            <ClipboardMinus size={18} />
            <Link href="/reports" className="hover:text-blue-400">Reports</Link>
          </span>
          <span className="flex space-x-3 items-center cursor-pointer p-2 rounded-2xl hover:bg-black">
            <Settings size={18} />
            <Link href="/settings" className="hover:text-blue-400">Settings</Link>
          </span>
        </nav>
      </aside>

      {/* Overlay (click to close) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-transparent  bg-opacity-0 z-30"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
