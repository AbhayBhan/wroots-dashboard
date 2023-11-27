import { axiosInstance } from "./axiosInstance";

export const getCompanies = () =>
  axiosInstance.get("/hiringcompany/getallCompany");

export const editCompany = (payload) =>
  axiosInstance.post("/hiringcompany/updateCompanyById", payload);

export const addCompany = (payload) =>
  axiosInstance.post("/hiringcompany/insertCompany", payload);

export const deleteCompany = (payload) =>
  axiosInstance.post("/hiringcompany/deleteCompany", payload);

export const getActiveJobsForCompany = (companyId) => {
  let params = {
    companyId: companyId,
  };
  return axiosInstance.post("/hiringcompany/getActiveJobs", { params });
};
export const deleteBulkCompany = (payload) => {
  return axiosInstance.post("/hiringcompany/bulkdeleteCompany", payload);
};
