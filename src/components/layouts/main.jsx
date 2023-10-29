import React, { useState } from "react";
import Sidebar from "../sidebar";
import Header from "../header";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userData = JSON.parse(localStorage.getItem('userdata'));
  const isSuperAdmin = userData.isSuperAdmin;
  return (
    <div className="relative flex h-screen bg-secondary">
      <Sidebar
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
        isSuperAdmin={isSuperAdmin}
      />
      <div className="flex-1 h-screen overflow-y-auto">
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        {/* <div className="grid grid-cols-8 gap-4 p-6"> */}
        <main className="p-6 max-w-[1300px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
