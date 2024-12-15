import TextField from "../../../components/fields/TextField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Alert from "../../../components/card/Alert";
import { useCreateClass } from "../../../hooks/useClassQuery";
import { useNavigate } from "react-router-dom";
import FileUploadField from "../../../components/fields/FileUploadField";
import uploadToCloudinary from "../../../utils/uploadImage";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const addClassSchema = z.object({
  name: z.string().nonempty("Nama kelas tidak boleh kosong"),
  description: z.string().nonempty("Deskripsi tidak boleh kosong"),
  file: z
    .any()
    .refine((files) => files?.length >= 1, { message: "Image is required." })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: ".jpg, .jpeg, .png and .webp files are accepted.",
    })
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max file size is 5MB.`,
    }),
});

export default function CreateClass() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addClassSchema),
  });

  const createClass = useCreateClass();
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");
  const [visibleError, setVisibleError] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onCreateClass = async (formData) => {
    setIsLoading(true);
    console.log(formData);

    const file = formData.file[0];
    const imageUrl = await uploadToCloudinary(file);

    delete formData.file;
    formData.imageUrl = imageUrl;

    createClass.mutate(formData, {
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message ||
          "Terjadi kesalahan. Silakan coba lagi.";
        setVisibleError(true);
        setServerError(errorMessage);
        setIsLoading(false);
      },
      onSuccess: () => {
        reset();
        setServerError("");
        navigate("/login");
        setIsLoading(false);
      },
    });
  };

  return (
    <div>
      <h1 className="font-medium text-xl">Kelas</h1>
      <h1>
        {"Kelas >"}
        <span className="font-medium text-sm border-b-2 border-blue-600 w-fit ml-1">
          {"Tambah Kelas"}
        </span>
      </h1>
      <br />
      <div className="">
        <form onSubmit={handleSubmit(onCreateClass)} className="">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-6 text-start">
              Membuat Kelas Baru
            </h2>
            {serverError && (
              <Alert
                type="error"
                message={serverError}
                visible={visibleError}
                setVisible={setVisibleError}
              />
            )}
            <TextField
              type="text"
              id="name"
              label="Nama Kelas"
              placeholder="Masukkan nama kelas"
              register={register}
              error={errors.name?.message}
              isLoading={isLoading}
            />
            <FileUploadField
              id="file"
              label="Unggah Dokumen"
              accept=".png,.jpg,.jpeg"
              error={errors.file?.message}
              register={register}
              isLoading={isLoading}
              setValue={setValue}
            />
            <TextField
              type="description"
              id="description"
              label="Deskripsi Kelas"
              height="80px"
              placeholder="Masukkan deskripsi kelas"
              register={register}
              error={errors.description?.message}
              isLoading={isLoading}
            />

            {/* Tombol Masuk */}
            <div className="flex justify-end">
              <button
                type="submit"
                className={`content-end px-4 py-2 text-white ${
                  isLoading ? "bg-gray-400" : "bg-blue-gradient"
                } rounded-lg hover: ${
                  isLoading ? "bg-gray-400" : "bg-blue-600"
                } focus:outline-none focus:ring focus:ring-blue-200`}
                disabled={isLoading}
              >
                {isLoading ? "Loading.." : "Buat Kelas"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
