import DashboardLayout from "../../../components/layout/DashboardLayout";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { z } from "zod";
import NormalButton from "../../../components/button/NormalButton";
import pdfIcon from "../../../assets/icon/PDF.png";
import "../../../../node_modules/react-quill/dist/quill.snow.css";
import FileUploadField from "../../../components/fields/FileUploadField";
import RichTextEditor from "../../../components/fields/RichTextField";
import uploadToCloudinary from "../../../utils/uploadImage";
import { getAssignmentId, getContentbyId, submitAssignment, getSubmissionsId } from "../../../api/class";
import { useLocation, useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_FILE_TYPES = ["application/pdf"];

const formatDate = (date) => {
  const formattedDate = new Date(date);
  formattedDate.setHours(23);
  formattedDate.setMinutes(59);

  return formattedDate
    .toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(',', '') 
    .replace('pukul', ','); 
};

const getRemainingTime = (endDate) => {
  const now = new Date();
  const start = new Date();
  const end = new Date(endDate);

  const remainingTime = end - now;

  if (remainingTime <= 0) {
    return "Waktu habis";
  }

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  return `${days} hari ${hours} jam ${minutes} menit`;
};

const isContentEmpty = (content) => {
  const strippedContent = content.replace(/<\/?[^>]+(>|$)/g, "").trim();
  return strippedContent === "";
};

//VALIDATION ZOD -------------------------------------------------------------------------------------------------------------

const SubmitLatihanSchema = z.object({
  file: z
    .any()
    .refine((files) => files?.length >= 1, { message: "File is required." })
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), {
      message: ".pdf only Accepted.",
    })
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max file size is 5MB.`,
    }),
  text: z.string().refine((value) => !isContentEmpty(value), {
    message: "Content is required",
  }),
});

//MAIN -------------------------------------------------------------------------------------------------------------

export default function ResultTugasSiswa() {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SubmitLatihanSchema),
  });

  const { id: classId, cid: contentId, lid: assignmentId, sid: submissionId } = useParams();
  /*
  const assignmentId = "22c92918-838b-44a1-96c8-8890588dc62f";  //Ubah dari parameter FE
  const classId = "94d9967e-c0d7-48b8-87ce-d01a4f6e2259";      //Ubah dari Parameter FE
  const contentId = "ea0a9eac-97c1-441d-ad77-636d3587a50c";   //Ubah dari Parameter FE 
  const submissionId =  "fdb17694-7873-46f0-b14e-da5899adeb6a" */

  const [assignmentData, setAssignmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [headerData, setHeaderData] = useState(null);
  const [submissionsId, setSubmissionsId] = useState(submissionId); // Ambil dari Parameter FE
  const [submissionData, setSubmissions] = useState(null);


//FETCH DATA -------------------------------------------------------------------------------------------------------------

useEffect(() => {
  if (assignmentId && classId && contentId) {
    const fetchAssignmentData = async () => {
      setIsLoading(true);
      try {
        const [assignmentData, headerData, submissionData] = await Promise.all([
          getAssignmentId({ assignmentId }),
          getContentbyId(classId, contentId),
          getSubmissionsId(submissionsId),  
        ]);
        setAssignmentData(assignmentData);
        setHeaderData(headerData);
        setSubmissions(submissionData);
      } catch (err) {
        console.error("Error fetching assignment data:", err);
        setError("Error fetching assignment data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAssignmentData();
  }
}, [assignmentId, classId, contentId, submissionsId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const Mulai = formatDate(assignmentData?.data?.startDate);
  const Selesai = formatDate(assignmentData?.data?.deadline);
  const Waktu = getRemainingTime(assignmentData?.data?.deadline);


  const OnClick = () => {
    console.log(submissionData);
    console.log("Back!");
  };

// -------------------------------------------------------------------------------------------------------------

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <h1 className="font-medium text-xl">Kelas</h1>
        <h2 className="text-sm font-medium text-gray-900 mb-3">
          Kelas &gt; Detail Pelajaran &gt;{" "}
          <span className="border-b-2 border-b-[#0068FF]">Kumpulkan Tugas</span>
        </h2>
        <div className="bg-white rounded-lg flex flex-col p-5">
          <h1 className="font-bold text-xl mb-1"> {headerData?.contents?.title} </h1>
          <h2 className="font-semibold text-sm mb-4"> {assignmentData?.data?.title} </h2>
          <div className="flex flex-row">
            <h3 className="font-medium text-xs mr-4">
              <span className="font-bold">Dibuka:</span> {Mulai}
            </h3>
            <h3 className="font-medium text-xs">
              <span className="font-bold">Ditutup:</span> {Selesai}
            </h3>
          </div>
          <h2 className="font-medium text-sm mt-4">Sisa Waktu Tugas</h2>
          <h2 className="font-normal text-xs mt-4 ml-4"> {Waktu} </h2>
          <h2 className="font-medium text-sm mt-4">Deskripsi Tugas</h2>
          <h2 className="font-normal text-xs mt-4 text-justify ml-4">
            {assignmentData?.data?.description}
          </h2>
          <form>
            <div>
              <h2 className="font-medium text-sm mt-4 mb-2">File Tugas</h2>
              <p className="font-2xl mt-4 mb-4 ml-5"> - </p>
              <div className="flex flex-row">
                  <NormalButton width="5rem" height="3rem">
                      <p className="text-white text-base font-sm">Pilih File</p>
                  </NormalButton>
                  <div className="w-full ml-2 rounded-lg bg-gray-200 flex justify-start items-center">
                  <a
                    href={submissionData?.data?.fileUrl}
                    download
                    className="text-gray-400 ml-3 text-s font-l"
                  >
                    Unduh
                  </a>
                  </div>
              </div>

              <h2 className="font-medium text-sm mt-4 mb-2">Nilai </h2>
              <p className="font-bold text-xl mt-4 mb-4 ml-5 text-green-500"> {submissionData?.data?.grade} </p>

              <div className="mt-4">
              </div>

              <div className="w-full min-h-[40rem] rounded-lg bg-white shadow-md">
                <div className=" border-gray-400 p-4 bg-gray-200 rounded-tl-lg rounded-tr-lg flex justify-center items-center shadow-md">
                  <p className="text-lg font-semibold">Jawaban</p>
                </div>
                <div className="p-4 pl-[20%] pr-[20%]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, nemo eaque similique consequatur, doloribus laboriosam commodi, cumque iusto nulla veniam culpa ducimus. Voluptatem, dignissimos itaque. Minima amet, sapiente tenetur possimus voluptatibus doloribus eligendi consequuntur a porro dicta, molestias necessitatibus quaerat eaque praesentium cupiditate, dolor corporis debitis et iure deserunt nihil nemo libero? Soluta eius atque distinctio nam sed eaque eum voluptates maiores nemo vitae deleniti dolor nihil molestias recusandae omnis, voluptate et tempora quia ab, accusamus voluptatibus? Vel quasi, sed temporibus deserunt consequuntur nesciunt ipsum, dolore totam placeat recusandae, officiis ea nisi et! Est, harum necessitatibus excepturi quisquam pariatur sapiente.
                </div>
            </div>

              <div className="flex justify-end mt-4">
                <button
                  type="Button"
                  onClick={OnClick}
                  className={`content-end px-4 py-2 text-white ${
                    isLoading ? "bg-gray-400" : "bg-blue-gradient"
                  } rounded-lg hover: ${
                    isLoading ? "bg-gray-400" : "bg-blue-600"
                  } focus:outline-none focus:ring focus:ring-blue-200`}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading.." : "Kembali"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
