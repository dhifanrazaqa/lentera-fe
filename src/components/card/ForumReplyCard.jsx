import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/id";

moment.locale('id');

const ForumReplyCard = ({ forumData }) => {
  return (
    <div className="flex flex-col rounded-md shadow-sm gap-2 bg-white">
      <div className="flex h-fit gap-2">
        <img
          src="https://i.pinimg.com/originals/98/1d/6b/981d6b2e0ccb5e968a0618c8d47671da.jpg"
          alt="profile"
          className="w-10 h-10 rounded-full bg-blue-400"
        />
        <div className="flex flex-col justify-between">
          <h1 className="font-semibold">{forumData.user.name}</h1>
          <div className="flex gap-2">
            <div className="flex">
              <svg
                width="18"
                height="18"
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
              <p className="text-blue-500 font-semibold text-sm">Jakarta</p>
            </div>
            <p className="text-stone-400 text-sm">{moment(forumData.createdAt).fromNow()}</p>
          </div>
        </div>
      </div>
      <p className="pl-12">{forumData.text}</p>
    </div>
  );
};

ForumReplyCard.propTypes = {
  forumData: PropTypes.object.isRequired,
};

export default ForumReplyCard;
