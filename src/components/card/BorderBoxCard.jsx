import PropTypes from "prop-types";

const BorderBoxCard = ({
  children,
  color,
  clickable = false,
  selected = false,
  handler,
}) => {
  return clickable ? (
    <button
      onClick={handler}
      className={`bg-${color}-${
        selected ? "600" : "100"
      } ${selected && "text-white"} border-${selected? "0" : "2"} w-full text-start rounded-md border-${color}-500 mb-2 p-2 px-4`}
    >
      {children}
    </button>
  ) : (
    <div
      className={`bg-${color}-${
        selected ? "600" : "100"
      } border-${selected? "0" : "2"} w-full text-start rounded-md border-${color}-500 mb-2 p-2 px-4`}
    >
      {children}
    </div>
  );
};

BorderBoxCard.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  clickable: PropTypes.bool,
  selected: PropTypes.bool,
  handler: PropTypes.func,
};

export default BorderBoxCard;
