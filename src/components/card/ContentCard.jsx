import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateAttempt,
  useFetchFinalResult,
} from "../../hooks/useClassQuery";
import Alert from "./Alert";

const ContentCard = ({
  content,
  title,
  handleDelete,
  isGuru,
  isAcc = true,
}) => {
  const createAttempt = useCreateAttempt();
  const getFinalResult = useFetchFinalResult();

  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const [serverError, setServerError] = useState("");
  const [visibleError, setVisibleError] = useState(true);

  return (
    <div className="border shadow-md p-4 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{content.title}</h2>
        <div className="flex gap-2">
          {isGuru && (
            <button className="rounded-full p-2 bg-stone-200">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_135_3903)">
                  <path
                    d="M0.781333 12.7842C0.281202 13.2842 0.000151033 13.9624 0 14.6696L0 16.0382H1.36867C2.07585 16.0381 2.75402 15.757 3.254 15.2569L12.1493 6.36158L9.67667 3.88892L0.781333 12.7842Z"
                    fill="#374957"
                  />
                  <path
                    d="M15.4298 0.608569C15.2675 0.446059 15.0747 0.317139 14.8625 0.22918C14.6503 0.141221 14.4228 0.0959473 14.1931 0.0959473C13.9634 0.0959473 13.736 0.141221 13.5238 0.22918C13.3116 0.317139 13.1188 0.446059 12.9565 0.608569L10.6191 2.94657L13.0918 5.41924L15.4298 3.0819C15.5923 2.91956 15.7212 2.72678 15.8092 2.51459C15.8972 2.30239 15.9424 2.07494 15.9424 1.84524C15.9424 1.61553 15.8972 1.38808 15.8092 1.17588C15.7212 0.963688 15.5923 0.77091 15.4298 0.608569Z"
                    fill="#374957"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_135_3903">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(0 0.0385742)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
          )}
          {isGuru && (
            <button
              onClick={() => handleDelete(content.id)}
              className="rounded-full p-2 bg-stone-200"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_135_3907)">
                  <path
                    d="M14.0002 2.70523H11.9335C11.6145 1.15429 10.2502 0.0405742 8.66681 0.0385742H7.33346C5.75006 0.0405742 4.38575 1.15429 4.06681 2.70523H2.00015C1.63196 2.70523 1.3335 3.0037 1.3335 3.37189C1.3335 3.74007 1.63196 4.03857 2.00015 4.03857H2.66681V12.7052C2.66903 14.5453 4.16012 16.0364 6.00015 16.0386H10.0002C11.8402 16.0364 13.3313 14.5453 13.3335 12.7052V4.03857H14.0002C14.3683 4.03857 14.6668 3.74011 14.6668 3.37192C14.6668 3.00373 14.3683 2.70523 14.0002 2.70523ZM7.3335 11.3719C7.3335 11.7401 7.03503 12.0386 6.66684 12.0386C6.29862 12.0386 6.00015 11.7401 6.00015 11.3719V7.37192C6.00015 7.00373 6.29862 6.70526 6.66681 6.70526C7.035 6.70526 7.33346 7.00373 7.33346 7.37192V11.3719H7.3335ZM10.0002 11.3719C10.0002 11.7401 9.70168 12.0386 9.3335 12.0386C8.96531 12.0386 8.66684 11.7401 8.66684 11.3719V7.37192C8.66684 7.00373 8.96531 6.70526 9.3335 6.70526C9.70168 6.70526 10.0002 7.00373 10.0002 7.37192V11.3719ZM5.4475 2.70523C5.73106 1.90676 6.48618 1.37292 7.3335 1.37189H8.66684C9.51415 1.37292 10.2693 1.90676 10.5528 2.70523H5.4475Z"
                    fill="#374957"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_135_3907">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(0 0.0385742)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
          )}
          {isAcc && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              {isExpanded ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div>
          {isGuru && (
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 mb-4">{content.body}</p>
              <div className="flex overflow-x-auto space-x-2 sm:space-x-0 gap-4">
                {content.materials.length === 0 && (
                  <Link
                    to={`/dashboard/class/${content.classId}/material/create`}
                    state={{ title: title, content: content }}
                    className="flex w-fit items-center space-x-2 px-4 py-2 bg-white rounded-md hover:bg-gray-100"
                  >
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.5 13.7695H6V14.7695H6.5C6.776 14.7695 7 14.5455 7 14.2695C7 13.9935 6.776 13.7695 6.5 13.7695Z"
                        fill="#151C1A"
                      />
                      <path
                        d="M9 7.76953V2.89953C8.518 3.03753 8.071 3.28353 7.707 3.64853L4.879 6.47653C4.514 6.84053 4.268 7.28753 4.13 7.76953H9Z"
                        fill="#151C1A"
                      />
                      <path
                        d="M12.375 13.7695H12V16.7695H12.375C12.72 16.7695 13 16.4895 13 16.1445V14.3945C13 14.0495 12.72 13.7695 12.375 13.7695Z"
                        fill="#151C1A"
                      />
                      <path
                        d="M21 9.76953H20V4.76953C20 3.66653 19.133 2.76953 18.067 2.76953H11V7.76953C11 8.87253 10.103 9.76953 9 9.76953H3C2.448 9.76953 2 10.2175 2 10.7695V19.7695C2 20.3215 2.448 20.7695 3 20.7695H4C4 21.8725 4.867 22.7695 5.933 22.7695H18.067C19.163 22.7695 19.764 21.5335 19.923 21.1555C19.975 21.0315 19.993 20.9005 19.993 20.7695H21C21.552 20.7695 22 20.3215 22 19.7695V10.7695C22 10.2175 21.552 9.76953 21 9.76953ZM6.5 16.7695H6V17.7695C6 18.3215 5.552 18.7695 5 18.7695C4.448 18.7695 4 18.3215 4 17.7695V12.7695C4 12.2175 4.448 11.7695 5 11.7695H6.5C7.878 11.7695 9 12.8915 9 14.2695C9 15.6475 7.878 16.7695 6.5 16.7695ZM15 16.1445C15 17.5915 13.822 18.7695 12.375 18.7695H11C10.448 18.7695 10 18.3215 10 17.7695V12.7695C10 12.2175 10.448 11.7695 11 11.7695H12.375C13.822 11.7695 15 12.9475 15 14.3945V16.1445ZM19 14.7695C19.552 14.7695 20 15.2175 20 15.7695C20 16.3215 19.552 16.7695 19 16.7695H18V17.7695C18 18.3215 17.552 18.7695 17 18.7695C16.448 18.7695 16 18.3215 16 17.7695V12.7695C16 12.2175 16.448 11.7695 17 11.7695H19C19.552 11.7695 20 12.2175 20 12.7695C20 13.3215 19.552 13.7695 19 13.7695H18V14.7695H19Z"
                        fill="#151C1A"
                      />
                    </svg>
                    <span className="text-sm">Tambah Materi</span>
                  </Link>
                )}
                {content.assignments.length === 0 && (
                  <Link
                    to={`/dashboard/class/${content.classId}/assignment/create`}
                    state={{ title: title, content: content }}
                    className="flex items-center space-x-2 px-4 py-2 bg-white rounded-md hover:bg-gray-100"
                  >
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_158_2693)">
                        <path
                          d="M14 7.76953V1.22953C14.9251 1.57887 15.7653 2.12084 16.465 2.81953L19.949 6.30553C20.6485 7.00441 21.1909 7.84443 21.54 8.76953H15C14.7348 8.76953 14.4804 8.66417 14.2929 8.47664C14.1054 8.2891 14 8.03475 14 7.76953ZM22 11.2545V19.7695C21.9984 21.0951 21.4711 22.366 20.5338 23.3033C19.5964 24.2407 18.3256 24.7679 17 24.7695H7C5.67441 24.7679 4.40356 24.2407 3.46622 23.3033C2.52888 22.366 2.00159 21.0951 2 19.7695V5.76953C2.00159 4.44394 2.52888 3.17309 3.46622 2.23575C4.40356 1.29841 5.67441 0.771119 7 0.769531L11.515 0.769531C11.678 0.769531 11.839 0.782531 12 0.793531V7.76953C12 8.56518 12.3161 9.32824 12.8787 9.89085C13.4413 10.4535 14.2044 10.7695 15 10.7695H21.976C21.987 10.9305 22 11.0915 22 11.2545ZM14 19.7695C14 19.5043 13.8946 19.25 13.7071 19.0624C13.5196 18.8749 13.2652 18.7695 13 18.7695H8C7.73478 18.7695 7.48043 18.8749 7.29289 19.0624C7.10536 19.25 7 19.5043 7 19.7695C7 20.0347 7.10536 20.2891 7.29289 20.4766C7.48043 20.6642 7.73478 20.7695 8 20.7695H13C13.2652 20.7695 13.5196 20.6642 13.7071 20.4766C13.8946 20.2891 14 20.0347 14 19.7695ZM17 15.7695C17 15.5043 16.8946 15.25 16.7071 15.0624C16.5196 14.8749 16.2652 14.7695 16 14.7695H8C7.73478 14.7695 7.48043 14.8749 7.29289 15.0624C7.10536 15.25 7 15.5043 7 15.7695C7 16.0347 7.10536 16.2891 7.29289 16.4766C7.48043 16.6642 7.73478 16.7695 8 16.7695H16C16.2652 16.7695 16.5196 16.6642 16.7071 16.4766C16.8946 16.2891 17 16.0347 17 15.7695Z"
                          fill="#151C1A"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_158_2693">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(0 0.769531)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-sm">Tambah Tugas</span>
                  </Link>
                )}
                {content.Quiz.length === 0 && (
                  <Link
                    to={`/dashboard/class/${content.classId}/quiz/create`}
                    state={{ title: title, content: content }}
                    className="flex items-center space-x-2 px-4 py-2 bg-transparent bg-white hover:bg-gray-100 rounded-md"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 25"
                      fill="black"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_372_9929)">
                        <path
                          d="M4.99998 19.7695H11V21.7695H6.99998C6.73476 21.7695 6.48041 21.8749 6.29287 22.0624C6.10533 22.2499 5.99998 22.5043 5.99998 22.7695C5.99998 23.0347 6.10533 23.2891 6.29287 23.4766C6.48041 23.6642 6.73476 23.7695 6.99998 23.7695H17C17.2652 23.7695 17.5195 23.6642 17.7071 23.4766C17.8946 23.2891 18 23.0347 18 22.7695C18 22.5043 17.8946 22.2499 17.7071 22.0624C17.5195 21.8749 17.2652 21.7695 17 21.7695H13V19.7695H19C20.1522 19.7681 21.2687 19.3694 22.1612 18.6408C23.0538 17.9122 23.6679 16.8981 23.9 15.7695H0.0999756C0.332072 16.8981 0.946156 17.9122 1.83872 18.6408C2.73129 19.3694 3.84777 19.7681 4.99998 19.7695Z"
                          fill="black"
                        />
                        <path
                          d="M19 1.76953H5C3.67441 1.77112 2.40356 2.29841 1.46622 3.23575C0.528882 4.17309 0.00158786 5.44394 0 6.76953L0 13.7695H24V6.76953C23.9984 5.44394 23.4711 4.17309 22.5338 3.23575C21.5964 2.29841 20.3256 1.77112 19 1.76953Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_372_9929">
                          <rect
                            width="24"
                            height="24"
                            fill="black"
                            transform="translate(0 0.769531)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-sm text-black">Tambah Quiz</span>
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* materials */}
          {content.materials.length !== 0 && (
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 mb-4">
                Materi {content.title}
              </p>
              <div className="flex overflow-x-auto space-x-2 sm:space-x-0 gap-4">
                {content.materials.map((item, index) => (
                  <Link
                    key={index}
                    to={`/material/${item.id}`}
                    state={{ classId: content.classId }}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-gradient rounded-md"
                  >
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.5 13.7695H6V14.7695H6.5C6.776 14.7695 7 14.5455 7 14.2695C7 13.9935 6.776 13.7695 6.5 13.7695Z"
                        fill="white"
                      />
                      <path
                        d="M9 7.76953V2.89953C8.518 3.03753 8.071 3.28353 7.707 3.64853L4.879 6.47653C4.514 6.84053 4.268 7.28753 4.13 7.76953H9Z"
                        fill="white"
                      />
                      <path
                        d="M12.375 13.7695H12V16.7695H12.375C12.72 16.7695 13 16.4895 13 16.1445V14.3945C13 14.0495 12.72 13.7695 12.375 13.7695Z"
                        fill="white"
                      />
                      <path
                        d="M21 9.76953H20V4.76953C20 3.66653 19.133 2.76953 18.067 2.76953H11V7.76953C11 8.87253 10.103 9.76953 9 9.76953H3C2.448 9.76953 2 10.2175 2 10.7695V19.7695C2 20.3215 2.448 20.7695 3 20.7695H4C4 21.8725 4.867 22.7695 5.933 22.7695H18.067C19.163 22.7695 19.764 21.5335 19.923 21.1555C19.975 21.0315 19.993 20.9005 19.993 20.7695H21C21.552 20.7695 22 20.3215 22 19.7695V10.7695C22 10.2175 21.552 9.76953 21 9.76953ZM6.5 16.7695H6V17.7695C6 18.3215 5.552 18.7695 5 18.7695C4.448 18.7695 4 18.3215 4 17.7695V12.7695C4 12.2175 4.448 11.7695 5 11.7695H6.5C7.878 11.7695 9 12.8915 9 14.2695C9 15.6475 7.878 16.7695 6.5 16.7695ZM15 16.1445C15 17.5915 13.822 18.7695 12.375 18.7695H11C10.448 18.7695 10 18.3215 10 17.7695V12.7695C10 12.2175 10.448 11.7695 11 11.7695H12.375C13.822 11.7695 15 12.9475 15 14.3945V16.1445ZM19 14.7695C19.552 14.7695 20 15.2175 20 15.7695C20 16.3215 19.552 16.7695 19 16.7695H18V17.7695C18 18.3215 17.552 18.7695 17 18.7695C16.448 18.7695 16 18.3215 16 17.7695V12.7695C16 12.2175 16.448 11.7695 17 11.7695H19C19.552 11.7695 20 12.2175 20 12.7695C20 13.3215 19.552 13.7695 19 13.7695H18V14.7695H19Z"
                        fill="white"
                      />
                    </svg>
                    <span className="text-sm text-white">Lihat Materi</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* assignments */}
          {content.assignments.length !== 0 && (
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 mb-4">
                Tugas {content.title}
              </p>
              <div className="flex overflow-x-auto space-x-4 sm:space-x-0 gap-4">
                {content.assignments.map((item, index) => (
                  <div key={index} className="flex justify-between gap-4 ">
                    {!isGuru && (
                      <Link
                        to={`/class/${content.classId}/material/${content.id}/latihan/${item.id}`}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-gradient rounded-md"
                      >
                        <svg
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.5 13.7695H6V14.7695H6.5C6.776 14.7695 7 14.5455 7 14.2695C7 13.9935 6.776 13.7695 6.5 13.7695Z"
                            fill="white"
                          />
                          <path
                            d="M9 7.76953V2.89953C8.518 3.03753 8.071 3.28353 7.707 3.64853L4.879 6.47653C4.514 6.84053 4.268 7.28753 4.13 7.76953H9Z"
                            fill="white"
                          />
                          <path
                            d="M12.375 13.7695H12V16.7695H12.375C12.72 16.7695 13 16.4895 13 16.1445V14.3945C13 14.0495 12.72 13.7695 12.375 13.7695Z"
                            fill="white"
                          />
                          <path
                            d="M21 9.76953H20V4.76953C20 3.66653 19.133 2.76953 18.067 2.76953H11V7.76953C11 8.87253 10.103 9.76953 9 9.76953H3C2.448 9.76953 2 10.2175 2 10.7695V19.7695C2 20.3215 2.448 20.7695 3 20.7695H4C4 21.8725 4.867 22.7695 5.933 22.7695H18.067C19.163 22.7695 19.764 21.5335 19.923 21.1555C19.975 21.0315 19.993 20.9005 19.993 20.7695H21C21.552 20.7695 22 20.3215 22 19.7695V10.7695C22 10.2175 21.552 9.76953 21 9.76953ZM6.5 16.7695H6V17.7695C6 18.3215 5.552 18.7695 5 18.7695C4.448 18.7695 4 18.3215 4 17.7695V12.7695C4 12.2175 4.448 11.7695 5 11.7695H6.5C7.878 11.7695 9 12.8915 9 14.2695C9 15.6475 7.878 16.7695 6.5 16.7695ZM15 16.1445C15 17.5915 13.822 18.7695 12.375 18.7695H11C10.448 18.7695 10 18.3215 10 17.7695V12.7695C10 12.2175 10.448 11.7695 11 11.7695H12.375C13.822 11.7695 15 12.9475 15 14.3945V16.1445ZM19 14.7695C19.552 14.7695 20 15.2175 20 15.7695C20 16.3215 19.552 16.7695 19 16.7695H18V17.7695C18 18.3215 17.552 18.7695 17 18.7695C16.448 18.7695 16 18.3215 16 17.7695V12.7695C16 12.2175 16.448 11.7695 17 11.7695H19C19.552 11.7695 20 12.2175 20 12.7695C20 13.3215 19.552 13.7695 19 13.7695H18V14.7695H19Z"
                            fill="white"
                          />
                        </svg>
                        <span className="text-sm text-white">Lihat Tugas</span>
                      </Link>
                    )}
                    {isGuru && (
                      <Link
                        to={`/dashboard/class/${content.classId}/assignment/${item.id}/submission`}
                        className="flex items-center space-x-2 px-4 py-2 bg-transparent border-blue-400 border-2 rounded-md"
                      >
                        <svg
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_251_5935)">
                            <path
                              d="M14 7.76953V1.22953C14.9251 1.57887 15.7653 2.12084 16.465 2.81953L19.949 6.30553C20.6485 7.00441 21.1909 7.84443 21.54 8.76953H15C14.7348 8.76953 14.4804 8.66417 14.2929 8.47664C14.1054 8.2891 14 8.03475 14 7.76953ZM22 11.2545V19.7695C21.9984 21.0951 21.4711 22.366 20.5338 23.3033C19.5964 24.2407 18.3256 24.7679 17 24.7695H7C5.67441 24.7679 4.40356 24.2407 3.46622 23.3033C2.52888 22.366 2.00159 21.0951 2 19.7695V5.76953C2.00159 4.44394 2.52888 3.17309 3.46622 2.23575C4.40356 1.29841 5.67441 0.771119 7 0.769531L11.515 0.769531C11.678 0.769531 11.839 0.782531 12 0.793531V7.76953C12 8.56518 12.3161 9.32824 12.8787 9.89085C13.4413 10.4535 14.2044 10.7695 15 10.7695H21.976C21.987 10.9305 22 11.0915 22 11.2545ZM14 19.7695C14 19.5043 13.8946 19.25 13.7071 19.0624C13.5196 18.8749 13.2652 18.7695 13 18.7695H8C7.73478 18.7695 7.48043 18.8749 7.29289 19.0624C7.10536 19.25 7 19.5043 7 19.7695C7 20.0347 7.10536 20.2891 7.29289 20.4766C7.48043 20.6642 7.73478 20.7695 8 20.7695H13C13.2652 20.7695 13.5196 20.6642 13.7071 20.4766C13.8946 20.2891 14 20.0347 14 19.7695ZM17 15.7695C17 15.5043 16.8946 15.25 16.7071 15.0624C16.5196 14.8749 16.2652 14.7695 16 14.7695H8C7.73478 14.7695 7.48043 14.8749 7.29289 15.0624C7.10536 15.25 7 15.5043 7 15.7695C7 16.0347 7.10536 16.2891 7.29289 16.4766C7.48043 16.6642 7.73478 16.7695 8 16.7695H16C16.2652 16.7695 16.5196 16.6642 16.7071 16.4766C16.8946 16.2891 17 16.0347 17 15.7695Z"
                              fill="url(#paint0_linear_251_5935)"
                            />
                          </g>
                          <defs>
                            <linearGradient
                              id="paint0_linear_251_5935"
                              x1="12"
                              y1="24.7695"
                              x2="12"
                              y2="0.769531"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#0068FF" />
                              <stop offset="1" stopColor="#549AFF" />
                            </linearGradient>
                            <clipPath id="clip0_251_5935">
                              <rect
                                width="24"
                                height="24"
                                fill="white"
                                transform="translate(0 0.769531)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <span className="text-sm text-blue-400">
                          Lihat Pengumpulan
                        </span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quiz */}
          {content.Quiz.length !== 0 && (
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              {serverError && (
                <Alert
                  type="error"
                  message={serverError}
                  visible={visibleError}
                  setVisible={setVisibleError}
                />
              )}
              <p className="text-sm text-gray-700 mb-4">Quiz {content.title}</p>
              <div className="flex overflow-x-auto space-x-4 sm:space-x-0 gap-4">
                {content.Quiz.map((item, index) => (
                  <div key={index} className="flex justify-between gap-4 ">
                    <button
                      onClick={() => {
                        const formData = {
                          quizId: item.id,
                          classId: content.classId,
                        };

                        createAttempt.mutate(formData, {
                          onError: (error) => {
                            const errorMessage =
                              error.response?.data?.message ||
                              "Terjadi kesalahan. Silakan coba lagi.";
                            setVisibleError(true);
                            setServerError(errorMessage);
                          },
                          onSuccess: (response) => {
                            if (
                              response.message === "Attempt already created" &&
                              response.data.score !== null
                            ) {
                              const formData = {
                                attemptId: response.data.id,
                              };

                              getFinalResult.mutate(formData, {
                                onError: (error) => {
                                  const errorMessage =
                                    error.response?.data?.message ||
                                    "Terjadi kesalahan. Silakan coba lagi.";
                                  setVisibleError(true);
                                  setServerError(errorMessage);
                                },
                                onSuccess: (result) => {
                                  result.data.classId = content.classId;
                                  navigate(`/quiz/${item.id}/result`, {
                                    state: result.data,
                                  });
                                },
                              });
                            } else {
                              navigate(`/quiz/${item.id}`, { state: content.classId });
                            }
                          },
                        });
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-transparent bg-blue-gradient rounded-md"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 25"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_372_9929)">
                          <path
                            d="M4.99998 19.7695H11V21.7695H6.99998C6.73476 21.7695 6.48041 21.8749 6.29287 22.0624C6.10533 22.2499 5.99998 22.5043 5.99998 22.7695C5.99998 23.0347 6.10533 23.2891 6.29287 23.4766C6.48041 23.6642 6.73476 23.7695 6.99998 23.7695H17C17.2652 23.7695 17.5195 23.6642 17.7071 23.4766C17.8946 23.2891 18 23.0347 18 22.7695C18 22.5043 17.8946 22.2499 17.7071 22.0624C17.5195 21.8749 17.2652 21.7695 17 21.7695H13V19.7695H19C20.1522 19.7681 21.2687 19.3694 22.1612 18.6408C23.0538 17.9122 23.6679 16.8981 23.9 15.7695H0.0999756C0.332072 16.8981 0.946156 17.9122 1.83872 18.6408C2.73129 19.3694 3.84777 19.7681 4.99998 19.7695Z"
                            fill="white"
                          />
                          <path
                            d="M19 1.76953H5C3.67441 1.77112 2.40356 2.29841 1.46622 3.23575C0.528882 4.17309 0.00158786 5.44394 0 6.76953L0 13.7695H24V6.76953C23.9984 5.44394 23.4711 4.17309 22.5338 3.23575C21.5964 2.29841 20.3256 1.77112 19 1.76953Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_372_9929">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0 0.769531)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <span className="text-sm text-white">Lihat Quiz</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

ContentCard.propTypes = {
  content: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  isGuru: PropTypes.bool,
  isAcc: PropTypes.bool,
};

export default ContentCard;
