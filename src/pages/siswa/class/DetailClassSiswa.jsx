import { useParams } from "react-router-dom";
import {
  useAddStudentClass,
  useFetchDetailClass,
  useFetchStatusClass,
} from "../../../hooks/useClassQuery";
import ContentCard from "../../../components/card/ContentCard";
import LoadingPage from "../../../components/layout/LoadingPage";
import useAuthStore from "../../../store/authStore";
import Alert from "../../../components/card/Alert";
import { useState } from "react";

const DetailClassSiswa = () => {
  const { id } = useParams();
  const { data: classDetail, isLoading, isError } = useFetchDetailClass(id);
  const {
    data: classStatus,
    isLoadingStatus,
    isErrorStatus,
  } = useFetchStatusClass(id);
  const addStudentClass = useAddStudentClass();
  const user = useAuthStore((state) => state.user);

  const [serverError, setServerError] = useState("");
  const [visibleError, setVisibleError] = useState(true);

  const handleAddStudent = () => {
    const formData = {
      studentId: user.id,
      classId: classDetail.data.id,
    };

    addStudentClass.mutate(formData, {
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message ||
          "Terjadi kesalahan. Silakan coba lagi.";
        setVisibleError(true);
        setServerError(errorMessage);
      },
      onSuccess: () => {
        setServerError("");
        setVisibleError(false);
      },
    });
  };

  if (isLoading || isLoadingStatus) return <LoadingPage />;
  if (isError || isErrorStatus) return <LoadingPage />;
  if (!classStatus || !classStatus.data) return <LoadingPage />;

  return (
    <div>
      <h1 className="font-medium text-xl">Dashboard</h1>
      <h1>
        {"Dashboard >"}
        <span className="font-medium text-sm border-b-2 border-blue-600 w-fit ml-1">
          {"Detail Pelajaran"}
        </span>
      </h1>
      <br />
      {serverError && (
        <Alert
          type="error"
          message={serverError}
          visible={visibleError}
          setVisible={setVisibleError}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3">
          <div className="flex flex-col md:flex-row justify-between mb-2">
            <div>
              <h2 className="font-semibold mb-1">{classDetail.data.name}</h2>
              <h2 className="text-sm mb-1">{classDetail.data.teach.name}</h2>
            </div>
            {classStatus.data.status !== "acc" &&
              (classStatus.data.status === "wait" ? (
                <button
                  onClick={handleAddStudent}
                  className="flex justify-center items-center bg-transparent text-stone-400 border-stone-400 border rounded-md font-medium gap-2 p-2"
                >
                  <p>Menunggu Diterima</p>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_516_296)">
                      <path
                        d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21509 0.913451 7.4078C0.00519943 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.8071 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0866C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6935 24 14.3734 24 12C23.9966 8.81846 22.7312 5.76821 20.4815 3.51852C18.2318 1.26883 15.1815 0.00344108 12 0V0ZM12 22C10.0222 22 8.08879 21.4135 6.4443 20.3147C4.79981 19.2159 3.51809 17.6541 2.76121 15.8268C2.00433 13.9996 1.8063 11.9889 2.19215 10.0491C2.578 8.10929 3.53041 6.32746 4.92894 4.92893C6.32746 3.53041 8.10929 2.578 10.0491 2.19215C11.9889 1.8063 13.9996 2.00433 15.8268 2.7612C17.6541 3.51808 19.2159 4.79981 20.3147 6.4443C21.4135 8.08879 22 10.0222 22 12C21.9971 14.6513 20.9426 17.1931 19.0679 19.0679C17.1931 20.9426 14.6513 21.9971 12 22Z"
                        fill="#A1A9A6"
                      />
                      <path
                        d="M11.9999 6C11.7347 6 11.4804 6.10536 11.2928 6.29289C11.1053 6.48043 10.9999 6.73478 10.9999 7V11.325L7.62895 13.437C7.40351 13.5778 7.24326 13.8024 7.18343 14.0614C7.12361 14.3204 7.16912 14.5926 7.30995 14.818C7.45078 15.0434 7.67539 15.2037 7.93438 15.2635C8.19337 15.3233 8.46551 15.2778 8.69095 15.137L12.5309 12.737C12.676 12.6461 12.7953 12.5195 12.8775 12.3692C12.9596 12.219 13.0018 12.0502 12.9999 11.879V7C12.9999 6.73478 12.8946 6.48043 12.7071 6.29289C12.5195 6.10536 12.2652 6 11.9999 6Z"
                        fill="#A1A9A6"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_516_296">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleAddStudent}
                  className="flex justify-center items-center bg-blue-gradient text-white rounded-md font-medium gap-2 p-2"
                >
                  <p>Daftar Sekarang</p>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.9021 12.5341C20.9995 12.2789 21.0249 11.998 20.9753 11.7271C20.9256 11.4562 20.803 11.2073 20.6231 11.012L15.4799 5.42631C15.3613 5.29294 15.2194 5.18656 15.0626 5.11337C14.9057 5.04019 14.737 5.00166 14.5662 5.00005C14.3955 4.99844 14.2262 5.03377 14.0682 5.10399C13.9102 5.1742 13.7666 5.27789 13.6459 5.409C13.5252 5.54012 13.4297 5.69603 13.365 5.86765C13.3004 6.03926 13.2678 6.22315 13.2693 6.40856C13.2708 6.59398 13.3063 6.77722 13.3737 6.94759C13.4411 7.11796 13.539 7.27205 13.6618 7.40086L16.6114 10.6043H4.2858C3.94478 10.6043 3.61773 10.7514 3.3766 11.0133C3.13547 11.2752 3 11.6303 3 12.0007C3 12.3711 3.13547 12.7262 3.3766 12.9881C3.61773 13.25 3.94478 13.3971 4.2858 13.3971H16.6114L13.6631 16.5991C13.5403 16.728 13.4423 16.882 13.375 17.0524C13.3076 17.2228 13.2721 17.406 13.2706 17.5914C13.2691 17.7769 13.3017 17.9607 13.3663 18.1324C13.431 18.304 13.5264 18.4599 13.6472 18.591C13.7679 18.7221 13.9115 18.8258 14.0695 18.896C14.2275 18.9662 14.3968 19.0016 14.5675 18.9999C14.7383 18.9983 14.907 18.9598 15.0639 18.8866C15.2207 18.8134 15.3626 18.7071 15.4812 18.5737L20.6244 12.988C20.7435 12.858 20.8379 12.7038 20.9021 12.5341Z"
                      fill="white"
                    />
                  </svg>
                </button>
              ))}
          </div>
          <img
            src={classDetail.data.imageUrl}
            className="w-full h-44 sm:h-96 object-cover rounded-t-md mb-1"
            alt="Murid Icon"
          />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-2">
            <div className="md:col-span-3 bg-white rounded-md p-4">
              <h2 className="font-semibold mb-1">Penjelasan Singkat</h2>
              <p>{classDetail.data.description}</p>
            </div>
            <div className="md:col-span-2">
              <div className="col-span-3 bg-white rounded-md p-4">
                <h2 className="font-semibold mb-1">Tentang Guru</h2>
                <div className="flex flex-row items-center gap-2">
                  <img
                    src="https://i.pinimg.com/originals/98/1d/6b/981d6b2e0ccb5e968a0618c8d47671da.jpg"
                    alt="profile"
                    className="w-10 h-10 rounded-full bg-blue-400"
                  />
                  <p className="font-medium">{classDetail.data.teach.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-5">
            <h2 className="font-bold text-start mb-2 md:mb-0">Peta Materi</h2>
          </div>
          {classDetail.data.contents.map((item, index) => (
            <ContentCard
              key={index}
              title={classDetail.data.name}
              content={item}
              handleDelete={() => {}}
              isAcc={classStatus.data.status === "acc"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailClassSiswa;
