import { axiosInstance } from "./axiosInstance";

export const fetchActiveJobs = (payload) =>
  axiosInstance.post("/roleRouter/getActiveRoles",payload);

export const updateLocation = (payload) =>
  axiosInstance.post("/location/updatelocation", payload);

export const addLocation = (payload) =>
  axiosInstance.post("/location/addlocation", payload);

export const deleteLocation = (payload) =>
  axiosInstance.post("/location/deletelocation", payload);
