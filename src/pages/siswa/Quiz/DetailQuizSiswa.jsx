import { useEffect, useState } from "react";
import QuizBodyCard from "../../../components/card/QuizBodyCard";
import QuizNumbering from "../../../components/card/QuizNumbering";
import {
  useAnsweringQuestion,
  useFetchAnweredData,
  useFetchFinalResult,
  useFetchQuizData,
} from "../../../hooks/useClassQuery";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../../components/card/Alert";
import LoadingPage from "../../../components/layout/LoadingPage";

export default function DetailQuizSiswa() {
  const { id } = useParams();
  const { data: quizData, isLoadingQuiz, isErrorQuiz } = useFetchQuizData(id);
  const {
    data: answeredData,
    isLoadingAnswered,
    isErrorAnswered,
  } = useFetchAnweredData(id);
  const answeringQuestion = useAnsweringQuestion();
  const getFinalResult = useFetchFinalResult();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [serverError, setServerError] = useState("");
  const [visibleError, setVisibleError] = useState(true);

  useEffect(() => {
    if (answeredData) {
      setSelectedAnswer(answeredData.data.answers);
    }
  }, [answeredData]);

  const handleNext = () => {
    let currentAnswer = selectedAnswer.find(
      (ans) => ans.questionId === quizData.data.Question[currentIndex].id
    );

    if (currentAnswer) {
      delete currentAnswer.text;
      delete currentAnswer.id;
      currentAnswer.attemptId = answeredData.data.id;

      answeringQuestion.mutate(currentAnswer, {
        onError: (error) => {
          const errorMessage =
            error.response?.data?.message ||
            "Terjadi kesalahan. Silakan coba lagi.";
          setVisibleError(true);
          setServerError(errorMessage);
        },
        onSuccess: () => {
          if (currentIndex < quizData.data.Question.length - 1) {
            setCurrentIndex(currentIndex + 1);
          }
        },
      });
    } else {
      if (currentIndex < quizData.data.Question.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const handlePrevious = () => {
    let currentAnswer = selectedAnswer.find(
      (ans) => ans.questionId === quizData.data.Question[currentIndex].id
    );

    if (currentAnswer) {
      delete currentAnswer.text;
      delete currentAnswer.id;
      currentAnswer.attemptId = answeredData.data.id;

      answeringQuestion.mutate(currentAnswer, {
        onError: (error) => {
          const errorMessage =
            error.response?.data?.message ||
            "Terjadi kesalahan. Silakan coba lagi.";
          setVisibleError(true);
          setServerError(errorMessage);
        },
        onSuccess: () => {
          if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
          }
        },
      });
    } else {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const handleJumpQuestion = (nextIndex) => {
    let currentAnswer = selectedAnswer.find(
      (ans) => ans.questionId === quizData.data.Question[currentIndex].id
    );

    if (currentAnswer) {
      delete currentAnswer.text;
      delete currentAnswer.id;
      currentAnswer.attemptId = answeredData.data.id;

      answeringQuestion.mutate(currentAnswer, {
        onError: (error) => {
          const errorMessage =
            error.response?.data?.message ||
            "Terjadi kesalahan. Silakan coba lagi.";
          setVisibleError(true);
          setServerError(errorMessage);
        },
        onSuccess: () => {
          setCurrentIndex(nextIndex);
        },
      });
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const handleFinish = () => {
    handleNext();

    const formData = {
      attemptId: answeredData.data.id,
    };

    getFinalResult.mutate(formData, {
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message ||
          "Terjadi kesalahan. Silakan coba lagi.";
        setVisibleError(true);
        setServerError(errorMessage);
      },
      onSuccess: (result) => {
        navigate("result", { state: result.data });
      },
    });
  };

  if (isLoadingQuiz || isLoadingAnswered) return <LoadingPage />;
  if (isErrorQuiz || isErrorAnswered) return <LoadingPage />;
  if (!quizData || !quizData.data) return <LoadingPage />;

  return (
    <div>
      <h1 className="font-medium text-xl">Kelas</h1>
      <h1 className="text-sm">
        {"Kelas > Detail Pelajaran > "}
        <span className="font-medium border-b-2 border-blue-600 w-fit ml-1">
          {"Quiz"}
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
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8">
          <QuizBodyCard
            currentNumber={currentIndex + 1}
            maxNumber={quizData.data.Question.length}
            quizData={quizData.data.Question[currentIndex]}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            handleFinish={handleFinish}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
          />
        </div>
        <div className="hidden md:flex md:col-span-4">
          <div
            className={`bg-white w-full p-8 rounded-md  overflow-y-scroll ${
              quizData.data.Question.length > 9
                ? "h-[calc(100vh-220px)]"
                : "h-fit"
            }`}
          >
            {quizData.data.Question.map((item, index) => (
              <QuizNumbering
                key={index}
                number={index + 1}
                currentNumber={currentIndex + 1}
                text={item.text}
                handleJumpQuestion={handleJumpQuestion}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
