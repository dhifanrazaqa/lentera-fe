import PropTypes from "prop-types";

const QuizNumbering = ({ handleJumpQuestion, currentNumber, number, text }) => {
  return (
    <button
      onClick={() => handleJumpQuestion(number - 1)}
      className="w-full text-start cursor-pointer hover:text-purple-700 "
    >
      <div
        className={`${
          currentNumber === number
            ? "bg-base-puprle border-0 text-white hover:bg-base-puprle hover:text-white"
            : "bg-stone-200 border-2 hover:bg-purple-100 hover:border-purple-300"
        } rounded-md border-stone-300 mb-2 p-4
        `}
      >
        <p className="font-medium mb-1">{`Soal ${number}`}</p>
        <p className="h-6 overflow-hidden whitespace-nowrap text-ellipsis">
          {text}
        </p>
      </div>
    </button>
  );
};

QuizNumbering.propTypes = {
  handleJumpQuestion: PropTypes.func.isRequired,
  currentNumber: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default QuizNumbering;
