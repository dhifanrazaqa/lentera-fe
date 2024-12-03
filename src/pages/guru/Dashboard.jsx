import { Link, Navigate } from "react-router-dom";
import { logout } from "../../api/auth";

import useAuthStore from "../../store/authStore";
import StatsCard from "../../components/card/StatsCard";

import MuridImage from "../../assets/images/murid_img.png";
import KelasImage from "../../assets/images/kelas_img.png";
import BukuImage from "../../assets/images/buku_img.png";
import TugasImage from "../../assets/images/tugas_img.png";
import ClassCard from "../../components/card/ClassCard";
import { useFetchClasses } from "../../hooks/useClassQuery";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function Dashboard() {
  const logoutStore = useAuthStore((state) => state.logout);
  const userStore = useAuthStore((state) => state.user);

  const { data: classes, isLoading, isError } = useFetchClasses();

  const handleClick = () => {
    if (userStore) {
      console.log(userStore);
      alert(`User: ${userStore}`);
    } else {
      alert("No user is logged in.");
    }
  };

  const handleLogout = async () => {
    await logout();
    logoutStore();
    alert("Anda berhasil logout");
    <Navigate to="/login" replace />;
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching classes.</p>;

  return (
    <DashboardLayout>
      <div>
        <h1 className="font-medium text-xl">Dashboard</h1>
        <h1 className="font-medium text-sm border-b-2 border-blue-600 w-fit">
          Dashboard
        </h1>
        <br />
        <div className="grid grid-cols-4 gap-4 mb-4">
          <StatsCard image={MuridImage} label="Murid" value={60} />
          <StatsCard image={KelasImage} label="Kelas Berlangsung" value={3} />
          <StatsCard
            image={TugasImage}
            label="Tugas Perlu Dinilai"
            value={42}
          />
          <StatsCard image={BukuImage} label="Buku Dibuat" value={2} />
        </div>
        <Link
          to="/dashboard/class/create"
          className="bg-red-500 text-white px-4 py-2"
        >
          Add Class
        </Link>
        <div className="bg-white shadow-md rounded-md p-4 mb-4">
          <div className="font-bold text-lg">Kelasmu Saat Ini</div>
          <hr className="my-2" />
          <div className="grid grid-cols-4 gap-4">
            {classes.data.map((cls) => (
              <ClassCard key={cls.id} title={cls.name} />
            ))}
          </div>
        </div>
        <div className="bg-white shadow-md rounded-md p-4 mb-4">
          <div className="font-bold text-lg">Kelas dari Guru Lainnya</div>
          <hr className="my-2" />
          <div className="grid grid-cols-4 gap-4">
            <ClassCard title={"Sample"} />
            <ClassCard title={"Sample"} />
            <ClassCard title={"Sample"} />
            <ClassCard title={"Sample"} />
          </div>
        </div>
        <button
          onClick={handleClick}
          className="bg-red-500 text-white px-4 py-2"
        >
          User
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2"
        >
          Logout
        </button>
      </div>
    </DashboardLayout>
  );
}
