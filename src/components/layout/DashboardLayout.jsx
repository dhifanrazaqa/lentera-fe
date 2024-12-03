import PropTypes from "prop-types";
import HomeHeader from "../headers/HomeHeader";
import DashboardSidebar from "../navigation/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="bg-white">
      <HomeHeader />
      <div className="grid grid-cols-7">
        <div className="col-span-1 h-[calc(100vh-92px)] shadow-lg">
          <DashboardSidebar />
        </div>
        <div className="col-span-6 h-[calc(100vh-92px)] bg-base-gray p-6 overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
