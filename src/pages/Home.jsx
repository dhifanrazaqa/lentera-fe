import HomeHeader from "../components/headers/HomeHeader";
import LenteraLogo from "../assets/lentera-logo.png";

export default function Home() {
  return (
    <div className="h-screen bg-[url('/src/assets/bg/home-bg.png')]">
      <HomeHeader />
      <div className="h-4/6 flex flex-col justify-center items-center">
        <img
          src={LenteraLogo}
          className="logo"
          alt="Lentera logo"
          width={220}
        />
        <h1 className="text-4xl text-white font-medium mb-4">Lentera</h1>
        <p className="text-center text-white w-4/6">
          Tingkat pendidikan dan literasi yang rendah menjadi ancaman bagi
          bangsa Indonesia. Lentera hadir sebagai platform belajar yang membantu
          dalam kemudahan literasi dalam setiap pelajaran bagi anak-anak usia 10
          sampai 15 tahun.
        </p>
      </div>
    </div>
  );
}
