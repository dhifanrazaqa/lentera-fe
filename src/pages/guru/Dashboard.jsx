import { Link, Navigate } from "react-router-dom";
import { logout } from "../../api/auth";

import useAuthStore from "../../store/authStore";
import StatsCard from "../../components/card/StatsCard";

import MuridImage from "../../assets/images/murid_img.png";
import KelasImage from "../../assets/images/kelas_img.png";
import ForumImage from "../../assets/images/forum_img.png";
import TugasImage from "../../assets/images/tugas_img.png";
import ClassCard from "../../components/card/ClassCard";
import { useFetchClasses, useFetchStats } from "../../hooks/useClassQuery";
import LoadingPage from "../../components/layout/LoadingPage";
import { useQueryClient } from "@tanstack/react-query";

export default function Dashboard() {
  const logoutStore = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  const { data: classes, isLoading, isError } = useFetchClasses();
  const { data: stats, isLoadingStat, isErrorStat } = useFetchStats();

  const handleLogout = async () => {
    await logout();
    queryClient.invalidateQueries();
    logoutStore();
    <Navigate to="/login" replace />;
  };

  if (isLoading || isLoadingStat) return <LoadingPage />;
  if (isError || isErrorStat) return <LoadingPage />;
  if (!stats || !stats.data) return <LoadingPage />;

  return (
    <div>
      <h1 className="font-medium text-xl">Dashboard</h1>
      <h1 className="font-medium text-sm border-b-2 border-blue-600 w-fit">
        Dashboard
      </h1>
      <br />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <StatsCard image={MuridImage} label="Murid" value={stats.data.jumlahMurid} />
        <StatsCard image={KelasImage} label="Kelas Berlangsung" value={stats.data.jumlahKelas} />
        <StatsCard image={TugasImage} label="Tugas Perlu Dinilai" value={stats.data.jumlahSubmission} />
        <StatsCard image={ForumImage} label="Interaksi Forum" value={stats.data.jumlahForum} />
      </div>
      <div className="sm:bg-white sm:shadow-md sm:rounded-md sm:p-4 mb-4">
        <div className="flex justify-between">
          <p className="font-bold text-lg">Kelasmu Saat Ini</p>{" "}
          <Link
            to={"/dashboard/class"}
            className="border-2 text-xs p-1 rounded-md hover:bg-stone-200 cursor-pointer"
          >
            Lihat Semua
          </Link>
        </div>
        <hr className="my-2" />
        <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:space-x-0 gap-4">
          {classes.data.userData.slice(0, 4).map((cls) => (
            <div key={cls.id}>
              <ClassCard classData={cls} width="w-44" />
            </div>
          ))}
        </div>
      </div>
      <div className="sm:bg-white sm:shadow-md sm:rounded-md sm:p-4 mb-4">
        <div className="flex justify-between">
          <p className="font-bold text-lg">Kelas dari Guru Lainnya</p>{" "}
          <Link
            to={"/dashboard/class"}
            className="border-2 text-xs p-1 rounded-md hover:bg-stone-200 cursor-pointer"
          >
            Lihat Semua
          </Link>
        </div>
        <hr className="my-2" />
        <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:space-x-0 gap-4">
          {classes.data.allData.slice(0, 4).map((cls) => (
            <div key={cls.id}>
              <ClassCard classData={cls} width="w-44" />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2"
      >
        Logout
      </button>
    </div>
  );
}
