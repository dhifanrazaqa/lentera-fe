import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ClassCard = ({ classData, width = "", url = "/dashboard/class/" }) => {
  return (
    <div
      className={`bg-white rounded-md shadow-md ${width} sm:h-full sm:w-full`}
    >
      <img
        src={classData.imageUrl}
        className="w-full h-20 sm:h-40 object-cover rounded-t-md"
        alt="Murid Icon"
      />
      <div className="p-2 mb-2">
        <h2 className="text-xs sm:text-lg font-semibold mb-2">
          {classData.name}
        </h2>
        <Link
          to={`${url}${classData.id}`}
          className="bg-blue-gradient p-2 rounded-md text-white text-xs mb-2"
        >
          Lihat Kelas
        </Link>
      </div>
    </div>
  );
};

ClassCard.propTypes = {
  classData: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default ClassCard;
