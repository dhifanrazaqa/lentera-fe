import PropTypes from "prop-types";

export default function AddForumButton({ setIsAddOpen }) {
  return (
    <button onClick={() => setIsAddOpen(true)} className="bg-blue-gradient p-4 shadow-lg rounded-2xl">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_292_7816)">
          <path
            d="M1.172 19.1184C0.421803 19.8683 0.00022655 20.8856 0 21.9464L0 23.9994H2.053C3.11378 23.9991 4.13103 23.5776 4.881 22.8274L18.224 9.48438L14.515 5.77539L1.172 19.1184Z"
            fill="white"
          />
          <path
            d="M23.1447 0.85487C22.9012 0.611105 22.612 0.417726 22.2937 0.285787C21.9754 0.153848 21.6343 0.0859375 21.2897 0.0859375C20.9452 0.0859375 20.604 0.153848 20.2857 0.285787C19.9674 0.417726 19.6782 0.611105 19.4347 0.85487L15.9287 4.36187L19.6377 8.07087L23.1447 4.56487C23.3885 4.32136 23.5819 4.03219 23.7138 3.7139C23.8457 3.3956 23.9136 3.05443 23.9136 2.70987C23.9136 2.36531 23.8457 2.02414 23.7138 1.70584C23.5819 1.38755 23.3885 1.09838 23.1447 0.85487V0.85487Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_292_7816">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}

AddForumButton.propTypes = {
  setIsAddOpen: PropTypes.func.isRequired,
};