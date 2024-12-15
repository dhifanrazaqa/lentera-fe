import TextField from "../../../components/fields/TextField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Alert from "../../../components/card/Alert";
import { useCreateContent } from "../../../hooks/useClassQuery";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const addContentSchema = z.object({
  title: z.string().nonempty("Judul tidak boleh kosong"),
  body: z.string().nonempty("Deskripsi tidak boleh kosong"),
});

export default function CreateContent() {
  const { id } = useParams();
  const location = useLocation();
  const { title } = location.state;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addContentSchema),
  });

  const createContent = useCreateContent();
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");
  const [visibleError, setVisibleError] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onCreateContent = async (formData) => {
    formData.classId = id;
    setIsLoading(true);
    createContent.mutate(formData, {
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
        navigate(`/dashboard/class/${id}`);
        setIsLoading(false);
      },
    });
  };

  return (
    <div>
      <h1 className="font-medium text-xl">Kelas</h1>
      <h1>
        {"Kelas > Detail Pelajaran > "}
        <span className="font-medium text-sm border-b-2 border-blue-600 w-fit ml-1">
          {"Tambah Bagian"}
        </span>
      </h1>
      <br />
      <div className="">
        <form onSubmit={handleSubmit(onCreateContent)} className="">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-6 text-start">
              {title}
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
              id="title"
              label="Judul Bagian"
              placeholder="Masukkan judul bagian"
              register={register}
              error={errors.title?.message}
              isLoading={isLoading}
            />
            <TextField
              type="description"
              id="body"
              label="Deskripsi Materi"
              height="80px"
              placeholder="Masukkan deskripsi bagian"
              register={register}
              error={errors.body?.message}
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
                {isLoading ? "Loading.." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
