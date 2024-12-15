import ClassCard from "../../../components/card/ClassCard";
import { useFetchClasses } from "../../../hooks/useClassQuery";
import LoadingPage from "../../../components/layout/LoadingPage";

export default function HomeClass() {
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
            <ClassCard url="/class/" key={cls.id} classData={cls} width="" />
          ))}
        </div>
      </div>
      <div className="sm:bg-white sm:shadow-md rounded-md sm:p-4 mb-4">
        <div className="font-bold text-lg">Menunggu Diterima</div>
        <hr className="my-2" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
          {classes.data.waitClass.map((cls) => (
            <ClassCard url="/class/" key={cls.id} classData={cls} width="" />
          ))}
        </div>
      </div>
      <div className="sm:bg-white sm:shadow-md rounded-md sm:p-4 mb-4">
        <div className="font-bold text-lg">Semua Kelas</div>
        <hr className="my-2" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
          {classes.data.allData.map((cls) => (
            <ClassCard url="/class/" key={cls.id} classData={cls} width="" />
          ))}
        </div>
      </div>
    </div>
  );
}
