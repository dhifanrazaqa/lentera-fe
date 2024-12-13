import { useState } from "react";
import PropTypes from "prop-types";

const FileUploadField = ({
  id,
  label = "Upload File",
  accept = "",
  isLoading = false,
  error = "",
  register,
  setValue,
}) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      if (setValue) {
        setValue(id, [file]);
      }
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-600 mb-1"
      >
        {label}
      </label>
      <div className="flex items-center">
        <input
          type="file"
          id={id}
          accept={accept}
          disabled={isLoading}
          className="hidden"
          {...(register && register(id))}
          onChange={handleFileChange}
        />
        <label
          htmlFor={id}
          className={`cursor-pointer bg-blue-gradient hover:bg-blue-700 text-white text-xs py-3 px-4 rounded-md whitespace-nowrap ${
            isLoading ? "bg-gray-300 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Loading..." : "Pilih File"}
        </label>
        <input
          value={fileName}
          placeholder="Belum ada file yang dipilih"
          disabled
          className={`ml-4 flex-1 py-2 pl-3 placeholder:text-xs border rounded-lg focus:outline-none focus:ring focus:ring-blue-200 text-gray-700 ${
            error ? "border-red-500 focus:ring-red-200" : ""
          } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
          readOnly
        />
      </div>
      {/* Pesan Error */}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      <p className="text-xs text-gray-500 mt-1">
        File yang disarankan: {accept || "Semua file"}
      </p>
    </div>
  );
};

FileUploadField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  accept: PropTypes.string,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  register: PropTypes.func,
  setValue: PropTypes.func,
};

export default FileUploadField;
