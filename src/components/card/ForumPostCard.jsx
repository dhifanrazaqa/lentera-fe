import PropTypes from "prop-types";
import { useState } from "react";
import ForumReplyCard from "./ForumReplyCard";
import TextField from "../fields/TextField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import moment from "moment";
import "moment/locale/id";
import { useCreateReply } from "../../hooks/useForumQuery";
import Alert from "./Alert";

moment.locale("id");
const schema = z.object({
  text: z.string().nonempty("Komen tidak boleh kosong"),
});

const ForumPostCard = ({ forumData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const createReply = useCreateReply();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [serverError, setServerError] = useState("");
  const [visibleError, setVisibleError] = useState(true);

  const onCreateComment = async (formData) => {
    setIsLoading(true);

    formData.forumId = forumData.id;

    createReply.mutate(formData, {
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message ||
          "Terjadi kesalahan. Silakan coba lagi.";
        setVisibleError(true);
        setServerError(errorMessage);
        setIsLoading(false);
      },
      onSuccess: () => {
        setServerError("");
        reset();
        setIsLoading(false);
      },
    });
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-fit rounded-md shadow-sm mb-4 p-5 gap-4 bg-white">
      {serverError && (
        <Alert
          type="error"
          message={serverError}
          visible={visibleError}
          setVisible={setVisibleError}
        />
      )}
      <div className="flex h-fit gap-4">
        <img
          src="https://i.pinimg.com/originals/98/1d/6b/981d6b2e0ccb5e968a0618c8d47671da.jpg"
          alt="profile"
          className="w-16 h-16 rounded-full bg-blue-400"
        />
        <div className="flex flex-col justify-between">
          <h1 className="font-semibold text-xl">{forumData.user.name}</h1>
          <div className="flex gap-4">
            <div className="flex">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 11.899C13.1782 11.899 14.1333 10.9778 14.1333 9.84141C14.1333 8.70505 13.1782 7.78384 12 7.78384C10.8218 7.78384 9.86667 8.70505 9.86667 9.84141C9.86667 10.9778 10.8218 11.899 12 11.899Z"
                  fill="#0068FF"
                />
                <path
                  d="M12 2C9.87896 2.00218 7.84545 2.8158 6.34565 4.26234C4.84585 5.70888 4.00227 7.67019 4.00001 9.7159C3.99678 11.3663 4.54804 12.9732 5.57121 14.2961C5.59055 14.3285 5.61192 14.3598 5.63521 14.3897L11.1467 21.583C11.2458 21.7123 11.3751 21.8174 11.524 21.8898C11.673 21.9623 11.8375 22 12.0043 22C12.1711 22 12.3355 21.9623 12.4845 21.8898C12.6334 21.8174 12.7627 21.7123 12.8619 21.583L18.369 14.3897C18.3923 14.3601 18.4137 14.3292 18.433 14.2971C19.4547 12.9734 20.0044 11.3661 20 9.7159C19.9977 7.67019 19.1541 5.70888 17.6543 4.26234C16.1545 2.8158 14.121 2.00218 12 2ZM12 13.9566C11.1561 13.9566 10.3312 13.7152 9.62957 13.263C8.92792 12.8109 8.38105 12.1682 8.05812 11.4162C7.73518 10.6643 7.65069 9.83685 7.81532 9.03859C7.97995 8.24033 8.38631 7.50708 8.98301 6.93157C9.57971 6.35605 10.34 5.96412 11.1676 5.80534C11.9953 5.64655 12.8531 5.72805 13.6328 6.03951C14.4124 6.35098 15.0788 6.87843 15.5476 7.55516C16.0164 8.23189 16.2666 9.02751 16.2666 9.84141C16.2666 10.9328 15.8171 11.9795 15.017 12.7513C14.2168 13.523 13.1316 13.9566 12 13.9566Z"
                  fill="#0068FF"
                />
              </svg>
              <p className="text-blue-500 font-semibold">Jakarta</p>
            </div>
            <p className="text-stone-400">
              {moment(forumData.createdAt).fromNow()}
            </p>
          </div>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: forumData.text }} />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-stone-100 rounded-lg py-1 w-fit cursor-pointer"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_279_7764)">
            <path
              d="M0.000223319 7.49838C0.0966401 5.93839 0.647455 4.44072 1.58476 3.18999C2.52207 1.93927 3.80489 0.990171 5.27508 0.459706C6.74527 -0.0707594 8.33856 -0.159402 9.85852 0.204706C11.3785 0.568814 12.7587 1.36976 13.8289 2.50879C14.8992 3.64782 15.6127 5.07515 15.8816 6.61481C16.1505 8.15448 15.9629 9.73917 15.342 11.1735C14.7211 12.6079 13.6941 13.8292 12.3875 14.6869C11.0809 15.5446 9.55185 16.0012 7.98889 16.0004H3.33356C2.44977 15.9995 1.60244 15.648 0.977508 15.0231C0.352578 14.3982 0.00110578 13.5508 0.000223319 12.667V7.49838ZM1.33356 12.667C1.33356 13.1975 1.54427 13.7062 1.91934 14.0813C2.29442 14.4563 2.80312 14.667 3.33356 14.667H7.98889C8.9296 14.6666 9.85966 14.4679 10.7184 14.0839C11.5772 13.6999 12.3454 13.1392 12.9729 12.4384C13.6034 11.7379 14.0769 10.9107 14.3616 10.0122C14.6463 9.11378 14.7356 8.16484 14.6236 7.22904C14.4466 5.753 13.7834 4.37783 12.7386 3.32033C11.6938 2.26282 10.3267 1.58312 8.85289 1.38838C8.5654 1.35234 8.27596 1.33409 7.98622 1.33371C6.43257 1.32947 4.92702 1.87231 3.73356 2.86704C3.03654 3.44634 2.46442 4.16114 2.05187 4.96813C1.63933 5.77511 1.39495 6.65747 1.33356 7.56171V12.667Z"
              fill="#A1A9A6"
            />
            <path
              d="M10.6668 6.00032H8.00016C7.82335 6.00032 7.65378 5.93009 7.52876 5.80506C7.40373 5.68004 7.3335 5.51047 7.3335 5.33366C7.3335 5.15685 7.40373 4.98728 7.52876 4.86225C7.65378 4.73723 7.82335 4.66699 8.00016 4.66699H10.6668C10.8436 4.66699 11.0132 4.73723 11.1382 4.86225C11.2633 4.98728 11.3335 5.15685 11.3335 5.33366C11.3335 5.51047 11.2633 5.68004 11.1382 5.80506C11.0132 5.93009 10.8436 6.00032 10.6668 6.00032Z"
              fill="#A1A9A6"
            />
            <path
              d="M5.3335 7.33301H10.6668C10.8436 7.33301 11.0132 7.40325 11.1382 7.52827C11.2633 7.6533 11.3335 7.82287 11.3335 7.99968C11.3335 8.17649 11.2633 8.34606 11.1382 8.47109C11.0132 8.59611 10.8436 8.66635 10.6668 8.66635H5.3335C5.15669 8.66635 4.98712 8.59611 4.86209 8.47109C4.73707 8.34606 4.66683 8.17649 4.66683 7.99968C4.66683 7.82287 4.73707 7.6533 4.86209 7.52827C4.98712 7.40325 5.15669 7.33301 5.3335 7.33301Z"
              fill="#A1A9A6"
            />
            <path
              d="M5.3335 10H10.6668C10.8436 10 11.0132 10.0702 11.1382 10.1953C11.2633 10.3203 11.3335 10.4899 11.3335 10.6667C11.3335 10.8435 11.2633 11.0131 11.1382 11.1381C11.0132 11.2631 10.8436 11.3333 10.6668 11.3333H5.3335C5.15669 11.3333 4.98712 11.2631 4.86209 11.1381C4.73707 11.0131 4.66683 10.8435 4.66683 10.6667C4.66683 10.4899 4.73707 10.3203 4.86209 10.1953C4.98712 10.0702 5.15669 10 5.3335 10Z"
              fill="#A1A9A6"
            />
          </g>
          <defs>
            <clipPath id="clip0_279_7764">
              <rect
                width="16"
                height="16"
                fill="white"
                transform="matrix(-1 0 0 1 16 0)"
              />
            </clipPath>
          </defs>
        </svg>
        <p className="text-stone-400 text-sm">{`${forumData.ForumReply.length} Komentar`}</p>
      </button>
      {isOpen && (
        <div>
          <hr />
          <form
            onSubmit={handleSubmit(onCreateComment)}
            className="flex align-middle items-center my-4 gap-4"
          >
            <img
              src="https://i.pinimg.com/originals/98/1d/6b/981d6b2e0ccb5e968a0618c8d47671da.jpg"
              alt="profile"
              className="w-10 h-10 rounded-full bg-blue-400"
            />
            <div className="w-full h-12">
              <TextField
                type="text"
                id="text"
                label=""
                placeholder="Beri komentar"
                register={register}
                error={errors.text?.message}
                isLoading={isLoading}
              />
            </div>
            <button
              type="submit"
              className={`content-end px-4 py-2 h-fit text-white ${
                isLoading ? "bg-gray-400" : "bg-blue-gradient"
              } rounded-lg hover: ${
                isLoading ? "bg-gray-400" : "bg-blue-600"
              } focus:outline-none focus:ring focus:ring-blue-200`}
              disabled={isLoading}
            >
              {isLoading ? "Loading.." : "Kirim"}
            </button>
          </form>
          {forumData.ForumReply.map((frm, index) => (
            <ForumReplyCard key={index} forumData={frm} />
          ))}
        </div>
      )}
    </div>
  );
};

ForumPostCard.propTypes = {
  forumData: PropTypes.object.isRequired,
};

export default ForumPostCard;
