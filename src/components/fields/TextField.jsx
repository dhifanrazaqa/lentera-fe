import React from "react";
import PropTypes from "prop-types";

const TextField = ({
  type = "text",
  id,
  label = "",
  placeholder = "",
  icon = null,
  isPassword = false,
  error = "",
  isLoading = false,
  register,
  height = "auto",
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  // Tentukan tipe input atau textarea
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  const isDescription = type === "description";

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-600 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        {/* Input atau Textarea */}
        {!isDescription ? (
          <input
            type={inputType}
            id={id}
            placeholder={placeholder}
            disabled={isLoading}
            className={`w-full py-2 ${
              icon ? "pl-10" : "pl-3"
            } pr-4 placeholder:text-xs border rounded-lg focus:outline-none focus:ring focus:ring-blue-200 text-gray-700 ${
              error ? "border-red-500 focus:ring-red-200" : ""
            } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
            {...(register && register(id))}
          />
        ) : (
          <textarea
            id={id}
            placeholder={placeholder}
            disabled={isLoading}
            style={{ height }}
            className={`w-full py-2 ${
              icon ? "pl-10" : "pl-3"
            } pr-3 placeholder:text-xs border rounded-lg focus:outline-none focus:ring focus:ring-blue-200 text-gray-700 resize-none ${
              error ? "border-red-500 focus:ring-red-200" : ""
            } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
            {...(register && register(id))}
          />
        )}
        {/* Ikon Kiri */}
        {icon && !isDescription && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </div>
        )}
        {/* Tombol Toggle Password */}
        {isPassword && !isDescription && (
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}
          </div>
        )}
      </div>
      {/* Pesan Error */}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

TextField.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.element,
  isPassword: PropTypes.bool,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  register: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TextField;
