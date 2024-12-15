import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import CreateContent from "./pages/guru/content/CreateContent";
import StudentClass from "./pages/guru/class/StudentClass";
import CreateMateri from "./pages/guru/Material/CreateMateri";
import CreateTugas from "./pages/guru/Assignment/CreateTugas";
import DetailSubmission from "./pages/guru/Assignment/DetailSubmission";
import DashboardForum from "./pages/guru/Forum/DashboardForum";
import ClassForum from "./pages/guru/Forum/ClassForum";
import Landing from "./pages/Landing";
import Home from "./pages/siswa/Home";
import DetailClassSiswa from "./pages/siswa/class/DetailClassSiswa";
import DetailMaterialSiswa from "./pages/siswa/Material/DetailMaterialSiswa";
import DetailQuizSiswa from "./pages/siswa/Quiz/DetailQuizSiswa";
import ResultQuizSiswa from "./pages/siswa/Quiz/ResultQuizSiswa";
import DetailTugasSiswa from "./pages/siswa/Tugas/DetailTugasSiswa";
import CreateQuiz from "./pages/guru/Quiz/CreateQuiz";
import ResultTugasSiswa from "./pages/siswa/Tugas/ResultTugasSiswa";
import DashboardLayout from "./components/layout/DashboardLayout";
import HomeClass from "./pages/siswa/class/HomeClass";

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
        <Route path="/" element={<Landing />} />
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
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/class"
          element={
            <ProtectedRoute role="guru">
              <DashboardLayout>
                <DashboardClass />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/class/create"
          element={
            <ProtectedRoute role="guru">
              <DashboardLayout>
                <CreateClass />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/class/:id"
          element={
            <ProtectedRoute role="guru">
              <DashboardLayout>
                <DetailClass />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/class/:id/students"
          element={
            <ProtectedRoute role="guru">
              <DashboardLayout>
                <StudentClass />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/class/:id/content/create"
          element={
            <ProtectedRoute role="guru">
              <DashboardLayout>
                <CreateContent />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/class/:id/material/create"
          element={
            <ProtectedRoute role="guru">
              <DashboardLayout>
                <CreateMateri />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/class/:id/assignment/create"
          element={
            <ProtectedRoute role="guru">
              <DashboardLayout>
                <CreateTugas />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/class/:id/quiz/create"
          element={
            <ProtectedRoute role="guru">
              <DashboardLayout>
                <CreateQuiz />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/class/:classId/assignment/:assignmentId/submission"
          element={
            <ProtectedRoute role="guru">
              <DashboardLayout>
                <DetailSubmission />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/forum"
          element={
            <ProtectedRoute role="guru">
              <DashboardLayout>
                <DashboardForum />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/forum/:classId"
          element={
            <ProtectedRoute role="guru">
              <DashboardLayout>
                <ClassForum />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute role="siswa">
              <DashboardLayout>
                <Home />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/class/:id"
          element={
            <ProtectedRoute role="siswa">
              <DashboardLayout>
                <DetailClassSiswa />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/material/:id/"
          element={
            <ProtectedRoute role="siswa">
              <DashboardLayout>
                <DetailMaterialSiswa />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:id/"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DetailQuizSiswa />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:id/result"
          element={
            <ProtectedRoute role="siswa">
              <DashboardLayout>
                <ResultQuizSiswa />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/class"
          element={
            <ProtectedRoute role="siswa">
              <DashboardLayout>
                <HomeClass />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/forum"
          element={
            <ProtectedRoute role="siswa">
              <DashboardLayout>
                <DashboardForum />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/forum/:classId"
          element={
            <ProtectedRoute role="siswa">
              <DashboardLayout>
                <ClassForum />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/class/:id/material/:cid/latihan/:lid"
          element={
            <ProtectedRoute role="siswa">
              <DashboardLayout>
                <DetailTugasSiswa />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/class/:id/material/:cid/latihan/:lid/submisi/:sid"
          element={
            <ProtectedRoute role="siswa">
              <DashboardLayout>
                <ResultTugasSiswa />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
