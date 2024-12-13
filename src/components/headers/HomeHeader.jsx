import { Link } from "react-router-dom";
import LenteraLogo from "../../assets/lentera-logo.png";
import useAuthStore from "../../store/authStore";
import PropTypes from "prop-types";

export default function HomeHeader({ setIsOpen }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userStore = useAuthStore((state) => state.user);

  return (
    <div className="flex flex-row justify-between bg-white p-4 shadow-md">
      <button
        onClick={() => setIsOpen(true)}
        className="flex justify-center items-center lg:hidden"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.9565 10.957H1.04346C0.467168 10.957 0 11.4242 0 12.0005C0 12.5768 0.467168 13.044 1.04346 13.044H22.9565C23.5328 13.044 23.9999 12.5768 23.9999 12.0005C24 11.4242 23.5328 10.957 22.9565 10.957Z"
            fill="#374957"
          />
          <path
            d="M1.04346 5.73927H22.9565C23.5328 5.73927 23.9999 5.2721 23.9999 4.69581C23.9999 4.11951 23.5328 3.65234 22.9565 3.65234H1.04346C0.467168 3.65234 0 4.11951 0 4.69581C0 5.2721 0.467168 5.73927 1.04346 5.73927Z"
            fill="#374957"
          />
          <path
            d="M22.9565 18.2607H1.04346C0.467168 18.2607 0 18.728 0 19.3043C0 19.8806 0.467168 20.3477 1.04346 20.3477H22.9565C23.5328 20.3477 23.9999 19.8806 23.9999 19.3043C24 18.728 23.5328 18.2607 22.9565 18.2607Z"
            fill="#374957"
          />
        </svg>
      </button>
      <Link
        to={isAuthenticated ? "/dashboard" : "/"}
        className="flex flex-row items-center"
      >
        <img src={LenteraLogo} className="logo" alt="Lentera logo" width={60} />
        <h1 className="text-xl font-medium">Lentera</h1>
      </Link>
      {!isAuthenticated ? (
        <div className="flex flex-row items-center gap-4">
          <Link
            to="/register"
            className="px-4 py-2 bg-white rounded-lg hover:bg-slate-100"
          >
            Daftar
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 text-white bg-blue-gradient rounded-lg hover:bg-blue-900"
          >
            Masuk
          </Link>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-4">
          <p className="hidden lg:flex font-medium">
            Selamat datang, {userStore.name}!
          </p>
          <img
            src="https://i.pinimg.com/originals/98/1d/6b/981d6b2e0ccb5e968a0618c8d47671da.jpg"
            alt="profile"
            className="w-8 h-8 rounded-full bg-blue-400"
          />
        </div>
      )}
    </div>
  );
}

HomeHeader.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};
