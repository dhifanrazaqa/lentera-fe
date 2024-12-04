import api from "./index";

// Mendapatkan Daftar Class
export const fetchClasss = async () => {
  const response = await api.get("/classes/my-class");
  console.log(response.data);
  return response.data;
};

// Membuat Class Baru
export const createClass = async (postData) => {
  const response = await api.post("/classes/", postData);
  return response.data;
};

// Melihat Detail Class
export const detailClass = async (id) => {
  const response = await api.get(`/classes/${id}`);
  return response.data;
};

// Menambahkan student ke class
