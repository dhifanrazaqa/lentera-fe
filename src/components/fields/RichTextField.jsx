import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PropTypes from "prop-types";

// Custom Toolbar Modules
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }], // Header levels
    ["bold", "italic", "underline"], // Text styling
    [{ list: "ordered" }, { list: "bullet" }], // List styling
    ["link", "image"], // Media tools
    ["clean"], // Clear formatting
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "link",
  "image",
];

const RichTextEditor = ({
  id,
  label = "",
  placeholder = "Type here...",
  error = "",
  isLoading = false,
  value = "",
  onChange,
  height = "400px",
}) => {
  return (
    <div className="">
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          {label}
        </label>
      )}

      {/* Rich Text Editor */}
      <div className="relative">
        <ReactQuill
          id={id}
          value={value}
          onChange={onChange}
          readOnly={isLoading}
          placeholder={placeholder}
          theme="snow"
          modules={modules}
          formats={formats}
          className={`w-full pb-10 bg-white border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring focus:ring-blue-200 ${
            isLoading ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          style={{ height }}
        />
      </div>

      {/* Pesan Error */}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

RichTextEditor.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default RichTextEditor;
