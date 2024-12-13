import DashboardLayout from "../../../components/layout/DashboardLayout";
import BorderBoxCard from "../../../components/card/BorderBoxCard";
import { useState } from "react";

export default function ResultQuizSiswa() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const quizQuestions = [
    {
      question: "Apa ibu kota Indonesia?",
      options: ["Jakarta", "Surabaya", "Bandung", "Yogyakarta"],
    },
    {
      question: "Gunung tertinggi di dunia adalah?",
      options: [
        "Gunung Kilimanjaro",
        "Gunung Everest",
        "Gunung K2",
        "Gunung Denali",
      ],
    },
    {
      question: "Siapakah penemu bola lampu?",
      options: [
        "Nikola Tesla",
        "Thomas Edison",
        "Alexander Graham Bell",
        "Albert Einstein",
      ],
    },
    {
      question: "Gunung tertinggi di dunia adalah?",
      options: [
        "Gunung Kilimanjaro",
        "Gunung Everest",
        "Gunung K2",
        "Gunung Denali",
      ],
    },
    {
      question: "Siapakah penemu bola lampu?",
      options: [
        "Nikola Tesla",
        "Thomas Edison",
        "Alexander Graham Bell",
        "Albert Einstein",
      ],
    },
    {
      question: "Gunung tertinggi di dunia adalah?",
      options: [
        "Gunung Kilimanjaro",
        "Gunung Everest",
        "Gunung K2",
        "Gunung Denali",
      ],
    },
    {
      question: "Siapakah penemu bola lampu?",
      options: [
        "Nikola Tesla",
        "Thomas Edison",
        "Alexander Graham Bell",
        "Albert Einstein",
      ],
    },
  ];

  const handleJumpQuestion = (nextIndex) => {
    setCurrentIndex(nextIndex);
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="font-medium text-xl">Kelas</h1>
        <h1 className="text-sm">
          {"Kelas > Detail Pelajaran > "}
          <span className="font-medium border-b-2 border-blue-600 w-fit ml-1">
            {"Quiz"}
          </span>
        </h1>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-7 bg-white h-fit rounded-t-md p-8">
            <div>
              <h1 className="font-bold text-lg">
                Selamat, Kamu Telah Menyelesaikan Quiz dan Materi!
              </h1>
              <h2 className="font-bold mt-4">Skor</h2>
              <p className="font-semibold text-sm mt-4">Bagus Sekali!</p>
              <p className="text-sm">
                Kamu sudah memahami sebagian besar materi tentang rotasi Bumi
                dan akibatnya. Terus belajar agar semakin paham, ya!
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-2 mt-8">
              <div className="flex justify-center w-full mb-4 md:w-2/6">
                <div className="flex justify-center items-center w-40 h-40 rounded-full bg-blue-gradient">
                  <div className="flex justify-center items-center w-32 h-32 rounded-full bg-white">
                    <div className="flex justify-center items-center w-24 h-24 rounded-full bg-blue-gradient shadow-2xl">
                      <p className="font-bold text-white text-4xl">80</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center w-full md:w-4/6">
                <BorderBoxCard color="blue">
                  <p className="text-sm">Jawaban Benar</p>
                  <p className="font-bold">8/10</p>
                </BorderBoxCard>
                <BorderBoxCard color="blue">
                  <p className="text-sm">Waktu Mengerjakan</p>
                  <p className="font-bold">04:23</p>
                </BorderBoxCard>
              </div>
            </div>
            <h2 className="font-bold mt-8 mb-4">Ringkasan</h2>
            <div className="flex gap-2 overflow-x-auto">
              {quizQuestions.map((item, index) => (
                <div key={index} className="w-fit">
                  <BorderBoxCard
                    color="green"
                    clickable={true}
                    selected={currentIndex === index}
                    handler={() => handleJumpQuestion(index)}
                  >
                    {index + 1}
                  </BorderBoxCard>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h1 className="font-semibold text-lg">
                {quizQuestions[currentIndex].question}
              </h1>
              <div className="mt-2">
                {quizQuestions[currentIndex].options.map((item, index) => (
                  <BorderBoxCard key={index} color="stone">
                    <p>{item}</p>
                  </BorderBoxCard>
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="bg-white p-8 rounded-md">
              <h2 className="font-bold text-lg">Rekomendasi Untukmu!</h2>
              <div>
                <h3 className="text-md font-semibold my-2">
                  Pelajari Ulang Materi yang Salah
                </h3>
                <BorderBoxCard color="blue">
                  <p className="font-semibold text-sm">Gerak semu matahari</p>
                  <p className="text-sm">
                    Cari tahu kenapa matahari terlihat bergerak dari timur ke
                    barat meskipun yang berputar adalah Bumi.
                  </p>
                </BorderBoxCard>
                <BorderBoxCard color="blue">
                  <p className="font-semibold text-sm">
                    Efek rotasi bumi lainnya
                  </p>
                  <p className="text-sm">
                    Pelajari bagaimana rotasi Bumi memengaruhi arah angin atau
                    gerakan air laut.
                  </p>
                </BorderBoxCard>
              </div>
              <div>
                <h3 className="text-md font-semibold my-2">
                  Ikuti Quiz Kembali
                </h3>
                <BorderBoxCard color="purple">
                  <p className="text-sm">
                    Latihan lagi dengan mengikuti quiz kembali. Targetkan nilai
                    sempurna pada percobaan berikutnya!
                  </p>
                </BorderBoxCard>
              </div>
              <div>
                <h3 className="text-md font-semibold my-2">
                  Diskusikan dengan Teman-teman
                </h3>
                <BorderBoxCard color="yellow">
                  <p className="text-sm">
                    Kamu bisa belajar lebih banyak melalui forum dengan
                    mendengar penjelasan dari teman-teman dan gurumu.
                  </p>
                </BorderBoxCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}