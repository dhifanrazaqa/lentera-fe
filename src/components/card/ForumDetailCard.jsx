import PropTypes from "prop-types";
import { useState } from "react";
import AddForumButton from "../button/AddForumButton";

const ForumDetailCard = ({ forumData, setIsAddOpen }) => {
  const [isStudentOpen, setIsStudentOpen] = useState(false);
  return (
    <div className="flex flex-col">
      <div className="flex sm:hidden absolute right-6 bottom-4">
        <AddForumButton setIsAddOpen={setIsAddOpen} />
      </div>
      <button
        onClick={() => setIsAddOpen(true)}
        className="hidden sm:flex bg-blue-gradient justify-center gap-2 align-middle text-white text-sm font-medium rounded-md p-2 mb-4"
      >
        <svg
          width="16"
          height="16"
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
        Buat Diskusi
      </button>
      <div className="flex flex-col rounded-md shadow-sm p-5 h-fit bg-white">
        <h2 className="text-sm font-normal">Forum Kelas</h2>
        <h2 className="text-lg font-semibold mb-4">{forumData.name}</h2>
        <div className="flex flex-col items-center gap-4">
          <img
            src="https://i.pinimg.com/originals/98/1d/6b/981d6b2e0ccb5e968a0618c8d47671da.jpg"
            alt="profile"
            className="w-16 h-16 rounded-full bg-blue-400"
          />
          <div className="flex flex-col items-center">
            <h1 className="font-semibold text-lg">{forumData.teach.name}</h1>
            <p className="bg-blue-600 text-white w-fit rounded-md text-xs p-1">
              Guru
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsStudentOpen(!isStudentOpen)}
          className="flex items-center gap-2 hover:bg-stone-100 rounded-lg py-1 w-fit cursor-pointer"
        >
          <p className="text-stone-400 text-sm">32 Murid</p>
          {!isStudentOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
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
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </button>
        {isStudentOpen && (
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2">
              <img
                src="https://i.pinimg.com/originals/98/1d/6b/981d6b2e0ccb5e968a0618c8d47671da.jpg"
                alt="profile"
                className="w-10 h-10 rounded-full bg-blue-400"
              />
              <p className="font-semibold">Michelle Gough</p>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="https://i.pinimg.com/originals/98/1d/6b/981d6b2e0ccb5e968a0618c8d47671da.jpg"
                alt="profile"
                className="w-10 h-10 rounded-full bg-blue-400"
              />
              <p className="font-semibold">Michelle Gough</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ForumDetailCard.propTypes = {
  forumData: PropTypes.object.isRequired,
  setIsAddOpen: PropTypes.func.isRequired,
};

export default ForumDetailCard;
