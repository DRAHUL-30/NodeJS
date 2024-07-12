import axios, { AxiosInstance } from 'axios';

const BASE_URL = "http://localhost:4000/";

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const res = error.response;
    if (res?.status === 401) {
      NavigateToSignInWithRouteParams(res);
    }
    return Promise.reject(error);
  }
);

export const NavigateToSignInWithRouteParams = (response: any) => {
  const origin = window.location.origin;
  const search = window.location.search;
  sessionStorage.setItem("lastExpiredRoute", window.location.pathname + search);
  window.location.href = `${origin}/?errormessage=${response.data.message}`;
};

export default axiosClient;