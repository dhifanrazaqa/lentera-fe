import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useDeleteStudentClass,
  useFetchStudentsClass,
  useUpdateStudentStatus,
} from "../../../hooks/useClassQuery";
import LoadingPage from "../../../components/layout/LoadingPage";

export default function StudentClass() {
  const { id } = useParams();
  const { data: studentsClass, isLoading, isError } = useFetchStudentsClass(id);
  const updateStudentStatus = useUpdateStudentStatus();
  const deleteStudentClass = useDeleteStudentClass();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("acc");

  const filteredData =
    studentsClass?.data?.filter((item) => {
      const matchesSearch =
        item.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = item.status === filterStatus;

      return matchesSearch && matchesStatus;
    }) || [];

  if (isLoading) return <LoadingPage />;
  if (isError) return <LoadingPage />;

  const onUpdateStudentStatus = (formData) => {
    updateStudentStatus.mutate({ updatedStudent: formData });
  };

  const handleDelete = (student) => {
    deleteStudentClass.mutate({ student });
  };

  return (
    <div>
      <h1 className="font-medium text-xl">Kelas</h1>
      <h1>
        {"Kelas > Detail Pelajaran > "}
        <span className="font-medium text-sm border-b-2 border-blue-600 w-fit ml-1">
          {"Daftar Murid"}
        </span>
      </h1>
      <br />
      <div className="overflow-x-auto w-full bg-white shadow rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4 px-4 py-2">
            <button
              onClick={() => setFilterStatus("acc")}
              className={`${
                filterStatus === "acc" ? "border-blue-500" : "border-gray-200"
              } ${
                filterStatus === "acc" ? "text-blue-500" : "text-gray-400"
              } text-sm border-b-2 font-semibold p-2`}
            >
              Diterima
            </button>
            <button
              onClick={() => setFilterStatus("wait")}
              className={`${
                filterStatus === "wait" ? "text-blue-500" : "text-gray-400"
              } text-sm border-b-2 ${
                filterStatus === "wait" ? "border-blue-500" : "border-gray-200"
              } font-semibold p-2`}
            >
              Belum Diterima
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Cari murid"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-96 border-2 bg-gray-50 border-gray-300 rounded-md pl-8 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute top-3 sm:inset-y-0 left-0 flex items-center pl-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="gray"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <table className="min-w-full border-collapse border-b-2 border-gray-200">
          <thead>
            <tr className="bg-gray-50 text-gray-500 font-extrabold px-4 py-5">
              <th className="border-b-2 border-gray-20 px-4 py-5 text-left">
                NO.
              </th>
              <th className="border-b-2 border-gray-200 px-4 py-5 text-left">
                NAMA
              </th>
              <th className="border-b-2 border-gray-200 px-4 py-5 text-left">
                EMAIL
              </th>
              <th className="border-b-2 border-gray-200 px-4 py-5 text-center">
                AKSI
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No data available
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item.user.id} className="hover:bg-gray-50">
                  <td className="border-b-2 border-gray-200 px-4 py-5 text-left">
                    {index + 1}
                  </td>
                  <td className="border-b-2 border-gray-200 px-4 py-5">
                    {item.user.name}
                  </td>
                  <td className="border-b-2 border-gray-200 px-4 py-5">
                    {item.user.email}
                  </td>
                  <td className="border-b-2 border-gray-200 px-4 py-5 text-center">
                    {item.status === "wait" && (
                      <button
                        onClick={() =>
                          onUpdateStudentStatus({
                            studentId: item.user.id,
                            classId: item.classId,
                          })
                        }
                        className="rounded-full p-2 bg-blue-gradient hover:bg-blue-900 mx-2"
                      >
                        <svg
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_182_6534)">
                            <path
                              d="M5.16613 14.5756C4.71195 14.5757 4.27638 14.3952 3.9555 14.0738L0.295374 10.415C-0.098458 10.0211 -0.098458 9.38247 0.295374 8.98851C0.689332 8.59468 1.32794 8.59468 1.72189 8.98851L5.16613 12.4327L14.2781 3.32076C14.6721 2.92693 15.3107 2.92693 15.7046 3.32076C16.0985 3.71472 16.0985 4.35333 15.7046 4.74729L6.37675 14.0738C6.05587 14.3952 5.6203 14.5757 5.16613 14.5756Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_182_6534">
                              <rect
                                width="16"
                                height="16"
                                fill="white"
                                transform="translate(0 0.800781)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() =>
                        handleDelete({
                          studentId: item.user.id,
                          classId: item.classId,
                        })
                      }
                      className="rounded-full p-2 bg-stone-200 hover:bg-stone-300 "
                    >
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_135_3907)">
                          <path
                            d="M14.0002 2.70523H11.9335C11.6145 1.15429 10.2502 0.0405742 8.66681 0.0385742H7.33346C5.75006 0.0405742 4.38575 1.15429 4.06681 2.70523H2.00015C1.63196 2.70523 1.3335 3.0037 1.3335 3.37189C1.3335 3.74007 1.63196 4.03857 2.00015 4.03857H2.66681V12.7052C2.66903 14.5453 4.16012 16.0364 6.00015 16.0386H10.0002C11.8402 16.0364 13.3313 14.5453 13.3335 12.7052V4.03857H14.0002C14.3683 4.03857 14.6668 3.74011 14.6668 3.37192C14.6668 3.00373 14.3683 2.70523 14.0002 2.70523ZM7.3335 11.3719C7.3335 11.7401 7.03503 12.0386 6.66684 12.0386C6.29862 12.0386 6.00015 11.7401 6.00015 11.3719V7.37192C6.00015 7.00373 6.29862 6.70526 6.66681 6.70526C7.035 6.70526 7.33346 7.00373 7.33346 7.37192V11.3719H7.3335ZM10.0002 11.3719C10.0002 11.7401 9.70168 12.0386 9.3335 12.0386C8.96531 12.0386 8.66684 11.7401 8.66684 11.3719V7.37192C8.66684 7.00373 8.96531 6.70526 9.3335 6.70526C9.70168 6.70526 10.0002 7.00373 10.0002 7.37192V11.3719ZM5.4475 2.70523C5.73106 1.90676 6.48618 1.37292 7.3335 1.37189H8.66684C9.51415 1.37292 10.2693 1.90676 10.5528 2.70523H5.4475Z"
                            fill="#374957"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_135_3907">
                            <rect
                              width="16"
                              height="16"
                              fill="white"
                              transform="translate(0 0.0385742)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
