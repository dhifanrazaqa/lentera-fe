import api from "./index";

// Mendapatkan Daftar Class
export const fetchClasss = async () => {
  const response = await api.get("/classes/my-class");
  return response.data;
};

// Mendapatkan stats guru
export const fetchStats = async () => {
  const response = await api.get("/classes/stats");
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

// Melihat Class status
export const statusClass = async (id) => {
  const response = await api.get(`/classes/${id}/status`);
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

// Menambahkan student ke Class
export const addStudentClass = async (postData) => {
  const response = await api.post("/classes/add-student", postData);
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

export const getAssignmentId = async ({ assignmentId }) => {
  const response = await api.get(`/assignments/${assignmentId}`);
  return response.data;
};

export const submitAssignment = async (postData) => {
  const response = await api.post("/assignments/submit", postData);
  return response.data;
};

// Menampilkan submission kelas
export const fetchSubmissions = async (classId, assignmentId) => {
  const response = await api.get(
    `/assignments/class/${classId}/assignment/${assignmentId}/submissions`
  );
  return response.data;
};

// Menampilkan submission kelas
export const checkSubmission = async (assignmentId) => {
  const response = await api.get(
    `/assignments/submission/check/${assignmentId}`
  );
  return response.data;
};

// Membuat Quiz Baru
export const createQuiz = async (postData) => {
  const response = await api.post("/quizzes/", postData);
  return response.data;
};

// Mendapatkan data quiz
export const fetchQuizData = async (id) => {
  const response = await api.get(`/quizzes/quiz/${id}`);
  return response.data;
};

// Mendapatkan data answered quiz
export const fetchAnsweredData = async (id) => {
  const response = await api.get(`/quizzes/quiz/attempt/${id}`);
  return response.data;
};

// Membuat attempt Baru
export const createAttempt = async (postData) => {
  const response = await api.post("/quizzes/quiz/attempt", postData);
  return response.data;
};

// Membuat jawaban
export const answeringQuestion = async (postData) => {
  const response = await api.post("/quizzes/quiz/attempt/answer", postData);
  return response.data;
};

// Mendapatkan final result
export const fetchFinalResult = async (postData) => {
  const response = await api.post(`/quizzes/quiz/attempt/submit`, postData);
  return response.data;
};

export const getContentbyId = async (classId, contentId) => {
  const response = await api.get(`/contents/${classId}/${contentId}`);
  return response.data;
};

export const getSubmissionsId = async (id) => {
  const response = await api.get(`/assignments/submission/${id}`);
  return response.data;
};

export const gradeAssignment = async (postData) => {
  const response = await api.post("/assignments/grade", postData);
  return response.data;
};
