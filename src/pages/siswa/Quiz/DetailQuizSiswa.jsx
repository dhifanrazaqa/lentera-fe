import DashboardLayout from "../../../components/layout/DashboardLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import QuizBodyCard from "../../../components/card/QuizBodyCard";
import QuizNumbering from "../../../components/card/QuizNumbering";

const schema = z.object({
  text: z.string().nonempty("Field tidak boleh kosong"),
});

export default function DetailQuizSiswa() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

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
      question: "Planet terbesar di tata surya kita adalah?",
      options: ["Bumi", "Mars", "Jupiter", "Saturnus"],
    },
    {
      question: "Planet terbesar di tata surya kita adalah?",
      options: ["Bumi", "Mars", "Jupiter", "Saturnus"],
    },
    {
      question: "Planet terbesar di tata surya kita adalah?",
      options: ["Bumi", "Mars", "Jupiter", "Saturnus"],
    },
    {
      question: "Planet terbesar di tata surya kita adalah?",
      options: ["Bumi", "Mars", "Jupiter", "Saturnus"],
    },
    {
      question: "Planet terbesar di tata surya kita adalah?",
      options: ["Bumi", "Mars", "Jupiter", "Saturnus"],
    },
    {
      question: "Planet terbesar di tata surya kita adalah?",
      options: ["Bumi", "Mars", "Jupiter", "Saturnus"],
    },
    {
      question: "Planet terbesar di tata surya kita adalah?",
      options: ["Bumi", "Mars", "Jupiter", "Saturnus"],
    },
    {
      question: "Planet terbesar di tata surya kita adalah?",
      options: ["Bumi", "Mars", "Jupiter", "Saturnus"],
    },
    {
      question: "Planet terbesar di tata surya kita adalah?",
      options: ["Bumi", "Mars", "Jupiter", "Saturnus"],
    },
  ];

  const [isLoading, setIsLoading] = useState(false);

  const onAskQuestion = async (formData) => {
    setIsLoading(true);
    console.log(formData);
    setIsLoading(false);
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

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
          <div className="md:col-span-8">
            <QuizBodyCard
              currentNumber={currentIndex + 1}
              maxNumber={quizQuestions.length}
              quizData={quizQuestions[currentIndex]}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
            />
          </div>
          <div className="hidden md:flex md:col-span-4">
            <div
              className={`bg-white p-8 rounded-md  overflow-y-scroll ${
                quizQuestions.length > 9 ? "h-[calc(100vh-220px)]" : "h-fit"
              }`}
            >
              {quizQuestions.map((item, index) => (
                <QuizNumbering
                  key={index}
                  number={index + 1}
                  currentNumber={currentIndex + 1}
                  text={item.question}
                  handleJumpQuestion={handleJumpQuestion}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
