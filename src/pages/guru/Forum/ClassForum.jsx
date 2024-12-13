import DashboardLayout from "../../../components/layout/DashboardLayout";
import ForumPostCard from "../../../components/card/ForumPostCard";
import ForumDetailCard from "../../../components/card/ForumDetailCard";
import { useState } from "react";
import AddForumPopup from "../../../components/popup/AddForumPopup";
import { useFetchForums } from "../../../hooks/useForumQuery";
import { useParams } from "react-router-dom";
import { useFetchDetailClass } from "../../../hooks/useClassQuery";

export default function ClassForum() {
  const { classId } = useParams();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const {
    data: classData,
    isLoadingClass,
    isErrorClass,
  } = useFetchDetailClass(classId);
  const { data: forums, isLoading, isError } = useFetchForums(classId);

  if (isLoading || isLoadingClass) return <p>Loading...</p>;
  if (isError || isErrorClass) return <p>Error fetching data.</p>;

  if (!classData || !classData.data) return <p>Loading...</p>;

  return (
    <DashboardLayout>
      <div>
        <h1 className="font-medium text-xl">Forum</h1>
        <h1>
          {"Daftar Forum > "}
          <span className="font-medium text-sm border-b-2 border-blue-600 w-fit ml-1">
            {"Detail Forum"}
          </span>
        </h1>
        <br />
        {isAddOpen ? (
          <AddForumPopup setIsAddOpen={setIsAddOpen} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-4">
            <div className="grid sm:col-span-8 order-last sm:-order-last">
              {forums.data.length !== 0 &&
                forums.data.map((frm) => (
                  <ForumPostCard key={frm.id} forumData={frm} />
                ))}
            </div>
            <div className="grid sm:col-span-4">
              <ForumDetailCard
                forumData={classData.data}
                setIsAddOpen={setIsAddOpen}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
