import PropTypes from "prop-types";

const StatsCard = ({ image, label = "", value = 0 }) => {
  return (
    <div className="flex flex-row bg-white p-1 sm:p-2 md:p-4 rounded-md shadow-md justify-between items-center">
      <img src={image} className="logo w-10 sm:w-16" alt="Murid Icon" />
      <div>
        <p className="text-xs sm:text-sm text-center">{label}</p>
        <p className="font-semibold text-xl md:text-3xl text-center">{value}</p>
      </div>
      <div></div>
    </div>
  );
};

StatsCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default StatsCard;
