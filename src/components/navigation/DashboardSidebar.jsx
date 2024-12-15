import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const DashboardSidebar = () => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="p-4 w-full">
      <Link
        to={user.role === "guru" ? "/dashboard" : "/home"}
        className="flex flex-row gap-2 hover:bg-gray-100 p-2"
      >
        {location.pathname === "/dashboard" || location.pathname === "/home" ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_328_239)">
              <path
                d="M2.00002 11H13C14.1045 11 15 10.1046 15 9V2.00002C15 0.895453 14.1045 0 13 0H2.00002C0.895453 0 0 0.895453 0 2.00002V9C0 10.1046 0.895453 11 2.00002 11Z"
                fill="#0068FF"
              />
              <path
                d="M23.658 0.882C23.2863 0.330656 22.6649 9.375e-05 22 0H19C17.8955 0 17 0.895453 17 2.00002V9C17 10.1046 17.8954 11 19 11H22C23.1046 11 24 10.1046 24 9V2.00002C24.0007 1.60148 23.8815 1.21195 23.658 0.882Z"
                fill="#0068FF"
              />
              <path
                d="M6.11798 13.3419C5.78803 13.1184 5.3985 12.9992 4.99997 12.9999H1.99997C0.895453 12.9999 0 13.8953 0 14.9999V21.9999C0 23.1045 0.895453 23.9999 2.00002 23.9999H5.00002C6.10458 23.9999 7.00003 23.1044 7.00003 21.9999V14.9999C6.99989 14.335 6.66933 13.7136 6.11798 13.3419Z"
                fill="#0068FF"
              />
              <path
                d="M23.118 13.3419C22.788 13.1184 22.3985 12.9992 22 12.9999H11C9.89545 12.9999 9 13.8953 9 14.9999V21.9999C9 23.1045 9.89545 23.9999 11 23.9999H22C23.1046 23.9999 24 23.1045 24 21.9999V14.9999C23.9999 14.335 23.6693 13.7136 23.118 13.3419Z"
                fill="#0068FF"
              />
            </g>
            <defs>
              <clipPath id="clip0_328_239">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_5_5828)">
              <path
                d="M2 11H13C13.5304 11 14.0391 10.7893 14.4142 10.4142C14.7893 10.0391 15 9.53043 15 9V2C15 1.46957 14.7893 0.960859 14.4142 0.585786C14.0391 0.210714 13.5304 0 13 0L2 0C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2L0 9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11ZM2 2H13V9H2V2Z"
                fill="#A1A9A6"
              />
              <path
                d="M22.0001 0H19.0001C18.4697 0 17.961 0.210714 17.5859 0.585786C17.2108 0.960859 17.0001 1.46957 17.0001 2V9C17.0001 9.53043 17.2108 10.0391 17.5859 10.4142C17.961 10.7893 18.4697 11 19.0001 11H22.0001C22.5306 11 23.0393 10.7893 23.4143 10.4142C23.7894 10.0391 24.0001 9.53043 24.0001 9V2C24.0001 1.46957 23.7894 0.960859 23.4143 0.585786C23.0393 0.210714 22.5306 0 22.0001 0V0ZM22.0001 9H19.0001V2H22.0001V9Z"
                fill="#A1A9A6"
              />
              <path
                d="M5 13.0003H2C1.46957 13.0003 0.960859 13.211 0.585787 13.5861C0.210714 13.9612 0 14.4699 0 15.0003L0 22.0003C0 22.5307 0.210714 23.0394 0.585787 23.4145C0.960859 23.7896 1.46957 24.0003 2 24.0003H5C5.53043 24.0003 6.03914 23.7896 6.41421 23.4145C6.78929 23.0394 7 22.5307 7 22.0003V15.0003C7 14.4699 6.78929 13.9612 6.41421 13.5861C6.03914 13.211 5.53043 13.0003 5 13.0003ZM5 22.0003H2V15.0003H5V22.0003Z"
                fill="#A1A9A6"
              />
              <path
                d="M22 13.0003H11C10.4696 13.0003 9.96086 13.211 9.58579 13.5861C9.21071 13.9612 9 14.4699 9 15.0003V22.0003C9 22.5307 9.21071 23.0394 9.58579 23.4145C9.96086 23.7896 10.4696 24.0003 11 24.0003H22C22.5304 24.0003 23.0391 23.7896 23.4142 23.4145C23.7893 23.0394 24 22.5307 24 22.0003V15.0003C24 14.4699 23.7893 13.9612 23.4142 13.5861C23.0391 13.211 22.5304 13.0003 22 13.0003ZM22 22.0003H11V15.0003H22V22.0003Z"
                fill="#A1A9A6"
              />
            </g>
            <defs>
              <clipPath id="clip0_5_5828">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
        <h1
          className={`text-sm md:text-base ${
            location.pathname === "/dashboard"
              ? "font-semibold text-blue-500"
              : "text-gray-500"
          }
            `}
        >
          Dashboard
        </h1>
      </Link>
      <Link
        to={user.role === "guru" ? "/dashboard/class" : "/class"}
        className="flex flex-row gap-2 hover:bg-gray-50 p-2"
      >
        {location.pathname.includes("class") ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_13_4920)">
              <path
                d="M4.343 10.9997H0C0.00158786 9.67408 0.528882 8.40324 1.46622 7.4659C2.40356 6.52856 3.67441 6.00127 5 5.99968H11V1.63568C11.0002 1.36041 11.0698 1.08963 11.2023 0.848385C11.3349 0.607141 11.5262 0.403221 11.7584 0.255487C11.9907 0.107753 12.2565 0.0209756 12.5312 0.00318044C12.8059 -0.0146148 13.0806 0.0371471 13.33 0.153679L16.53 1.65368C16.6747 1.74336 16.7941 1.86851 16.8769 2.01725C16.9598 2.166 17.0032 2.33343 17.0032 2.50368C17.0032 2.67393 16.9598 2.84135 16.8769 2.9901C16.7941 3.13885 16.6747 3.264 16.53 3.35368L13 4.99968V5.99968H19C20.3256 6.00127 21.5964 6.52856 22.5338 7.4659C23.4711 8.40324 23.9984 9.67408 24 10.9997H19.657C18.8757 10.9999 18.1252 10.6953 17.565 10.1507L14.829 7.17168C14.0643 6.43419 13.0418 6.02458 11.9794 6.03019C10.917 6.03579 9.89888 6.45616 9.142 7.20168L6.464 10.1207C5.90047 10.6818 5.13821 10.9977 4.343 10.9997ZM12 18.9997C11.7348 18.9997 11.4804 19.105 11.2929 19.2926C11.1054 19.4801 11 19.7345 11 19.9997V23.9997H13V19.9997C13 19.7345 12.8946 19.4801 12.7071 19.2926C12.5196 19.105 12.2652 18.9997 12 18.9997ZM19.657 12.9997H24V20.9997C24 21.7953 23.6839 22.5584 23.1213 23.121C22.5587 23.6836 21.7956 23.9997 21 23.9997H15V19.9997C15 19.204 14.6839 18.441 14.1213 17.8784C13.5587 17.3158 12.7956 16.9997 12 16.9997C11.2044 16.9997 10.4413 17.3158 9.87868 17.8784C9.31607 18.441 9 19.204 9 19.9997V23.9997H3C2.20435 23.9997 1.44129 23.6836 0.87868 23.121C0.31607 22.5584 0 21.7953 0 20.9997L0 12.9997H4.343C5.00676 12.9999 5.66391 12.8678 6.27602 12.6111C6.88814 12.3544 7.44294 11.9783 7.908 11.5047L10.586 8.58568C10.9641 8.2309 11.4617 8.03095 11.9802 8.0254C12.4986 8.01984 13.0003 8.20908 13.386 8.55568L16.124 11.5347C16.5869 12.0002 17.1375 12.3693 17.7439 12.6208C18.3503 12.8723 19.0005 13.001 19.657 12.9997ZM6 20.9997C6 20.7345 5.89464 20.4801 5.70711 20.2926C5.51957 20.105 5.26522 19.9997 5 19.9997H4C3.73478 19.9997 3.48043 20.105 3.29289 20.2926C3.10536 20.4801 3 20.7345 3 20.9997C3 21.2649 3.10536 21.5193 3.29289 21.7068C3.48043 21.8943 3.73478 21.9997 4 21.9997H5C5.26522 21.9997 5.51957 21.8943 5.70711 21.7068C5.89464 21.5193 6 21.2649 6 20.9997ZM6 16.9997C6 16.7345 5.89464 16.4801 5.70711 16.2926C5.51957 16.105 5.26522 15.9997 5 15.9997H4C3.73478 15.9997 3.48043 16.105 3.29289 16.2926C3.10536 16.4801 3 16.7345 3 16.9997C3 17.2649 3.10536 17.5193 3.29289 17.7068C3.48043 17.8943 3.73478 17.9997 4 17.9997H5C5.26522 17.9997 5.51957 17.8943 5.70711 17.7068C5.89464 17.5193 6 17.2649 6 16.9997ZM14 12.9997C14 12.6041 13.8827 12.2174 13.6629 11.8885C13.4432 11.5596 13.1308 11.3033 12.7654 11.1519C12.3999 11.0005 11.9978 10.9609 11.6098 11.0381C11.2219 11.1153 10.8655 11.3058 10.5858 11.5855C10.3061 11.8652 10.1156 12.2215 10.0384 12.6095C9.96126 12.9975 10.0009 13.3996 10.1522 13.765C10.3036 14.1305 10.56 14.4429 10.8889 14.6626C11.2178 14.8824 11.6044 14.9997 12 14.9997C12.5304 14.9997 13.0391 14.789 13.4142 14.4139C13.7893 14.0388 14 13.5301 14 12.9997ZM21 20.9997C21 20.7345 20.8946 20.4801 20.7071 20.2926C20.5196 20.105 20.2652 19.9997 20 19.9997H19C18.7348 19.9997 18.4804 20.105 18.2929 20.2926C18.1054 20.4801 18 20.7345 18 20.9997C18 21.2649 18.1054 21.5193 18.2929 21.7068C18.4804 21.8943 18.7348 21.9997 19 21.9997H20C20.2652 21.9997 20.5196 21.8943 20.7071 21.7068C20.8946 21.5193 21 21.2649 21 20.9997ZM20 15.9997H19C18.7348 15.9997 18.4804 16.105 18.2929 16.2926C18.1054 16.4801 18 16.7345 18 16.9997C18 17.2649 18.1054 17.5193 18.2929 17.7068C18.4804 17.8943 18.7348 17.9997 19 17.9997H20C20.2652 17.9997 20.5196 17.8943 20.7071 17.7068C20.8946 17.5193 21 17.2649 21 16.9997C21 16.7345 20.8946 16.4801 20.7071 16.2926C20.5196 16.105 20.2652 15.9997 20 15.9997Z"
                fill="url(#paint0_linear_13_4920)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_13_4920"
                x1="12"
                y1="23.9997"
                x2="12"
                y2="-0.000244141"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0068FF" />
                <stop offset="1" stopColor="#549AFF" />
              </linearGradient>
              <clipPath id="clip0_13_4920">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_328_248)">
              <path
                d="M19 6.00049H14.321C13.9224 5.71641 13.4744 5.50888 13 5.38849V5.00049L16.53 3.34849C16.6747 3.25881 16.7941 3.13367 16.8769 2.98492C16.9598 2.83617 17.0032 2.66874 17.0032 2.49849C17.0032 2.32825 16.9598 2.16082 16.8769 2.01207C16.7941 1.86332 16.6747 1.73818 16.53 1.64849L13.33 0.148494C13.0802 0.0317458 12.8049 -0.0199896 12.5297 -0.00191022C12.2545 0.0161692 11.9883 0.103477 11.7559 0.25191C11.5235 0.400343 11.3323 0.60509 11.2002 0.847144C11.068 1.0892 10.9992 1.36072 11 1.63649V5.38849C10.5258 5.50871 10.0782 5.71626 9.68 6.00049H5C3.67441 6.00208 2.40356 6.52938 1.46622 7.46671C0.528882 8.40405 0.00158786 9.6749 0 11.0005L0 21.0005C0 21.7961 0.31607 22.5592 0.87868 23.1218C1.44129 23.6844 2.20435 24.0005 3 24.0005H21C21.7956 24.0005 22.5587 23.6844 23.1213 23.1218C23.6839 22.5592 24 21.7961 24 21.0005V11.0005C23.9984 9.6749 23.4711 8.40405 22.5338 7.46671C21.5964 6.52938 20.3256 6.00208 19 6.00049ZM21.816 10.0005H19.657C18.8618 9.99847 18.0995 9.68257 17.536 9.1215L16.414 8.00049H19C19.6183 8.00306 20.2206 8.19658 20.7247 8.55458C21.2288 8.91259 21.6099 9.41759 21.816 10.0005ZM5 8.00049H7.586L6.464 9.1215C5.90047 9.68257 5.13821 9.99847 4.343 10.0005H2.184C2.39008 9.41759 2.77123 8.91259 3.2753 8.55458C3.77937 8.19658 4.38174 8.00306 5 8.00049ZM13 22.0005H11V19.0005C11 18.7353 11.1054 18.4809 11.2929 18.2934C11.4804 18.1059 11.7348 18.0005 12 18.0005C12.2652 18.0005 12.5196 18.1059 12.7071 18.2934C12.8946 18.4809 13 18.7353 13 19.0005V22.0005ZM21 22.0005H15V19.0005C15 18.2048 14.6839 17.4418 14.1213 16.8792C13.5587 16.3166 12.7956 16.0005 12 16.0005C11.2044 16.0005 10.4413 16.3166 9.87868 16.8792C9.31607 17.4418 9 18.2048 9 19.0005V22.0005H3C2.73478 22.0005 2.48043 21.8951 2.29289 21.7076C2.10536 21.5201 2 21.2657 2 21.0005V12.0005H4.343C4.99982 12.0021 5.65043 11.8735 6.25721 11.622C6.86398 11.3705 7.41487 11.0012 7.878 10.5355L10.586 7.8285C10.9611 7.45355 11.4697 7.24292 12 7.24292C12.5303 7.24292 13.0389 7.45355 13.414 7.8285L16.122 10.5355C16.5851 11.0012 17.136 11.3705 17.7428 11.622C18.3496 11.8735 19.0002 12.0021 19.657 12.0005H22V21.0005C22 21.2657 21.8946 21.5201 21.7071 21.7076C21.5196 21.8951 21.2652 22.0005 21 22.0005ZM7 15.0005C7 15.2657 6.89464 15.5201 6.70711 15.7076C6.51957 15.8951 6.26522 16.0005 6 16.0005H5C4.73478 16.0005 4.48043 15.8951 4.29289 15.7076C4.10536 15.5201 4 15.2657 4 15.0005C4 14.7353 4.10536 14.4809 4.29289 14.2934C4.48043 14.1059 4.73478 14.0005 5 14.0005H6C6.26522 14.0005 6.51957 14.1059 6.70711 14.2934C6.89464 14.4809 7 14.7353 7 15.0005ZM7 19.0005C7 19.2657 6.89464 19.5201 6.70711 19.7076C6.51957 19.8951 6.26522 20.0005 6 20.0005H5C4.73478 20.0005 4.48043 19.8951 4.29289 19.7076C4.10536 19.5201 4 19.2657 4 19.0005C4 18.7353 4.10536 18.4809 4.29289 18.2934C4.48043 18.1059 4.73478 18.0005 5 18.0005H6C6.26522 18.0005 6.51957 18.1059 6.70711 18.2934C6.89464 18.4809 7 18.7353 7 19.0005ZM20 15.0005C20 15.2657 19.8946 15.5201 19.7071 15.7076C19.5196 15.8951 19.2652 16.0005 19 16.0005H18C17.7348 16.0005 17.4804 15.8951 17.2929 15.7076C17.1054 15.5201 17 15.2657 17 15.0005C17 14.7353 17.1054 14.4809 17.2929 14.2934C17.4804 14.1059 17.7348 14.0005 18 14.0005H19C19.2652 14.0005 19.5196 14.1059 19.7071 14.2934C19.8946 14.4809 20 14.7353 20 15.0005ZM20 19.0005C20 19.2657 19.8946 19.5201 19.7071 19.7076C19.5196 19.8951 19.2652 20.0005 19 20.0005H18C17.7348 20.0005 17.4804 19.8951 17.2929 19.7076C17.1054 19.5201 17 19.2657 17 19.0005C17 18.7353 17.1054 18.4809 17.2929 18.2934C17.4804 18.1059 17.7348 18.0005 18 18.0005H19C19.2652 18.0005 19.5196 18.1059 19.7071 18.2934C19.8946 18.4809 20 18.7353 20 19.0005ZM14 12.0005C14 12.3961 13.8827 12.7827 13.6629 13.1116C13.4432 13.4405 13.1308 13.6969 12.7654 13.8483C12.3999 13.9996 11.9978 14.0392 11.6098 13.9621C11.2219 13.8849 10.8655 13.6944 10.5858 13.4147C10.3061 13.135 10.1156 12.7786 10.0384 12.3907C9.96126 12.0027 10.0009 11.6006 10.1522 11.2351C10.3036 10.8697 10.56 10.5573 10.8889 10.3376C11.2178 10.1178 11.6044 10.0005 12 10.0005C12.5304 10.0005 13.0391 10.2112 13.4142 10.5863C13.7893 10.9614 14 11.4701 14 12.0005Z"
                fill="#A1A9A6"
              />
            </g>
            <defs>
              <clipPath id="clip0_328_248">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}

        <h1
          className={`text-sm md:text-base ${
            location.pathname.includes("class")
              ? "font-semibold text-blue-500"
              : "text-gray-500"
          }`}
        >
          Kelas
        </h1>
      </Link>
      <Link
        to={user.role === "guru" ? "/dashboard/forum" : "/forum"}
        className="flex flex-row gap-2 hover:bg-gray-50 p-2"
      >
        {location.pathname.includes("forum") ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_13_4904)">
              <path
                d="M8.7 18H3C1.507 18 0 16.866 0 14.334V9.29395C0.0210272 6.99612 0.881427 4.78526 2.41918 3.07769C3.95693 1.37013 6.06592 0.283682 8.349 0.02295C9.63736 -0.0705757 10.9308 0.114332 12.1413 0.565107C13.3518 1.01588 14.4512 1.72196 15.3646 2.63537C16.278 3.54877 16.9841 4.6481 17.4348 5.85865C17.8856 7.06919 18.0705 8.36259 17.977 9.65095C17.7159 11.935 16.6286 14.0447 14.9198 15.5825C13.211 17.1203 10.9988 17.9802 8.7 18ZM20 9.07995H19.988C19.988 9.31695 19.988 9.55395 19.976 9.79195C19.59 15.2 14.647 19.778 9.084 19.981V19.996C9.78461 21.2111 10.7924 22.2206 12.0062 22.9234C13.2201 23.6261 14.5974 23.9974 16 24H21C21.7956 24 22.5587 23.6839 23.1213 23.1213C23.6839 22.5587 24 21.7956 24 21V16C23.9986 14.597 23.6282 13.2192 22.9262 12.0046C22.2241 10.79 21.215 9.7814 20 9.07995Z"
                fill="url(#paint0_linear_13_4904)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_13_4904"
                x1="12"
                y1="24"
                x2="12"
                y2="-0.000671387"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0068FF" />
                <stop offset="1" stopColor="#549AFF" />
              </linearGradient>
              <clipPath id="clip0_13_4904">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_328_262)">
              <path
                d="M24 16V21C24 21.7956 23.6839 22.5587 23.1213 23.1213C22.5587 23.6839 21.7956 24 21 24H16C14.5971 23.9985 13.2192 23.6282 12.0047 22.9261C10.7901 22.224 9.78145 21.2149 9.08 20C9.83387 19.9946 10.5852 19.9115 11.322 19.752C11.8832 20.4536 12.595 21.02 13.4048 21.4091C14.2146 21.7983 15.1016 22.0002 16 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5195 22 21.2652 22 21V16C21.9998 15.1012 21.7972 14.214 21.4074 13.4042C21.0175 12.5944 20.4504 11.8827 19.748 11.322C19.9088 10.5853 19.9933 9.83396 20 9.07995C21.215 9.7814 22.2241 10.79 22.9262 12.0046C23.6282 13.2192 23.9986 14.597 24 16ZM17.977 9.65095C18.0705 8.36259 17.8856 7.06919 17.4348 5.85865C16.9841 4.6481 16.278 3.54877 15.3646 2.63537C14.4512 1.72196 13.3518 1.01588 12.1413 0.565107C10.9308 0.114332 9.63736 -0.0705757 8.349 0.02295C6.06592 0.283682 3.95693 1.37013 2.41918 3.07769C0.881427 4.78526 0.0210272 6.99612 0 9.29395L0 14.334C0 16.866 1.507 18 3 18H8.7C10.9988 17.9802 13.211 17.1203 14.9198 15.5825C16.6286 14.0447 17.7159 11.935 17.977 9.65095ZM13.95 4.05095C14.6599 4.76245 15.2088 5.61815 15.5593 6.56014C15.9099 7.50213 16.054 8.50843 15.982 9.51095C15.7686 11.2946 14.9105 12.9388 13.5693 14.1339C12.2282 15.329 10.4964 15.9927 8.7 16H3C2.072 16 2 14.725 2 14.334V9.29395C2.00834 7.49833 2.67265 5.76766 3.86792 4.42763C5.06319 3.0876 6.70699 2.23062 8.49 2.01795C8.656 2.00595 8.822 1.99995 8.988 1.99995C9.90927 1.99909 10.8217 2.17979 11.6731 2.53171C12.5245 2.88363 13.2982 3.39988 13.95 4.05095Z"
                fill="#A1A9A6"
              />
            </g>
            <defs>
              <clipPath id="clip0_328_262">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
        <h1
          className={`text-sm md:text-base ${
            location.pathname.includes("forum")
              ? "font-semibold text-blue-500"
              : "text-gray-500"
          }`}
        >
          Forum
        </h1>
      </Link>
    </div>
  );
};

export default DashboardSidebar;
