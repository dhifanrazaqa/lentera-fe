import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { register as registerApi } from "../../api/auth";
import { useState } from "react";
import HomeHeader from "../../components/headers/HomeHeader";
import TextField from "../../components/fields/TextField";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../components/card/Alert";

const registerSchema = z.object({
  email: z.string().email("Email tidak valid"),
  name: z.string("Nama tidak boleh kosong"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [serverError, setServerError] = useState("");
  const [visibleError, setVisibleError] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      data.role = "siswa";
      await registerApi(data);
      alert("Register berhasil!");
      setServerError("");
      setVisibleError(true);
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Terjadi kesalahan. Silakan coba lagi.";
      setVisibleError(true);
      setServerError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[url('/src/assets/bg/home-bg.png')]">
      <HomeHeader />
      <div className="h-4/5 flex justify-center items-center p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-5/12 justify-items-center"
        >
          <div className="bg-white p-8 rounded-lg shadow-md w-11/12">
            <h2 className="text-xl font-semibold text-gray-700 mb-6 text-start">
              Daftar ke Lentera
            </h2>
            {serverError && (
              <Alert
                type="error"
                message={serverError}
                visible={visibleError}
                setVisible={setVisibleError}
              />
            )}{" "}
            <TextField
              type="text"
              id="name"
              label="Nama Lengkap"
              placeholder="Masukkan nama anda"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="gray"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              register={register}
              error={errors.email?.message}
              isLoading={isLoading}
            />
            <TextField
              type="email"
              id="email"
              label="Email"
              placeholder="name@example.com"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="gray"
                  className="size-5"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
              }
              register={register}
              error={errors.email?.message}
              isLoading={isLoading}
            />
            {/* Password */}
            <TextField
              type="password"
              id="password"
              label="Kata Sandi"
              placeholder="********"
              isPassword
              register={register}
              error={errors.password?.message}
              isLoading={isLoading}
            />
            {/* Ingat Saya & Lupa Kata Sandi */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="mr-2 focus:ring-blue-300 focus:ring-2"
                />
                Saya menyetujui
                <span className="text-blue-500 mx-1">
                  {" "}
                  syarat & ketentuan{" "}
                </span>{" "}
                yang berlaku
              </label>
            </div>
            {/* Tombol Masuk */}
            <button
              type="submit"
              className={`w-full py-2 text-white ${
                isLoading ? "bg-gray-400" : "bg-blue-gradient"
              } rounded-lg hover: ${
                isLoading ? "bg-gray-400" : "bg-blue-600"
              } focus:outline-none focus:ring focus:ring-blue-200`}
              disabled={isLoading}
            >
              {isLoading ? "Loading.." : "Daftar"}
            </button>
            {/* Daftar */}
            <p className="mt-4 text-sm text-center text-gray-600">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Masuk
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
