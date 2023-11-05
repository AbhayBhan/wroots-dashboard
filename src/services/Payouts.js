import { axiosInstance } from "./axiosInstance";

export const getPayouts = (page, paymentType) => {
  let params = {
    paymentType: paymentType || null,
    pageno: page || 0,
  };

  return axiosInstance.get("/payments/payments", { params });
};

export const approveAPayout = (payload) =>
  axiosInstance.post("/createPayment/createPayment", payload);
