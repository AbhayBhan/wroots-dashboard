import React, { useState } from "react";
import { AiFillAlert } from "react-icons/ai";
import { MdPersonSearch, MdWork, MdApartment,MdAutoAwesome,MdOutlineApps,MdGrading,MdGroupAdd, MdInstallMobile, MdCurrencyRupee, MdEmergencyShare, MdReport, MdDataArray } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import LogoHalf from "../../assets/placeholder-logo-half.png";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const getItem = (label, link, key, icon) => ({ label, link, key, icon });

const routes = [
  getItem("Dashboard", "/", "dashboard", MdOutlineApps),
  getItem(
    "Candidates",
    "/candidate?currentTab=Unassigned+Candidates",
    "candidate",
    MdGroupAdd
  ),
  getItem("Jobs", "/job", "job", MdWork),
  getItem("Jobs Categories", "/job-categories", "job-categories", MdGrading),
  getItem("App Users", "/app-users", "app-users", MdInstallMobile),
  getItem("Companies", "/company", "company", MdApartment),
  getItem("Skills", "/skill", "skill", MdAutoAwesome),
  getItem("Locations", "/location", "location", MdEmergencyShare),
  getItem("Payouts", "/payout", "payout", MdCurrencyRupee),
  getItem("Recruiters", "/recruiter", "recruiter", MdPersonSearch),
  getItem("Reports", "/reports", "reports", MdDataArray)
];

const allowedRecruiter = ["Candidates","Dashboard","Jobs","Jobs Categories","App Users","Companies","Skills","Locations"]

const Sidebar = ({ isSidebarOpen, setSidebarOpen, className }) => {
  const location = useLocation();
  const { pathname } = location;

  const userData = JSON.parse(localStorage.getItem("userdata"));
  const isSuperAdmin = userData?.isSuperAdmin;

  return (
    <div
      className={` ${
        isSidebarOpen ? "w-60" : "w-20"
      } p-4 border-r h-screen sticky top-0 bg-background`}
    >
      <div>
        {isSidebarOpen ? (
          <img src={Logo} alt="logo" className="h-14" />
        ) : (
          <img src={LogoHalf} alt="logo" />
        )}
      </div>
      <nav className={cn("flex flex-col space-y-1 mt-5", className)}>
        {routes.map((route) => {
          const Icon = route?.icon;
          if (!isSuperAdmin) {
            if (allowedRecruiter.includes(route.label)) {
              return (
                <Link
                  key={route.key}
                  to={route.link}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    pathname === route.link
                      ? "bg-muted hover:bg-muted"
                      : "hover:bg-transparent hover:underline",
                    "justify-start"
                  )}
                >
                  {route.label}
                </Link>
              );
            }
          } else {
            return (
              <Link
                key={route.key}
                to={route.link}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  pathname === route.link
                    ? "bg-muted hover:bg-muted"
                    : "hover:bg-transparent hover:underline",
                  "justify-start"
                )}
              >
               <Icon size={18} color="#4287f5" className="shrink-0" />
                {route.label}
              </Link>
            );
          }
        })}
      </nav>
    </div>
  );
};

// <li key={route.key}>
//   <Link
//     to={route.link}
//     className="flex items-center gap-2 px-3 py-2 duration-300 rounded hover:bg-primary hover:text-secondary whitespace-nowrap"
//   >
//     {route.icon && <Icon size={24} className="shrink-0" />}
//     <p
//       data-open={isSidebarOpen}
//       className="data-[open=true]:block data-[open=false]:hidden "
//     >
//       {route.label}
//     </p>
//   </Link>
// </li>;

export default Sidebar;
