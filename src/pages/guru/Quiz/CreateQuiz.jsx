import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateQuiz } from "../../../hooks/useClassQuery";
import Alert from "../../../components/card/Alert";
import { useLocation, useNavigate } from "react-router-dom";

// Define Zod schema for validation dengan penambahan validasi yang lebih komprehensif
const quizSchema = z.object({
  title: z.string().min(1, "Judul quiz tidak boleh kosong"),
  description: z.string().min(1, "Deskripsi quiz tidak boleh kosong"),
  duration: z.number({ required_error: "Durasi quiz minimal 1 menit" }),
  questions: z
    .array(
      z.object({
        question: z.string().min(1, "Pertanyaan tidak boleh kosong"),
        options: z
          .array(
            z.object({
              text: z.string().min(1, "Pilihan jawaban tidak boleh kosong"),
            })
          )
          .min(2, "Minimal harus ada dua pilihan"),
        correctOption: z.number().min(0, "Pilih jawaban yang benar"),
      })
    )
    .min(1, "Minimal harus ada satu pertanyaan"),
});

export default function CreateQuiz() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      duration: 30,
      questions: [
        {
          question: "",
          options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
          correctOption: -1,
        },
      ],
    },
    resolver: zodResolver(quizSchema),
  });

  const CreateQuiz = useCreateQuiz();

  const navigate = useNavigate();
  const location = useLocation();
  const { content } = location.state;
  const path = location.pathname;

  const [serverError, setServerError] = useState("");
  const [visibleError, setVisibleError] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "questions",
  });

  // State untuk melacak pertanyaan yang dipilih
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const onSubmit = (formData) => {
    console.log("Uploaded Quiz:", formData);
    setIsLoading(true);

    formData.contentId = content.id;

    CreateQuiz.mutate(formData, {
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
        navigate(path.replace("/quiz/create", ""));
        setIsLoading(false);
      },
    });
  };

  const questions = watch("questions");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h1 className="font-medium text-xl">Kelas</h1>
        <h1>
          {"Kelas > Detail Pelajaran > "}
          <span className="font-medium text-sm border-b-2 border-blue-600 w-fit ml-1">
            {"Tambah Quiz"}
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
        <div className="flex flex-col md:flex-row p-4 gap-4">
          {/* Sidebar */}
          <div className="bg-white p-8 rounded-md w-full h-fit md:w-1/3">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Judul Quiz
              </label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Masukkan judul quiz"
                    className="w-full p-2 border rounded"
                  />
                )}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            {/* Quiz Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Deskripsi Quiz
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Masukkan deskripsi quiz (opsional)"
                    className="w-full p-2 border rounded h-24"
                  />
                )}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
            {/* Quiz Duration */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Durasi Quiz (menit)
              </label>
              <Controller
                name="duration"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    placeholder="Masukkan durasi quiz"
                    min="1"
                    className="w-full p-2 border rounded"
                  />
                )}
              />
              {errors.duration && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.duration.message}
                </p>
              )}
            </div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold mb-4">Soal Quiz</h2>
              {fields.length !== 0 && (
                <button
                  type="submit"
                  className={`content-end px-4 py-2 text-white ${
                    isLoading ? "bg-gray-400" : "bg-blue-gradient"
                  } rounded-lg hover: ${
                    isLoading ? "bg-gray-400" : "bg-blue-600"
                  } focus:outline-none focus:ring focus:ring-blue-200`}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading.." : "Unggah Quiz"}
                </button>
              )}
            </div>
            {fields.map((q, index) => (
              <div
                key={q.id}
                className={`p-2 border rounded-md mb-2 cursor-pointer ${
                  selectedQuestionIndex === index
                    ? "bg-blue-100 border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedQuestionIndex(index)}
              >
                <div className="flex justify-between">
                  <p className="font-semibold mb-2">Soal {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => {
                      remove(index);
                    }}
                    className="ml-2 p-2 rounded-full"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.9997 2.66666H11.933C11.614 1.11572 10.2497 0.002 8.66632 0H7.33298C5.74957 0.002 4.38526 1.11572 4.06632 2.66666H1.99966C1.63148 2.66666 1.33301 2.96513 1.33301 3.33331C1.33301 3.7015 1.63148 4 1.99966 4H2.66632V12.6667C2.66854 14.5067 4.15963 15.9978 5.99966 16H9.99966C11.8397 15.9978 13.3308 14.5067 13.333 12.6667V4H13.9997C14.3679 4 14.6663 3.70153 14.6663 3.33334C14.6663 2.96516 14.3679 2.66666 13.9997 2.66666ZM7.33301 11.3333C7.33301 11.7015 7.03454 12 6.66635 12C6.29813 12 5.99966 11.7015 5.99966 11.3333V7.33334C5.99966 6.96516 6.29813 6.66669 6.66632 6.66669C7.03451 6.66669 7.33298 6.96516 7.33298 7.33334V11.3333H7.33301ZM9.99966 11.3333C9.99966 11.7015 9.7012 12 9.33301 12C8.96482 12 8.66635 11.7015 8.66635 11.3333V7.33334C8.66635 6.96516 8.96482 6.66669 9.33301 6.66669C9.7012 6.66669 9.99966 6.96516 9.99966 7.33334V11.3333ZM5.44701 2.66666C5.73057 1.86819 6.4857 1.33434 7.33301 1.33331H8.66635C9.51366 1.33434 10.2688 1.86819 10.5524 2.66666H5.44701Z"
                        fill="#151C1A"
                      />
                    </svg>
                  </button>
                </div>
                <p
                  className={`overflow-hidden whitespace-nowrap text-ellipsis ${
                    !questions[index].question && "text-stone-400"
                  }`}
                >
                  {questions[index].question || "Klik untuk isi soal"}
                </p>
              </div>
            ))}
            <button
              type="button"
              className="flex w-full justify-center items-center gap-2 mt-4 p-2 bg-transparent text-blue-600 font-medium rounded-md border border-blue-600 hover:bg-blue-100"
              onClick={() => {
                append({
                  question: "",
                  options: [
                    { text: "" },
                    { text: "" },
                    { text: "" },
                    { text: "" },
                  ],
                  correctOption: -1,
                });
                setSelectedQuestionIndex(fields.length);
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_421_6893)">
                  <path
                    d="M19.25 9.25H11.75V1.75C11.75 1.05965 11.1904 0.5 10.5 0.5C9.80965 0.5 9.25 1.05965 9.25 1.75V9.25H1.75C1.05965 9.25 0.5 9.80965 0.5 10.5C0.5 11.1904 1.05965 11.75 1.75 11.75H9.25V19.25C9.25 19.9404 9.80965 20.5 10.5 20.5C11.1904 20.5 11.75 19.9404 11.75 19.25V11.75H19.25C19.9404 11.75 20.5 11.1904 20.5 10.5C20.5 9.80965 19.9404 9.25 19.25 9.25Z"
                    fill="url(#paint0_linear_421_6893)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_421_6893"
                    x1="10.5"
                    y1="20.5"
                    x2="10.5"
                    y2="0.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#0068FF" />
                    <stop offset="1" stopColor="#549AFF" />
                  </linearGradient>
                  <clipPath id="clip0_421_6893">
                    <rect
                      width="20"
                      height="20"
                      fill="white"
                      transform="translate(0.5 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              Tambah Pertanyaan
            </button>
          </div>

          {/* Form */}
          <div className="bg-white w-full h-fit rounded-md md:w-2/3 p-8">
            <h2 className="font-semibold mb-2">Pertanyaan</h2>
            {fields.length > 0 && (
              <div key={fields[selectedQuestionIndex].id} className="mb-4">
                <Controller
                  name={`questions.${selectedQuestionIndex}.question`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Masukkan pertanyaan"
                      className="w-full mb-4 p-2 border rounded"
                    />
                  )}
                />
                {errors.questions?.[selectedQuestionIndex]?.question && (
                  <p className="text-red-500 text-sm">
                    {errors.questions[selectedQuestionIndex].question.message}
                  </p>
                )}

                <h3 className="font-semibold mb-2">Pilihan Jawaban</h3>
                {questions[selectedQuestionIndex].options.map(
                  (option, oIndex) => (
                    <div key={oIndex} className="mb-2">
                      <div className="flex items-center ">
                        <Controller
                          name={`questions.${selectedQuestionIndex}.options.${oIndex}.text`}
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder={`Masukkan jawaban ${oIndex + 1}`}
                              className="flex-1 p-2 border rounded"
                            />
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const options =
                              questions[selectedQuestionIndex].options;
                            options.splice(oIndex, 1);
                            update(selectedQuestionIndex, {
                              ...questions[selectedQuestionIndex],
                              options,
                            });
                          }}
                          className="ml-2 p-2 bg-stone-300 hover:bg-stone-400 rounded-full"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.9997 2.66666H11.933C11.614 1.11572 10.2497 0.002 8.66632 0H7.33298C5.74957 0.002 4.38526 1.11572 4.06632 2.66666H1.99966C1.63148 2.66666 1.33301 2.96513 1.33301 3.33331C1.33301 3.7015 1.63148 4 1.99966 4H2.66632V12.6667C2.66854 14.5067 4.15963 15.9978 5.99966 16H9.99966C11.8397 15.9978 13.3308 14.5067 13.333 12.6667V4H13.9997C14.3679 4 14.6663 3.70153 14.6663 3.33334C14.6663 2.96516 14.3679 2.66666 13.9997 2.66666ZM7.33301 11.3333C7.33301 11.7015 7.03454 12 6.66635 12C6.29813 12 5.99966 11.7015 5.99966 11.3333V7.33334C5.99966 6.96516 6.29813 6.66669 6.66632 6.66669C7.03451 6.66669 7.33298 6.96516 7.33298 7.33334V11.3333H7.33301ZM9.99966 11.3333C9.99966 11.7015 9.7012 12 9.33301 12C8.96482 12 8.66635 11.7015 8.66635 11.3333V7.33334C8.66635 6.96516 8.96482 6.66669 9.33301 6.66669C9.7012 6.66669 9.99966 6.96516 9.99966 7.33334V11.3333ZM5.44701 2.66666C5.73057 1.86819 6.4857 1.33434 7.33301 1.33331H8.66635C9.51366 1.33434 10.2688 1.86819 10.5524 2.66666H5.44701Z"
                              fill="#151C1A"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setValue(
                              `questions.${selectedQuestionIndex}.correctOption`,
                              oIndex
                            );
                          }}
                          className={`ml-2 p-2 rounded-full hover:bg-stone-200 ${
                            questions[selectedQuestionIndex].correctOption ===
                            oIndex
                              ? "bg-green-600 text-white"
                              : "bg-stone-300"
                          }`}
                        >
                          {questions[selectedQuestionIndex].correctOption ===
                          oIndex ? (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_421_6983)">
                                <path
                                  d="M5.16613 13.7753C4.71195 13.7754 4.27638 13.5949 3.9555 13.2735L0.295374 9.61474C-0.098458 9.22078 -0.098458 8.58218 0.295374 8.18822C0.689332 7.79439 1.32794 7.79439 1.72189 8.18822L5.16613 11.6324L14.2781 2.52047C14.6721 2.12664 15.3107 2.12664 15.7046 2.52047C16.0985 2.91443 16.0985 3.55303 15.7046 3.94699L6.37675 13.2735C6.05587 13.5949 5.6203 13.7754 5.16613 13.7753Z"
                                  fill="white"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_421_6983">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          ) : (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_421_5267)">
                                <path
                                  d="M5.16613 13.7753C4.71195 13.7754 4.27638 13.5949 3.9555 13.2735L0.295374 9.61474C-0.098458 9.22078 -0.098458 8.58218 0.295374 8.18822C0.689332 7.79439 1.32794 7.79439 1.72189 8.18822L5.16613 11.6324L14.2781 2.52047C14.6721 2.12664 15.3107 2.12664 15.7046 2.52047C16.0985 2.91443 16.0985 3.55303 15.7046 3.94699L6.37675 13.2735C6.05587 13.5949 5.6203 13.7754 5.16613 13.7753Z"
                                  fill="#151C1A"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_421_5267">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          )}
                        </button>
                      </div>
                      {/* Error untuk pilihan jawaban */}
                      {errors.questions?.[selectedQuestionIndex]?.options && (
                        <p className="text-red-500 text-sm">
                          {errors.questions[selectedQuestionIndex].options[
                            oIndex
                          ]?.text?.message ||
                            errors.questions[selectedQuestionIndex].options
                              .message}
                        </p>
                      )}
                    </div>
                  )
                )}

                {/* Error untuk jawaban benar */}
                {questions[selectedQuestionIndex].correctOption === -1 && (
                  <p className="text-red-500 text-sm mt-2">
                    Pilih jawaban yang benar
                  </p>
                )}

                {/* Error minimal 2 opsi */}
                {questions[selectedQuestionIndex].options.length < 2 && (
                  <p className="text-red-500 text-sm mt-2">
                    Minimal 2 opsi jawaban
                  </p>
                )}

                <button
                  type="button"
                  className="flex w-full justify-center items-center gap-2 mt-4 p-2 bg-transparent text-blue-600 font-medium rounded-md border border-blue-600 hover:bg-blue-100"
                  onClick={() => {
                    const options = questions[selectedQuestionIndex].options;
                    options.push({ text: "" });
                    update(selectedQuestionIndex, {
                      ...questions[selectedQuestionIndex],
                      options,
                    });
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_421_6893)">
                      <path
                        d="M19.25 9.25H11.75V1.75C11.75 1.05965 11.1904 0.5 10.5 0.5C9.80965 0.5 9.25 1.05965 9.25 1.75V9.25H1.75C1.05965 9.25 0.5 9.80965 0.5 10.5C0.5 11.1904 1.05965 11.75 1.75 11.75H9.25V19.25C9.25 19.9404 9.80965 20.5 10.5 20.5C11.1904 20.5 11.75 19.9404 11.75 19.25V11.75H19.25C19.9404 11.75 20.5 11.1904 20.5 10.5C20.5 9.80965 19.9404 9.25 19.25 9.25Z"
                        fill="url(#paint0_linear_421_6893)"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_421_6893"
                        x1="10.5"
                        y1="20.5"
                        x2="10.5"
                        y2="0.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#0068FF" />
                        <stop offset="1" stopColor="#549AFF" />
                      </linearGradient>
                      <clipPath id="clip0_421_6893">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(0.5 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Tambah Pilihan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
