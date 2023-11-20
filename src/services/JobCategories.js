import { axiosInstance } from "./axiosInstance";

export const fetchAllCategories = () => axiosInstance.get("/category/getCategory");

export const updateCategory = (payload) =>
  axiosInstance.post("/category/updateCategory", payload);

export const addCategory = (payload) =>
  axiosInstance.post("/category/insertCategory", payload);

export const deleteCategory = (payload) =>
  axiosInstance.post("/category/deletCategory", payload);
