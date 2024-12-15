import { useFetchClasses } from "../../../hooks/useClassQuery";
import ForumCard from "../../../components/card/ForumCard";
import LoadingPage from "../../../components/layout/LoadingPage";

export default function DashboardForum() {
  const { data: classes, isLoading, isError } = useFetchClasses();

  if (isLoading) return <LoadingPage />;
  if (isError) return <LoadingPage />;

  return (
    <div>
      <h1 className="font-medium text-xl">Forum</h1>
      <h1 className="font-medium text-sm border-b-2 border-blue-600 w-fit">
        Daftar Forum
      </h1>
      <br />
      <div className="sm:bg-white sm:shadow-md sm:rounded-md sm:p-4 mb-4">
        <div className="font-bold text-lg">Forum dari Kelasmu Saat Ini</div>
        <hr className="my-2" />
        <div className="flex flex-col">
          {classes.data.userData.map((cls) => (
            <ForumCard key={cls.id} classData={cls} />
          ))}
        </div>
      </div>
    </div>
  );
}
