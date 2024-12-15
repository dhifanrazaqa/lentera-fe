import PropTypes from "prop-types";

export default function NormalButton({ onClick, height, width, children, type = "button" }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-blue-gradient shadow-lg rounded-lg flex flex-row items-center justify-center"
      style={{ height, width }}
      aria-label="Normal Button"
    >
      {children}
    </button>
  );
}

NormalButton.propTypes = {
  onClick: PropTypes.func,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]), // Default: "button"
};
