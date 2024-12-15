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
import {
  getAssignmentId,
  getContentbyId,
  submitAssignment,
} from "../../../api/class";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../../components/layout/LoadingPage";
import { useCheckSubmissions } from "../../../hooks/useClassQuery";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_FILE_TYPES = ["application/pdf"];

//FUNCTION YG DIBUTUHIN LOGIKA -------------------------------------------------------------------------------------------------------------
const formatDate = (date) => {
  const formattedDate = new Date(date);
  formattedDate.setHours(23);
  formattedDate.setMinutes(59);

  return formattedDate
    .toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "")
    .replace("pukul", ",");
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
  const hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
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

export default function DetailTugasSiswa() {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SubmitLatihanSchema),
  });

  const { id: classId, cid: contentId, lid: assignmentId } = useParams(); //GET -------------------------------------------------------------------------------------------------------------
  /*const assignmentId = "22c92918-838b-44a1-96c8-8890588dc62f";  //Ubah dari parameter FE
  const classId = "94d9967e-c0d7-48b8-87ce-d01a4f6e2259";      //Ubah dari Parameter FE
  const contentId = "ea0a9eac-97c1-441d-ad77-636d3587a50c";   //Ubah dari Parameter FE
  */
  const {
    data: checkSubmission,
    isLoadingSubmission,
    isErrorSubmission,
  } = useCheckSubmissions(assignmentId);

  const navigate = useNavigate();
  const [assignmentData, setAssignmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [headerData, setHeaderData] = useState(null);

  //FETCH DATA -------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (assignmentId && classId && contentId) {
      const fetchAssignmentData = async () => {
        setIsLoading(true);
        try {
          const [assignmentData, headerData] = await Promise.all([
            getAssignmentId({ assignmentId }),
            getContentbyId(classId, contentId),
          ]);
          setAssignmentData(assignmentData);
          setHeaderData(headerData);
        } catch (err) {
          console.error("Error fetching assignment data:", err);
          setError("Error fetching assignment data.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchAssignmentData();
    }
  }, [assignmentId, classId, contentId]);

  if (isLoading || isLoadingSubmission) return <LoadingPage />;
  if (error || isErrorSubmission) return <LoadingPage />;

  if (checkSubmission) {
    console.log(checkSubmission);
    return navigate(
      `/class/${classId}/material/${contentId}/latihan/${assignmentId}/submisi/${checkSubmission.data.id}`
    );
  }

  const Mulai = formatDate(assignmentData?.data?.startDate);
  const Selesai = formatDate(assignmentData?.data?.deadline);
  const Waktu = getRemainingTime(assignmentData?.data?.deadline);

  //RESPON API -------------------------------------------------------------------------------------------------------------

  const onSubmitTugas = async (formData) => {
    setIsLoading(true);

    const file = formData.file[0];
    const fileUrl = await uploadToCloudinary(file);
    delete formData.file;

    formData.assignmentId = assignmentId;
    formData.fileUrl = fileUrl;

    const submissionData = {
      assignmentId: assignmentId,
      text: formData.text,
      fileUrl: fileUrl,
    };

    try {
      const result = await submitAssignment(submissionData);
      navigate(
        `/class/${classId}/material/${contentId}/latihan/${assignmentId}/submisi/${result.data.id}`
      );
      console.log("Assignment submitted successfully:", result);
    } catch (err) {
      console.error("Error submitting assignment:", err);
    }
    setIsLoading(false);
    //Tambahin pindah scene Kembali
  };

  const OnClick = () => {
    console.log("Tombol AddForumButton ditekan!");
    const fileUrl = assignmentData?.data?.fileUrl;

    if (fileUrl) {
      window.location.href = fileUrl;
    } else {
      console.log("File URL tidak ditemukan");
    }
  };

  // -------------------------------------------------------------------------------------------------------------

  return (
    <div className="flex flex-col">
      <h1 className="font-medium text-xl">Kelas</h1>
      <h2 className="text-sm font-medium text-gray-900 mb-3">
        Kelas &gt; Detail Pelajaran &gt;{" "}
        <span className="border-b-2 border-b-[#0068FF]">Kumpulkan Tugas</span>
      </h2>
      <div className="bg-white rounded-lg flex flex-col p-5">
        <h1 className="font-bold text-xl mb-1">
          {" "}
          {headerData?.contents?.title}{" "}
        </h1>
        <h2 className="font-semibold text-sm mb-4">
          {" "}
          {assignmentData?.data?.title}{" "}
        </h2>
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
        <form onSubmit={handleSubmit(onSubmitTugas)}>
          <div>
            <h2 className="font-medium text-sm mt-4 mb-2">File Tugas</h2>
            <NormalButton
              type="button"
              onClick={OnClick}
              height="2rem"
              width="10rem"
            >
              <img src={pdfIcon} alt="Icon" className="w-5 h-5" />
              <h1 className="text-white text-xs font-normal ml-2">
                Lihat Instruksi Tugas
              </h1>
            </NormalButton>
            <div className="mt-4">
              <FileUploadField
                id="file"
                label="Unggah Instruksi Tugas"
                accept=".pdf"
                error={errors.file?.message}
                setValue={setValue}
                isLoading={isLoading}
              />
            </div>
            <Controller
              name="text"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  id="text"
                  label=""
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.text?.message}
                />
              )}
            />
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className={`content-end px-4 py-2 text-white ${
                  isLoading ? "bg-gray-400" : "bg-blue-gradient"
                } rounded-lg hover: ${
                  isLoading ? "bg-gray-400" : "bg-blue-600"
                } focus:outline-none focus:ring focus:ring-blue-200`}
                disabled={isLoading}
              >
                {isLoading ? "Loading.." : "Kumpulkan Tugas"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
