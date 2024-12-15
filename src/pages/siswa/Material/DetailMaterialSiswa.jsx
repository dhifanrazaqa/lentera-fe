import TextField from "../../../components/fields/TextField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import BubbleChat from "../../../components/card/BubbleChat";
import SummaryMaterialPopup from "../../../components/popup/SummaryMaterialPopup";

const schema = z.object({
  text: z.string().nonempty("Field tidak boleh kosong"),
});

export default function DetailMaterialSiswa() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onAskQuestion = async (formData) => {
    setIsLoading(true);
    console.log(formData);
    setIsLoading(false);
  };

  return (
    <div>
      <h1 className="font-medium text-xl">Kelas</h1>
      <h1 className="text-sm">
        {isOpen
          ? "Kelas > Detail Pelajaran > Materi > "
          : "Kelas > Detail Pelajaran > "}
        <span className="font-medium border-b-2 border-blue-600 w-fit ml-1">
          {isOpen ? "Ringkasan" : "Materi"}
        </span>
      </h1>
      <br />
      {isOpen ? (
        <SummaryMaterialPopup setIsOpen={setIsOpen} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-7">
            <div className="bg-white h-screen rounded-t-md">
              <div className="flex justify-between items-center rounded-md shadow-lg p-4">
                <h1 className="font-bold text-lg">Rotasi Bumi dan Akibatnya</h1>
                <button
                  onClick={() => setIsOpen(true)}
                  className="text-white bg-blue-gradient rounded-lg p-2"
                >
                  Selesaikan Materi
                </button>
              </div>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="bg-white p-8 rounded-md">
              <h2 className="font-bold text-lg">
                Apa yang belum kamu mengerti?
              </h2>
              <p className="text-sm">
                Tanya aku mengenai materi yang sedang kamu simak, untuk cari
                tahu lebih banyak!
              </p>
              <div className="my-4">
                <BubbleChat text="Garis khayalan itu seperti apa?" />
                <p className="text-sm">
                  Garis khayalan adalah garis yang tidak benar-benar ada, tetapi
                  kita bayangkan ada untuk membantu menjelaskan sesuatu.
                  <br />
                  <br />
                  Contohnya, poros Bumi disebut sebagai garis khayalan. Garis
                  ini tidak terlihat, tetapi kita anggap ada di tengah-tengah
                  Bumi dari Kutub Utara ke Kutub Selatan. Garis ini membantu
                  kita memahami bagaimana Bumi berputar. Jadi, walaupun kita
                  tidak bisa melihat atau menyentuhnya, garis khayalan itu
                  penting untuk menjelaskan cara kerja Bumi.
                </p>
                <BubbleChat
                  text="Garis khayalan adalah garis yang tidak benar-benar ada, tetapi
                  kita bayangkan ada untuk membantu menjelaskan sesuatu."
                />
              </div>
              <form onSubmit={handleSubmit(onAskQuestion)}>
                <div className="flex items-center gap-2">
                  <div className="w-full h-12">
                    <TextField
                      type="text"
                      id="text"
                      label=""
                      placeholder="Ketik pertanyaanmu"
                      register={register}
                      error={errors.text?.message}
                      isLoading={isLoading}
                    />
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
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.061 9.52513L13.475 5.93913C13.1936 5.65786 12.812 5.49991 12.4141 5.5C12.0163 5.50009 11.6348 5.65823 11.3535 5.93963C11.0722 6.22102 10.9143 6.60262 10.9144 7.00048C10.9145 7.39834 11.0726 7.77986 11.354 8.06113L13.793 10.5001H5C4.60218 10.5001 4.22064 10.6582 3.93934 10.9395C3.65804 11.2208 3.5 11.6023 3.5 12.0001C3.5 12.398 3.65804 12.7795 3.93934 13.0608C4.22064 13.3421 4.60218 13.5001 5 13.5001H13.793L11.354 15.9391C11.0726 16.2204 10.9145 16.6019 10.9144 16.9998C10.9143 17.3976 11.0722 17.7792 11.3535 18.0606C11.6348 18.342 12.0163 18.5002 12.4141 18.5003C12.812 18.5003 13.1936 18.3424 13.475 18.0611L17.061 14.4751C17.7162 13.8181 18.0842 12.928 18.0842 12.0001C18.0842 11.0722 17.7162 10.1822 17.061 9.52513V9.52513Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
