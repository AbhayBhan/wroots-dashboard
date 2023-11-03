import axios from "axios";
import { axiosInstance } from "./axiosInstance";

export const fetchAllAppusers = (page) => {
  const params = {
    pageno: page || 1,
  };

  // This method was giving me 400 bad request
  // return axiosInstance.get("/referror/getallReferror", { params });

  // So i used this direct and crude method for getting the job done 
  return axios.get("https://wroots-backend.onrender.com/referror/getallReferror?pageno=1");
};

// This is Second tab in App users details page 
export const fetchcandidatesReferred = (page, referroId) => {
    const params = {
        pageno: page || 1,
        referror_id: referroId
      };
  return axiosInstance.get("/referror/getCandidatesReferrored", {params});
}


export const searchReferror = (text) => {
    const params = {
        searchItem: text
      }
  return axiosInstance.get("/referror/assignCandidate", {params});
    };

export const fetchJobsApplied = (referroId) => {
    const params = {
        referror_id: referroId
      }
  return axiosInstance.get("/referror/getJobsApplied", {params});

}

export const fetchPayouts = (referroId) => {
    const params = {
        referror_id: referroId
      }
  return axiosInstance.get("/referror/fetchPayouts", {params});

}
