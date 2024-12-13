import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ForumCard = ({ classData }) => {
  return (
    <Link
      to={`/dashboard/forum/${classData.id}`}
      className="flex bg-white rounded-md shadow-md mb-4"
    >
      <img
        src={classData.imageUrl}
        className="w-2/5 md:w-1/6 h-20 sm:h-36 object-cover rounded-t-md"
        alt="Murid Icon"
      />
      <div className="flex flex-col justify-center px-4 py-2">
        <h2 className="text-sm font-normal">Forum Kelas</h2>
        <h2 className="text-lg font-semibold mb-4">{classData.name}</h2>
        <Link
          to={`/dashboard/forum/${classData.id}`}
          className="hidden sm:flex bg-blue-gradient p-2 rounded-md text-white text-xs"
        >
          Lihat Forum
        </Link>
      </div>
    </Link>
  );
};

ForumCard.propTypes = {
  classData: PropTypes.object.isRequired,
};

export default ForumCard;
