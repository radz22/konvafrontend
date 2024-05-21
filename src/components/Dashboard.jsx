import React from "react";
import NavbarDashboard from "./NavbarDashboard";
import SideBarDashboard from "./SideBarDashboard";
import TableDashboard from "./TableDashboard";

const Dashboard = () => {
  return (
    <div className="w-full h-screen   overflow-x-hidden bg-[#dbdbdb]">
      <div>
        <NavbarDashboard />
      </div>
      <div className="w-full h-[90vh]">
        <SideBarDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
