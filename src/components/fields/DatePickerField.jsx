import PropTypes from "prop-types";

const DateTimePicker = ({
  type = "datetime",
  id,
  label = "",
  placeholder = "",
  icon = null,
  error = "",
  isLoading = false,
  register,
}) => {
  const isDate = type === "date";
  const isTime = type === "time";

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-600 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={isDate ? "date" : isTime ? "time" : "datetime-local"}
          id={id}
          placeholder={placeholder}
          disabled={isLoading}
          className={`w-full py-2 ${
            icon ? "pl-10" : "pl-3"
          } pr-10 placeholder:text-xs border rounded-lg focus:outline-none focus:ring focus:ring-blue-200 text-gray-700 ${
            error ? "border-red-500 focus:ring-red-200" : ""
          } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
          {...(register && register(id))}
        />

        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </div>
        )}
      </div>
      
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

DateTimePicker.propTypes = {
  type: PropTypes.oneOf(["datetime", "date", "time"]),
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.element,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  register: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DateTimePicker;