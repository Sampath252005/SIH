"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function ClientLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen relative">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <main
        className="flex-1 p-6 transition-all duration-300"
        style={{ filter: sidebarOpen ? "blur(4px)" : "blur(0px)" }}
      >
        {children}
      </main>
    </div>
  );
}
