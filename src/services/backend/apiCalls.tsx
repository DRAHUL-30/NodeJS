import axiosClient from "./axiosClient";
import { AxiosResponse } from 'axios';

const NavigateToSignInWithRouteParams = (navigate: any) => {
    const locationHref = window.location.href;
    const fromRoute = locationHref.split(window.location.host)[1];
    navigate('/', { state: { from: fromRoute } });
};

const getHeaders = () => ({
  token: localStorage.getItem('token') || '',
});

const handleResponse = (response: AxiosResponse, navigate?: any) => {
  if (response.status === 401 && navigate) {
    return NavigateToSignInWithRouteParams(navigate);
  }
  return response.data;
};

export const readRecord = async (params: any = {}, endpoint: string, navigate?: any) => {
  const response = await axiosClient.get(`/${endpoint}`, { headers: getHeaders(), params });
  return handleResponse(response, navigate);
};

export const postRecord = async (body: any, endpoint: string, navigate?: any) => {
  const response = await axiosClient.post(`/${endpoint}`, body, { headers: getHeaders() });
  return handleResponse(response, navigate);
};

export const updateRecord = async (body: any, endpoint: string, navigate?: any) => {
  const response = await axiosClient.put(`/${endpoint}`, body, { headers: getHeaders() });
  return handleResponse(response, navigate);
};

export const deleteRecord = async (params: any, endpoint: string, navigate?: any) => {
  const response = await axiosClient.delete(`/${endpoint}`, { headers: getHeaders(), params });
  return handleResponse(response, navigate);
};