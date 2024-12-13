import PropTypes from "prop-types";

const BubbleChat = ({ text }) => {
  return (
    <div className="justify-self-end w-fit max-w-md bg-stone-200 rounded-md my-8 p-2">
      <p className="text-sm">{text}</p>
    </div>
  );
};

BubbleChat.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BubbleChat;
