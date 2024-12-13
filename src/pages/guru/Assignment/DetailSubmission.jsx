import { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { useParams } from "react-router-dom";
import { useFetchSubmissions } from "../../../hooks/useClassQuery";

export default function DetailSubmission() {
  const { classId, assignmentId } = useParams();
  console.log(classId, assignmentId);
  const {
    data: usersClass,
    isLoading,
    isError,
  } = useFetchSubmissions(classId, assignmentId);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData =
    usersClass?.data?.filter((item) => {
      const matchesSearch =
        item.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.user.email.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    }) || [];

  if (isLoading) return <p>Loading class details...</p>;
  if (isError) return <p>Error fetching class details.</p>;

  return (
    <DashboardLayout>
      <div>
        <h1 className="font-medium text-xl">Kelas</h1>
        <h1>
          {"Kelas > Detail Pelajaran > "}
          <span className="font-medium text-sm border-b-2 border-blue-600 w-fit ml-1">
            {"Daftar Murid"}
          </span>
        </h1>
        <br />
        <div className="w-full bg-white shadow rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4 px-4 py-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari murid"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-96 border-2 bg-gray-50 border-gray-300 rounded-md pl-8 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-2">
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
                  FILE
                </th>
                <th className="border-b-2 border-gray-200 px-4 py-5 text-center">
                  STATUS
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
                    <td className="border-b-2 border-gray-200 px-4 py-5">
                      {item.fileUrl !== null ? (
                        <div className="flex justify-center ">
                          <p className="flex rounded-md w-fit px-4 py-2 font-medium bg-gray-100 gap-2">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_267_7762)">
                                <path
                                  d="M11.667 5.83333V0.383333C12.4379 0.674446 13.1381 1.12609 13.7212 1.70833L16.6245 4.61333C17.2074 5.19573 17.6594 5.89575 17.9503 6.66667H12.5003C12.2793 6.66667 12.0674 6.57887 11.9111 6.42259C11.7548 6.26631 11.667 6.05435 11.667 5.83333ZM18.3337 8.7375V15.8333C18.3323 16.938 17.8929 17.997 17.1118 18.7782C16.3307 19.5593 15.2717 19.9987 14.167 20H5.83366C4.729 19.9987 3.66996 19.5593 2.88884 18.7782C2.10773 17.997 1.66832 16.938 1.66699 15.8333V4.16667C1.66832 3.062 2.10773 2.00296 2.88884 1.22185C3.66996 0.440735 4.729 0.00132321 5.83366 0L9.59616 0C9.73199 0 9.86616 0.0108333 10.0003 0.02V5.83333C10.0003 6.49637 10.2637 7.13226 10.7326 7.6011C11.2014 8.06994 11.8373 8.33333 12.5003 8.33333H18.3137C18.3228 8.4675 18.3337 8.60167 18.3337 8.7375ZM11.667 15.8333C11.667 15.6123 11.5792 15.4004 11.4229 15.2441C11.2666 15.0878 11.0547 15 10.8337 15H6.66699C6.44598 15 6.23402 15.0878 6.07774 15.2441C5.92146 15.4004 5.83366 15.6123 5.83366 15.8333C5.83366 16.0543 5.92146 16.2663 6.07774 16.4226C6.23402 16.5789 6.44598 16.6667 6.66699 16.6667H10.8337C11.0547 16.6667 11.2666 16.5789 11.4229 16.4226C11.5792 16.2663 11.667 16.0543 11.667 15.8333ZM14.167 12.5C14.167 12.279 14.0792 12.067 13.9229 11.9107C13.7666 11.7545 13.5547 11.6667 13.3337 11.6667H6.66699C6.44598 11.6667 6.23402 11.7545 6.07774 11.9107C5.92146 12.067 5.83366 12.279 5.83366 12.5C5.83366 12.721 5.92146 12.933 6.07774 13.0893C6.23402 13.2455 6.44598 13.3333 6.66699 13.3333H13.3337C13.5547 13.3333 13.7666 13.2455 13.9229 13.0893C14.0792 12.933 14.167 12.721 14.167 12.5Z"
                                  fill="#374957"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_267_7762">
                                  <rect width="20" height="20" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                            File Tugas
                          </p>
                        </div>
                      ) : (
                        <p>Belum ada file</p>
                      )}
                    </td>
                    <td className="border-b-2 border-gray-200 px-4 py-5 text-center">
                      <div className="flex justify-center ">
                        {item.user.Submission.length !== 0 ? (
                          <p
                            className={`rounded-md w-fit px-2 font-semibold ${
                              item.user.Submission[0].status === "late"
                                ? "bg-red-400 text-red-700"
                                : "bg-green-200 text-green-700"
                            }`}
                          >
                            {item.user.Submission[0].status}
                          </p>
                        ) : (
                          <p
                            className={`rounded-md w-fit px-2 font-semibold bg-yellow-200 text-yellow-700`}
                          >
                            Belum Mengerjakan
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
