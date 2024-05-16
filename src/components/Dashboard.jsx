import React from "react";
import NavbarDashboard from "./NavbarDashboard";
import SideBarDashboard from "./SideBarDashboard";
import TableDashboard from "./TableDashboard";

const Dashboard = () => {
  return (
    <div className="w-full h-screen   overflow-x-hidden ">
      <div>
        <NavbarDashboard />
      </div>
      <div>
        <SideBarDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
