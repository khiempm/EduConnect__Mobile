import axiosInstance from "./axiosInstance.js";

export const fetcher = (url) =>
  axiosInstance.get(url).then((res) => res.data);

export const fetcherWithParams = (url, params) =>
  axiosInstance.get(url, { params }).then((res) => res.data);

export const postData = (url, data) =>
  axiosInstance.post(url, data).then((res) => res.data);

export const putData = (url, data) =>
  axiosInstance.put(url, data).then((res) => res.data);

export const deleteData = (url) =>
  axiosInstance.delete(url).then((res) => res.data);
