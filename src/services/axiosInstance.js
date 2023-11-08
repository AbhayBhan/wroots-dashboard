import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "https://wroots-backend.onrender.com"
})

