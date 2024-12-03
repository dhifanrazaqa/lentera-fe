import PropTypes from "prop-types";

const StatsCard = ({ image, label = "", value = 0 }) => {
  return (
    <div className="flex flex-row bg-white p-4 rounded-md shadow-md justify-between items-center">
      <img src={image} className="logo" alt="Murid Icon" width={100} />
      <div>
        <p>{label}</p>
        <p className="font-semibold text-4xl text-center">{value}</p>
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
