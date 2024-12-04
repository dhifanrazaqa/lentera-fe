import { useParams } from "react-router-dom";
import { useFetchDetailClass } from "../../../hooks/useClassQuery";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import SampleClass from "../../../assets/images/sample_class.png";

const DetailClass = () => {
  const { id } = useParams();
  const { data: classDetail, isLoading, isError } = useFetchDetailClass(id);
  console.log(classDetail);
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
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <h2 className="font-semibold mb-1">{classDetail.data.name}</h2>
            <h2 className="text-sm mb-1">{classDetail.data.teach.name}</h2>
            <img
              src={SampleClass}
              className="rounded-t-md mb-1"
              alt="Murid Icon"
            />
            <div className="grid grid-cols-5 gap-4 mt-2">
              <div className="col-span-3 bg-white rounded-md p-4">
                <h2 className="font-semibold mb-1">Penjelasan Singkat</h2>
                <p>{classDetail.data.description}</p>
              </div>
              <div className="col-span-2">
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
          <div className="col-span-2">
            <h2 className="font-semibold">Peta Materi</h2>
            
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DetailClass;
