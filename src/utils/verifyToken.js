import { verifyToken } from "../api/auth";

export const checkAuthentication = async () => {
  try {
    const data = await verifyToken();
    return { isAuthenticated: true, user: data.user }; 
  } catch (error) {
    console.error("Verifikasi token gagal:", error);
    return { isAuthenticated: false, user: null };
  }
};
