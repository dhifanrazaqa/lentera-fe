import DashboardLayout from "../../../components/layout/DashboardLayout";
import TextField from "../../../components/fields/TextField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Alert from "../../../components/card/Alert";
import { useCreateClass } from "../../../hooks/useClassQuery";
import { useNavigate } from "react-router-dom";

const addClassSchema = z.object({
  name: z.string().nonempty("Nama kelas tidak boleh kosong"),
  description: z.string().nonempty("Deskripsi tidak boleh kosong"),
});

export default function CreateClass() {
  const {
    register,
    handleSubmit,
    reset,
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
    <DashboardLayout>
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
    </DashboardLayout>
  );
}
