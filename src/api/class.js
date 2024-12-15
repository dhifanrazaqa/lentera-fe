import api from "./index";

// Mendapatkan Daftar Class
export const fetchClasss = async () => {
  const response = await api.get("/classes/my-class");
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

// Membuat content Baru
export const createContent = async (postData) => {
  const response = await api.post("/contents/", postData);
  return response.data;
};

// Menghapus content
export const deleteContent = async (postData, id) => {
  const response = await api.delete(`/contents/${id}`, { data: postData });
  return response.data;
};

// Mendapatkan data students di class
export const fetchStudentsClass = async (id) => {
  const response = await api.get(`/classes/students/${id}`);
  return response.data;
};

// Mengubah status student di class
export const updateStudentStatus = async (postData) => {
  const response = await api.post(`/classes/status-student`, postData);
  return response.data;
};

// Mengubah status student di class
export const deleteStudentClass = async (postData) => {
  const response = await api.delete(`/classes/remove-student`, {
    data: postData,
  });
  return response.data;
};

// Membuat Materi Baru
export const createMaterial = async (postData) => {
  const response = await api.post("/materials/", postData);
  return response.data;
};

// Membuat Tugas Baru
export const createAssignment = async (postData) => {
  const response = await api.post("/assignments/", postData);
  return response.data;
};

export const getAssignmentId = async ({assignmentId}) =>{
  const response = await api.get(`/assignments/${assignmentId}`);
  return response.data;
}

export const submitAssignment = async (postData) => {
  const response = await api.post("/assignments/submit", postData);
  return response.data;
}

// Menampilkan submission kelas
export const fetchSubmissions = async (classId, assignmentId) => {
  const response = await api.get(`/assignments/class/${classId}/assignment/${assignmentId}/submissions`);
  return response.data;
};

export const getContentbyId = async (classId, contentId) => {
  const response = await api.get(`/contents/${classId}/${contentId}`);
  return response.data;
}

export const getSubmissionsId = async (id) => {
  const response = await api.get(`/assignments/submission/${id}`);
  return response.data;
};

export const gradeAssignment = async (postData) => {
  const response = await api.post("/assignments/grade", postData);
  return response.data;
}

