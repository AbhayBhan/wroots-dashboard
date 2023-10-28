import { axiosInstance } from "./axiosInstance";

export const getCompanies = () => axiosInstance.get("/hiringcompany/getallCompany");

export const updateLocation = (payload) =>
  axiosInstance.post("/hiringcompany/updateCompanyById", payload);

export const addCompany = (payload) =>
  axiosInstance.post("/hiringcompany/insertCompany", payload);

export const deleteLocation = (payload) =>
  axiosInstance.post("/hiringcompany/deleteCompany", payload);


export const getActiveJobsForCompany = (companyId) => {
    let params = {
        companyId: companyId
    }
return axiosInstance.post("/hiringcompany/getActiveJobs", {params});

}