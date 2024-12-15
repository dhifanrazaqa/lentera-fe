import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const PublicRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasCheckedAuth = useAuthStore((state) => state.hasCheckedAuth);
  const user = useAuthStore((state) => state.user);

  if (!hasCheckedAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
        <div className="w-16 h-16 border-4 border-t-4 border-t-transparent border-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return user.role === "guru" ? <Navigate to="/dashboard" replace /> : <Navigate to="/home" replace />;
  }

  return children;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
