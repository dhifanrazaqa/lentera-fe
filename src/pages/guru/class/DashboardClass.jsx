import { Link } from "react-router-dom";
import ClassCard from "../../../components/card/ClassCard";
import { useFetchClasses } from "../../../hooks/useClassQuery";
import LoadingPage from "../../../components/layout/LoadingPage";

export default function DashboardClass() {
  const { data: classes, isLoading, isError } = useFetchClasses();

  if (isLoading) return <LoadingPage />;
  if (isError) return <LoadingPage />;

  return (
    <div>
      <h1 className="font-medium text-xl">Kelas</h1>
      <h1 className="font-medium text-sm border-b-2 border-blue-600 w-fit">
        Kelas
      </h1>
      <br />
      <div className="sm:bg-white sm:shadow-md rounded-md sm:p-4 mb-4">
        <div className="font-bold text-lg">Kelasmu Saat Ini</div>
        <hr className="my-2" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
          {classes.data.userData.map((cls) => (
            <ClassCard key={cls.id} classData={cls} width="" />
          ))}
          <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-md min-h-48">
            <h2 className="text-sm text-center font-semibold mb-2">
              Ingin membuat kelas baru?
            </h2>
            <Link
              to="create"
              className="flex items-center w-fit bg-blue-gradient p-2 rounded-md text-white text-center text-xs mb-2"
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
              Tambah Kelas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
