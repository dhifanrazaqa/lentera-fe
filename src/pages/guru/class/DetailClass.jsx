import { Link, useParams } from "react-router-dom";
import {
  useFetchDetailClass,
  useDeleteContent,
} from "../../../hooks/useClassQuery";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import ContentCard from "../../../components/card/ContentCard";
import useAuthStore from "../../../store/authStore";

const DetailClass = () => {
  const { id } = useParams();
  const { data: classDetail, isLoading, isError } = useFetchDetailClass(id);
  const user = useAuthStore((state) => state.user);
  const deleteContent = useDeleteContent();

  const handleDeleteContent = (contentId) => {
    deleteContent.mutate({ contentId, id });
  };

  if (isLoading) return <p>Loading class details...</p>;
  if (isError) return <p>Error fetching class details.</p>;

  return (
    <DashboardLayout>
      <div>
        <h1 className="font-medium text-xl">Dashboard</h1>
        <h1>
          {"Dashboard >"}
          <span className="font-medium text-sm border-b-2 border-blue-600 w-fit ml-1">
            {"Detail Pelajaran"}
          </span>
        </h1>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-3">
            <img
              src={classDetail.data.imageUrl}
              className="w-full h-44 sm:h-96 object-cover rounded-t-md mb-1"
              alt="Murid Icon"
            />
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <div>
                <h2 className="font-semibold mb-1">{classDetail.data.name}</h2>
                <h2 className="text-sm mb-1">{classDetail.data.teach.name}</h2>
              </div>
              <Link
                to="students"
                className="flex items-center justify-center bg-transparent border-2 border-blue-600 text-blue-600 p-2 rounded-lg"
              >
                Lihat Daftar Murid
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="ml-1 size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-2">
              <div className="md:col-span-3 bg-white rounded-md p-4">
                <h2 className="font-semibold mb-1">Penjelasan Singkat</h2>
                <p>{classDetail.data.description}</p>
              </div>
              <div className="md:col-span-2">
                <div className="col-span-3 bg-white rounded-md p-4">
                  <h2 className="font-semibold mb-1">Tentang Guru</h2>
                  <div className="flex flex-row items-center gap-2">
                    <div className="rounded-full h-10 w-10 bg-blue-400"></div>
                    <p className="font-medium">{classDetail.data.teach.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-5">
              <h2 className="font-bold text-start mb-2 md:mb-0">Peta Materi</h2>
              <Link
                to="content/create"
                state={{ title: classDetail.data.name }}
                className="flex items-center justify-center w-full md:w-fit bg-blue-gradient p-2 rounded-md text-white text-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Tambah Bagian
              </Link>
            </div>
            {classDetail.data.contents.map((item, index) => (
              <ContentCard
                key={index}
                isGuru={user.role === "guru"}
                title={classDetail.data.name}
                content={item}
                handleDelete={handleDeleteContent}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DetailClass;
