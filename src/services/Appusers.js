import { axiosInstance } from "./axiosInstance";

export const fetchAllAppusers = (page) => {
  const params = {
    pageno: page || 1,
  };
  return axiosInstance.get("/referror/getallReferror", { params });
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
