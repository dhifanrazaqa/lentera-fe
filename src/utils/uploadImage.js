import axios from "axios";

const uploadToCloudinary = async (file) => {
  console.log(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );
  formData.append(
    "cloud_name",
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  );
  formData.append("folder", "Lentera");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

export default uploadToCloudinary;
