import PropTypes from "prop-types";

const QuizBodyCard = ({
  handleNext,
  handlePrevious,
  handleFinish,
  currentNumber,
  maxNumber,
  quizData,
  selectedAnswer,
  setSelectedAnswer,
}) => {
  return (
    <div className="bg-white rounded-md p-8">
      <div className="flex justify-between mb-2">
        <div className="flex flex-col justify-between">
          <p className="text-xs text-blue-500 font-bold">{`Quiz ${currentNumber} dari ${maxNumber}`}</p>
          <p className="text-xs">
            Pilihlah jawaban yang tepat dari beberapa pilihan yang tersedia.
          </p>
        </div>
        <div className="border-2 border-blue-400 font-bold rounded-md p-2 text-blue-500">
          04:20
        </div>
      </div>
      <div className="mb-4">
        <h1 className="font-semibold text-lg">{quizData.text}</h1>
      </div>
      <div>
        {quizData.Answer.map((item, index) => (
          <AnswerCard
            key={index}
            answer={item}
            questionId={quizData.id}
            selectedAnswer={selectedAnswer.find(
              (ans) => ans.answerId === item.id
            )}
            setSelectedAnswer={setSelectedAnswer}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex gap-2">
          {currentNumber !== 1 && (
            <button
              onClick={handlePrevious}
              className="flex justify-center items-center rounded-full bg-white w-12 h-12 border-2 border-blue-400"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 11.9996C6.00487 11.4735 6.21684 10.9705 6.59 10.5996L10.88 6.29958C11.0674 6.11333 11.3208 6.00879 11.585 6.00879C11.8492 6.00879 12.1026 6.11333 12.29 6.29958C12.3837 6.39254 12.4581 6.50315 12.5089 6.625C12.5597 6.74686 12.5858 6.87757 12.5858 7.00958C12.5858 7.14159 12.5597 7.2723 12.5089 7.39416C12.4581 7.51602 12.3837 7.62662 12.29 7.71958L9 10.9996H19C19.2652 10.9996 19.5196 11.1049 19.7071 11.2925C19.8946 11.48 20 11.7344 20 11.9996C20 12.2648 19.8946 12.5191 19.7071 12.7067C19.5196 12.8942 19.2652 12.9996 19 12.9996H9L12.29 16.2896C12.4783 16.4765 12.5846 16.7307 12.5856 16.996C12.5865 17.2614 12.482 17.5163 12.295 17.7046C12.108 17.8929 11.8539 17.9992 11.5885 18.0001C11.3232 18.0011 11.0683 17.8965 10.88 17.7096L6.59 13.4096C6.21441 13.0362 6.00223 12.5292 6 11.9996V11.9996Z"
                  fill="url(#paint0_linear_386_11872)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_386_11872"
                    x1="13"
                    y1="18.0001"
                    x2="13"
                    y2="6.00879"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#0068FF" />
                    <stop offset="1" stopColor="#549AFF" />
                  </linearGradient>
                </defs>
              </svg>
            </button>
          )}
          {currentNumber < maxNumber && (
            <button
              onClick={handleNext}
              className="flex justify-center items-center rounded-full bg-blue-gradient w-12 h-12"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 11.9996C17.9951 11.4735 17.7832 10.9705 17.41 10.5996L13.12 6.29958C12.9326 6.11333 12.6792 6.00879 12.415 6.00879C12.1508 6.00879 11.8974 6.11333 11.71 6.29958C11.6163 6.39254 11.5419 6.50315 11.4911 6.625C11.4403 6.74686 11.4142 6.87757 11.4142 7.00958C11.4142 7.14159 11.4403 7.2723 11.4911 7.39416C11.5419 7.51602 11.6163 7.62662 11.71 7.71958L15 10.9996H5C4.73478 10.9996 4.48043 11.1049 4.29289 11.2925C4.10536 11.48 4 11.7344 4 11.9996C4 12.2648 4.10536 12.5191 4.29289 12.7067C4.48043 12.8942 4.73478 12.9996 5 12.9996H15L11.71 16.2896C11.5217 16.4765 11.4154 16.7307 11.4144 16.996C11.4135 17.2614 11.518 17.5163 11.705 17.7046C11.892 17.8929 12.1461 17.9992 12.4115 18.0001C12.6768 18.0011 12.9317 17.8965 13.12 17.7096L17.41 13.4096C17.7856 13.0362 17.9978 12.5292 18 11.9996Z"
                  fill="white"
                />
              </svg>
            </button>
          )}
        </div>
        {currentNumber >= maxNumber && (
          <button
            onClick={handleFinish}
            className="flex items-center bg-blue-gradient px-4 py-2 rounded-md text-white"
          >
            Selesaikan Quiz
          </button>
        )}
      </div>
    </div>
  );
};

QuizBodyCard.propTypes = {
  currentNumber: PropTypes.number.isRequired,
  maxNumber: PropTypes.number.isRequired,
  quizData: PropTypes.object.isRequired,
  handleNext: PropTypes.func.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleFinish: PropTypes.func.isRequired,
  selectedAnswer: PropTypes.array,
  setSelectedAnswer: PropTypes.func.isRequired,
};

export default QuizBodyCard;

const AnswerCard = ({
  questionId,
  answer,
  selectedAnswer,
  setSelectedAnswer,
}) => {
  return (
    <button
      onClick={() =>
        setSelectedAnswer((prevSelectedAnswer) => {
          const updatedAnswer = {
            questionId,
            answerId: answer.id,
            text: answer.text,
          };
          const index = prevSelectedAnswer.findIndex(
            (item) => item.questionId === questionId
          );
          if (index !== -1) {
            const newSelectedAnswer = [...prevSelectedAnswer];
            newSelectedAnswer[index] = updatedAnswer;
            return newSelectedAnswer;
          } else {
            return [...prevSelectedAnswer, updatedAnswer];
          }
        })
      }
      className={`${
        selectedAnswer && selectedAnswer.answerId === answer.id
          ? "bg-base-puprle border-0 text-white hover:bg-base-puprle hover:text-white"
          : "bg-stone-200 border-2 hover:bg-purple-100 hover:border-purple-300"
      } w-full text-start rounded-md border-stone-300 mb-2 p-2 px-4
      `}
    >
      {answer.text}
    </button>
  );
};

AnswerCard.propTypes = {
  answer: PropTypes.object.isRequired,
  questionId: PropTypes.string.isRequired,
  selectedAnswer: PropTypes.object,
  setSelectedAnswer: PropTypes.func.isRequired,
};
