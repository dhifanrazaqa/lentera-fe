import api from "./index";

// Login API
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

// Register API
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Verify Token
export const verifyToken = async () => {
  const response = await api.get("/auth/verify");
  return response.data;
};

// Logout
export const logout = async () => {
  await api.get("/auth/logout");
};