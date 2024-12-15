import PropTypes from "prop-types";

const BubbleChat = ({ text, isUser }) => {
  return (
    <div
      className={`${
        isUser
          ? "justify-self-end bg-stone-200 max-w-sm"
          : "justify-self-start bg-white text-justify"
      } w-fit rounded-md my-8 p-2`}
    >
      <div className="text-sm" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

BubbleChat.propTypes = {
  text: PropTypes.string.isRequired,
  isUser: PropTypes.bool.isRequired,
};

export default BubbleChat;
