import { Link } from "react-router-dom";
import LenteraLogo from "../../assets/lentera-logo.png";
import useAuthStore from "../../store/authStore";

export default function HomeHeader() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userStore = useAuthStore((state) => state.user);

  return (
    <div className="flex flex-row justify-between bg-white p-4 shadow-md">
      <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex flex-row items-center">
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
          <p className="font-medium">Selamat datang, {userStore.name}!</p>
          <div className="rounded-full h-10 w-10 bg-blue-400"></div>
        </div>
      )}
    </div>
  );
}
