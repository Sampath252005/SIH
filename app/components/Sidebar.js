"use client";
import { useState } from "react";
import {
  LayoutDashboard,
  FlaskConicalIcon,
  ClipboardMinus,
  Settings,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 z-50 text-white p-2 rounded-lg ${
          isOpen ? "bg-black left-50" : "bg-gray-800 left-4"
        }`}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-64 bg-gray-800 p-4 flex flex-col h-screen fixed top-0 left-0 z-40"
      >
        <h1 className="text-2xl font-bold text-white mb-6">RailFlow AI</h1>
        <nav className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-3 p-2 rounded-2xl hover:bg-black">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link href="/simulation" className="flex items-center gap-3 p-2 rounded-2xl hover:bg-black">
            <FlaskConicalIcon size={18} /> Simulation
          </Link>
          <Link href="/reports" className="flex items-center gap-3 p-2 rounded-2xl hover:bg-black">
            <ClipboardMinus size={18} /> Reports
          </Link>
          <Link href="/settings" className="flex items-center gap-3 p-2 rounded-2xl hover:bg-black">
            <Settings size={18} /> Settings
          </Link>
        </nav>
      </motion.aside>
    </>
  );
}
