import React from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import UserProfile from "./organism/userProfile";
import { ModeToggle } from "./mode-toggle";

const Header = ({ setIsSidebarOpen }) => {
  return (
    <nav className="flex items-center justify-between h-16 p-4 px-6 border-b bg-background">
      {/* <button onClick={() => setIsSidebarOpen((pre) => !pre)}>
        <HiMenuAlt2 size={24} />
      </button> */}

      {/* heading */}
      <div className="flex-1"></div>
      <div className="flex items-center space-x-2">

      <ModeToggle />
      <UserProfile />
      </div>
    </nav>
  );
};

export default Header;
