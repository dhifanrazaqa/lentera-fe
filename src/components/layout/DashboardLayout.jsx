import PropTypes from "prop-types";
import HomeHeader from "../headers/HomeHeader";
import DashboardSidebar from "../navigation/DashboardSidebar";
import DashboardSidebarMobile from "../navigation/DashboardSidebarMobile";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white">
      {isOpen && (
        <div className="flex absolute w-full lg:hidden h-screen">
          <DashboardSidebarMobile setIsOpen={setIsOpen} />
        </div>
      )}
      <HomeHeader setIsOpen={setIsOpen}/>
      <div className="grid grid-cols-7 lg:grid-cols-10">
        <div className="hidden lg:flex col-span-2 h-[calc(100vh-92px)] shadow-lg">
          <DashboardSidebar />
        </div>
        <div className="col-span-7 lg:col-span-8 h-[calc(100vh-92px)] bg-base-gray p-6 overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
