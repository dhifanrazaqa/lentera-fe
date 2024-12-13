import { useState } from "react";
import RichTextEditor from "../fields/RichTextField";
import PropTypes from "prop-types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Alert from "../card/Alert";
import { useParams } from "react-router-dom";

const isContentEmpty = (content) => {
  const strippedContent = content.replace(/<\/?[^>]+(>|$)/g, "").trim();
  return strippedContent === "";
};

const schema = z.object({
  text: z.string().refine((value) => !isContentEmpty(value), {
    message: "Text is required",
  }),
});

export default function SummaryMaterialPopup({ setIsOpen }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { classId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [serverError] = useState("");
  const [visibleError, setVisibleError] = useState(true);

  const onCreatePostForum = async (formData) => {
    setIsLoading(true);
    formData.classId = classId;
    // createForum.mutate(formData, {
    //   onError: (error) => {
    //     const errorMessage =
    //       error.response?.data?.message ||
    //       "Terjadi kesalahan. Silakan coba lagi.";
    //     setVisibleError(true);
    //     setServerError(errorMessage);
    //     setIsLoading(false);
    //   },
    //   onSuccess: () => {
    //     setServerError("");
    //     setIsOpen(false);
    //     setIsLoading(false);
    //   },
    // });
  };

  return (
    <div className="flex flex-col bg-white">
      <form onSubmit={handleSubmit(onCreatePostForum)}>
        <div className="flex items-center justify-between p-2">
          <div className="flex gap-4">
            <button onClick={() => setIsOpen(false)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.5002 9.9997C30.1876 9.68724 29.7638 9.51172 29.3219 9.51172C28.8799 9.51172 28.4561 9.68724 28.1435 9.9997L20.5002 17.643L12.8569 9.9997C12.5443 9.68724 12.1205 9.51172 11.6785 9.51172C11.2366 9.51172 10.8127 9.68724 10.5002 9.9997C10.1877 10.3122 10.0122 10.7361 10.0122 11.178C10.0122 11.62 10.1877 12.0438 10.5002 12.3564L18.1435 19.9997L10.5002 27.643C10.1877 27.9556 10.0122 28.3794 10.0122 28.8214C10.0122 29.2633 10.1877 29.6872 10.5002 29.9997C10.8127 30.3122 11.2366 30.4877 11.6785 30.4877C12.1205 30.4877 12.5443 30.3122 12.8569 29.9997L20.5002 22.3564L28.1435 29.9997C28.4561 30.3122 28.8799 30.4877 29.3219 30.4877C29.7638 30.4877 30.1876 30.3122 30.5002 29.9997C30.8126 29.6872 30.9882 29.2633 30.9882 28.8214C30.9882 28.3794 30.8126 27.9556 30.5002 27.643L22.8569 19.9997L30.5002 12.3564C30.8126 12.0438 30.9882 11.62 30.9882 11.178C30.9882 10.7361 30.8126 10.3122 30.5002 9.9997V9.9997Z"
                  fill="#374957"
                />
              </svg>
            </button>
            <h2 className="font-bold">Berikan ringkasan materi yang kamu ketahui</h2>
          </div>
          <button
            type="submit"
            className={`content-end px-4 py-2 h-fit text-white ${
              isLoading ? "bg-gray-400" : "bg-blue-gradient"
            } rounded-lg hover: ${
              isLoading ? "bg-gray-400" : "bg-blue-600"
            } focus:outline-none focus:ring focus:ring-blue-200`}
            disabled={isLoading}
          >
            {isLoading ? "Loading.." : "Kirim Ringkasan"}
          </button>
        </div>
        {serverError && (
          <Alert
            type="error"
            message={serverError}
            visible={visibleError}
            setVisible={setVisibleError}
          />
        )}
        <div>
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
        </div>
      </form>
    </div>
  );
}

SummaryMaterialPopup.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};
