import { Link } from "react-router-dom";
import SampleClass from "../../assets/images/sample_class.png";
import PropTypes from "prop-types";

const ClassCard = ({ title = "", id = null }) => {
  return (
    <div className="rounded-md shadow-md">
      <img src={SampleClass} className="rounded-t-md" alt="Murid Icon" />
      <div className="px-4 py-2 mb-2">
        <h2 className="text-sm font-semibold mb-2">{title}</h2>
        <Link
          to={`class/${id}`}
          className="bg-blue-gradient p-2 rounded-md text-white text-xs mb-2"
        >
          Lihat Kelas
        </Link>
      </div>
    </div>
  );
};

ClassCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ClassCard;
