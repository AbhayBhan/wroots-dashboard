import { axiosInstance } from "./axiosInstance";

export const getSkills = () => axiosInstance.post("/skillroute/getallSkills");

export const updateSkill = (payload) =>
  axiosInstance.post("/skillroute/updateSkill", payload);

export const addSkill = (payload) =>
  axiosInstance.post("/skillroute/insertSkill", payload);

export const deleteSkill = (payload) =>
  axiosInstance.post("/skillroute/deleteSkill", payload);
