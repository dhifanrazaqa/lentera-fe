import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/guru/Dashboard";
import PublicRoute from "./utils/authorization/PublicRoute";
import ProtectedRoute from "./utils/authorization/ProtectedRoute";
import useAuthStore from "./store/authStore";
import { checkAuthentication } from "./utils/verifyToken";
import { useEffect } from "react";
import Register from "./pages/auth/Register";
import CreateClass from "./pages/guru/class/CreateClass";
import DetailClass from "./pages/guru/class/DetailClass";
import DashboardClass from "./pages/guru/class/DashboardClass";

function App() {
  const syncAuth = useAuthStore((state) => state.syncAuth);
  const hasCheckedAuth = useAuthStore((state) => state.hasCheckedAuth);

  useEffect(() => {
    const verifyTokenOnce = async () => {
      const { user } = await checkAuthentication();
      syncAuth(user);
    };

    if (!hasCheckedAuth) {
      verifyTokenOnce();
    }
  }, [syncAuth, hasCheckedAuth]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="guru">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/class"
          element={
            <ProtectedRoute role="guru">
              <DashboardClass />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/class/create"
          element={
            <ProtectedRoute role="guru">
              <CreateClass />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/class/:id"
          element={
            <ProtectedRoute role="guru">
              <DetailClass />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
