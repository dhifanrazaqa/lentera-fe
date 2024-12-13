import api from "./index";

// Mendapatkan Daftar forum
export const fetchForum = async (id) => {
  const response = await api.get(`/forums/${id}`);
  return response.data;
};

// Membuat Forum Post Baru
export const createForum = async (postData) => {
  const response = await api.post("/forums/", postData);
  return response.data;
};

// Membuat reply Baru
export const createReply = async (postData) => {
  const response = await api.post("/forums/reply", postData);
  return response.data;
};
