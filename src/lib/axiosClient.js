import axios from "axios";
import { auth, signIn } from "../../auth";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosClient.interceptors.request.use(async (config) => {
  const session = await auth();
  console.log("axios session", session);
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const session = await signIn("credentials", { redirect: false });

      if (session?.accessToken) {
        error.config.headers.Authorization = `Bearer ${session.accessToken}`;
        return axiosClient(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
