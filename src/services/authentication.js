import { axiosInstance } from "./axiosInstance";

export const login = (_data) => {
    return axiosInstance.post("/recruiter/login", _data);
}