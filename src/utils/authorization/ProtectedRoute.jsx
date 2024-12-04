import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const ProtectedRoute = ({ children, role }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasCheckedAuth = useAuthStore((state) => state.hasCheckedAuth);
  const user = useAuthStore((state) => state.user);

  if (!hasCheckedAuth) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.string.isRequired,
};

export default ProtectedRoute;
