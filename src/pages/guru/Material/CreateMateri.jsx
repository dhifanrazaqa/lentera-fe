import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import Alert from "../../../components/card/Alert";
import { useCreateMaterial } from "../../../hooks/useClassQuery";
import { useLocation, useNavigate } from "react-router-dom";
import RichTextEditor from "../../../components/fields/RichTextField";

const isContentEmpty = (content) => {
  const strippedContent = content.replace(/<\/?[^>]+(>|$)/g, "").trim();
  return strippedContent === "";
};

const addClassSchema = z.object({
  text: z.string().refine((value) => !isContentEmpty(value), {
    message: "Content is required",
  }),
});

export default function CreateMateri() {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addClassSchema),
  });

  const location = useLocation();
  const { title, content } = location.state;
  const path = location.pathname;

  const createMaterials = useCreateMaterial();
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");
  const [visibleError, setVisibleError] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onCreateClass = async (formData) => {
    console.log(formData);

    formData.contentId = content.id;

    setIsLoading(true);

    createMaterials.mutate(formData, {
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
        navigate(path.replace("/material/create", ""));
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
          {"Tambah Materi"}
        </span>
      </h1>
      <br />
      <div className="">
        <form onSubmit={handleSubmit(onCreateClass)} className="">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 text-start">
              {title}
            </h2>
            <h4 className="text-md text-gray-700 mb-3 text-start">
              {content.title}
            </h4>
            {serverError && (
              <Alert
                type="error"
                message={serverError}
                visible={visibleError}
                setVisible={setVisibleError}
              />
            )}
            <Controller
              name="text"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  id="text"
                  label="Text"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.text?.message}
                />
              )}
            />

            {/* Tombol */}
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
                {isLoading ? "Loading.." : "Buat Materi"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
